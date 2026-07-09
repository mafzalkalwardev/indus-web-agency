import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createSubscription, getUserByEmail } from "@/lib/db";
import { getProduct } from "@/lib/products";
import { getBillingOption, calcPrice, type BillingPeriod } from "@/lib/billing";
import { sendCustomerSubscriptionApproved } from "@/lib/email";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userEmail, productSlug, planId, billingPeriod = "month" } = await req.json();
  const period = billingPeriod as BillingPeriod;
  const user = await getUserByEmail(userEmail);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

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

  const sub = await createSubscription(
    user.id,
    productSlug,
    plan.id,
    plan.name,
    price,
    billing.durationDays,
    period,
    "approved"
  );

  sendCustomerSubscriptionApproved({
    customerEmail: user.email,
    customerName: user.name,
    productName: product.name,
    planName: plan.name,
    price,
    period,
    expiresAt: sub.expiresAt,
  }).catch((err) => console.error("[grant] customer email failed:", err));

  return NextResponse.json({ subscription: sub });
}
