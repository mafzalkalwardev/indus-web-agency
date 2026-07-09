import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  createRenewalSubscription,
  getSubscriptionById,
  getUserById,
} from "@/lib/db";
import { getProduct } from "@/lib/products";
import { getBillingOption, calcPrice, type BillingPeriod } from "@/lib/billing";
import { sendAdminRenewalAlert } from "@/lib/email";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { subscriptionId } = await req.json();
  if (!subscriptionId) {
    return NextResponse.json({ error: "subscriptionId required" }, { status: 400 });
  }

  const existing = await getSubscriptionById(subscriptionId);
  if (!existing || existing.userId !== session.userId) {
    return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
  }

  const product = getProduct(existing.productSlug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const plan = product.plans.find((p) => p.id === existing.planId);
  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  const billing = getBillingOption(existing.period);
  const price = calcPrice(plan.price, existing.period);

  const result = await createRenewalSubscription(
    session.userId,
    subscriptionId,
    existing.productSlug,
    existing.planId,
    existing.planName,
    price,
    billing.durationDays,
    existing.period as BillingPeriod
  );

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  const user = await getUserById(session.userId);
  if (user && product) {
    sendAdminRenewalAlert({
      customerName: user.name,
      customerEmail: user.email,
      productName: product.name,
      planName: existing.planName,
      price,
      period: existing.period,
      subscriptionId: result.id,
    }).catch((err) => console.error("[renew] admin alert failed:", err));
  }

  return NextResponse.json({
    subscription: result,
    message: "Renewal request submitted. An admin will review and approve shortly.",
  });
}
