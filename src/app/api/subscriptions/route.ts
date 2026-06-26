import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createSubscription, getUserSubscriptions } from "@/lib/db";
import { getProduct } from "@/lib/products";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const subs = await getUserSubscriptions(session.userId);
  return NextResponse.json({ subscriptions: subs });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please sign in first" }, { status: 401 });
  }

  const { productSlug, planId } = await req.json();
  const product = getProduct(productSlug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const plan = product.plans.find((p) => p.id === planId);
  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  const sub = await createSubscription(
    session.userId,
    productSlug,
    plan.id,
    plan.name,
    plan.price,
    plan.durationDays
  );

  return NextResponse.json({ subscription: sub });
}
