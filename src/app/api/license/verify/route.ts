import { NextRequest, NextResponse } from "next/server";
import {
  deactivateExpiredSubscriptions,
  bindMachineToSubscription,
  getSubscriptionById,
  getUserById,
  findActiveSubscription,
} from "@/lib/db";
import {
  createLicenseToken,
  verifyLicenseToken,
  normalizeMachineId,
  machineActivationAllowed,
} from "@/lib/license";
import { MAX_MACHINES_PER_SUBSCRIPTION } from "@/lib/license-public-key";
import { isExpired } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { licenseToken, machineId: rawMachineId } = body;
  if (!licenseToken || typeof licenseToken !== "string") {
    return NextResponse.json({ valid: false, error: "Missing license token" }, { status: 400 });
  }

  const machineId = normalizeMachineId(rawMachineId);
  if (!machineId) {
    return NextResponse.json(
      { valid: false, error: "Missing or invalid machine ID", reason: "invalid_machine" },
      { status: 400 }
    );
  }

  const payload = await verifyLicenseToken(licenseToken);
  if (!payload) {
    return NextResponse.json({
      valid: false,
      error: "Invalid or expired license",
      reason: "token_invalid",
    });
  }

  if (isExpired(payload.expiresAt)) {
    return NextResponse.json({
      valid: false,
      error: "Subscription expired",
      reason: "expired",
      expiresAt: payload.expiresAt,
    });
  }

  const sub = await getSubscriptionById(payload.subscriptionId);
  if (!sub || !sub.active || sub.status !== "approved") {
    return NextResponse.json({
      valid: false,
      error: "Subscription revoked or inactive",
      reason: "revoked",
    });
  }

  const activation = machineActivationAllowed(sub.activatedMachines, machineId);
  if (!activation.allowed) {
    return NextResponse.json({
      valid: false,
      error: `License already active on ${MAX_MACHINES_PER_SUBSCRIPTION} devices. Contact support to reset.`,
      reason: activation.reason ?? "machine_limit",
    });
  }

  const bindResult = await bindMachineToSubscription(
    sub.id,
    machineId,
    MAX_MACHINES_PER_SUBSCRIPTION
  );
  if (!bindResult.ok && bindResult.reason === "machine_limit") {
    return NextResponse.json({
      valid: false,
      error: `License already active on ${MAX_MACHINES_PER_SUBSCRIPTION} devices. Contact support to reset.`,
      reason: "machine_limit",
    });
  }

  const user = await getUserById(payload.userId);
  if (!user) {
    return NextResponse.json({
      valid: false,
      error: "Account not found",
      reason: "user_missing",
    });
  }

  return NextResponse.json({
    valid: true,
    email: payload.email,
    productSlug: payload.productSlug,
    planName: payload.planName,
    period: payload.period,
    expiresAt: payload.expiresAt,
    daysRemaining: Math.max(
      0,
      Math.ceil((new Date(payload.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    ),
  });
}

/** Refresh license for a logged-in user with an active subscription. */
export async function PUT(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const { email, productSlug, licenseToken } = await req.json();

  let payload = licenseToken ? await verifyLicenseToken(licenseToken) : null;

  if (!payload && auth?.startsWith("Bearer ")) {
    payload = await verifyLicenseToken(auth.slice(7));
  }

  if (!payload && email && productSlug) {
    const { getUserByEmail } = await import("@/lib/db");
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ valid: false, error: "User not found" }, { status: 404 });
    }
    const sub = await findActiveSubscription(user.id, productSlug);
    if (!sub) {
      return NextResponse.json({ valid: false, error: "No active subscription" }, { status: 403 });
    }
    const token = await createLicenseToken(sub, user.email);
    return NextResponse.json({
      valid: true,
      licenseToken: token,
      expiresAt: sub.expiresAt,
      productSlug: sub.productSlug,
      planName: sub.planName,
    });
  }

  if (!payload) {
    return NextResponse.json({ valid: false, error: "Unable to refresh license" }, { status: 400 });
  }

  const sub = await findActiveSubscription(payload.userId, payload.productSlug);
  if (!sub) {
    return NextResponse.json({
      valid: false,
      error: "Subscription expired or revoked",
      reason: "expired",
    });
  }

  const user = await getUserById(payload.userId);
  if (!user) {
    return NextResponse.json({ valid: false, error: "User not found" }, { status: 404 });
  }

  const token = await createLicenseToken(sub, user.email);
  return NextResponse.json({
    valid: true,
    licenseToken: token,
    expiresAt: sub.expiresAt,
    productSlug: sub.productSlug,
    planName: sub.planName,
  });
}
