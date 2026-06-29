import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createSubscription, getUserByEmail } from "@/lib/db";
import { getProduct } from "@/lib/products";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userEmail, productSlug, planId } = await req.json();
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

  const sub = await createSubscription(
    user.id,
    productSlug,
    plan.id,
    plan.name,
    plan.price,
    plan.durationDays
  );

  return NextResponse.json({ subscription: sub });
}
