import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  createSubscription,
  deactivateExpiredSubscriptions,
  getUserSubscriptions,
  getUserById,
} from "@/lib/db";
import { getProduct } from "@/lib/products";
import { getBillingOption, calcPrice, type BillingPeriod } from "@/lib/billing";
import { sendAdminPurchaseAlert } from "@/lib/email";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await deactivateExpiredSubscriptions();
  const subs = await getUserSubscriptions(session.userId);
  return NextResponse.json({ subscriptions: subs });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please sign in first" }, { status: 401 });
  }

  const { productSlug, planId, billingPeriod = "month" } = await req.json();
  const period = billingPeriod as BillingPeriod;
  const product = getProduct(productSlug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const plan = product.plans.find((p) => p.id === planId);
  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  const billing = getBillingOption(period);
  const price = calcPrice(plan.price, period);

  const existing = (await getUserSubscriptions(session.userId)).find(
    (s) =>
      s.productSlug === productSlug &&
      s.active &&
      s.status !== "rejected" &&
      new Date(s.expiresAt).getTime() > Date.now()
  );
  if (existing) {
    return NextResponse.json(
      { error: "You already have an active subscription for this product" },
      { status: 409 }
    );
  }

  const sub = await createSubscription(
    session.userId,
    productSlug,
    plan.id,
    plan.name,
    price,
    billing.durationDays,
    period,
    "pending"
  );

  const user = await getUserById(session.userId);
  if (user) {
    sendAdminPurchaseAlert({
      customerName: user.name,
      customerEmail: user.email,
      productName: product.name,
      productSlug,
      planName: plan.name,
      price,
      period,
      subscriptionId: sub.id,
    }).catch((err) => console.error("[subscriptions] email alert failed:", err));
  }

  return NextResponse.json({
    subscription: sub,
    message: "Subscription submitted. An admin will review and approve your access shortly.",
  });
}
