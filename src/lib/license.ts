import { SignJWT, jwtVerify } from "jose";
import type { Subscription } from "./db";
import { isExpired } from "./utils";

const LICENSE_SECRET = new TextEncoder().encode(
  process.env.LICENSE_SECRET || process.env.JWT_SECRET || "indus-web-agency-secret-key-change-in-production"
);

export interface LicensePayload {
  subscriptionId: string;
  userId: string;
  email: string;
  productSlug: string;
  planId: string;
  planName: string;
  period: string;
  expiresAt: string;
}

export async function createLicenseToken(
  sub: Subscription,
  email: string
): Promise<string> {
  const payload: LicensePayload = {
    subscriptionId: sub.id,
    userId: sub.userId,
    email,
    productSlug: sub.productSlug,
    planId: sub.planId,
    planName: sub.planName,
    period: sub.period,
    expiresAt: sub.expiresAt,
  };

  const expSeconds = Math.floor(new Date(sub.expiresAt).getTime() / 1000);

  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expSeconds)
    .sign(LICENSE_SECRET);
}

export async function verifyLicenseToken(token: string): Promise<LicensePayload | null> {
  try {
    const { payload } = await jwtVerify(token, LICENSE_SECRET);
    return payload as unknown as LicensePayload;
  } catch {
    return null;
  }
}

export function subscriptionIsUsable(sub: Subscription): boolean {
  return (
    sub.active &&
    sub.status === "approved" &&
    !isExpired(sub.expiresAt)
  );
}
