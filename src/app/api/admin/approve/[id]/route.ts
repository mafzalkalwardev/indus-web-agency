import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { updateSubscriptionStatus, getSubscriptionById, getUserById } from "@/lib/db";
import { getProduct } from "@/lib/products";
import type { SubscriptionStatus } from "@/lib/billing";
import { sendCustomerSubscriptionApproved, sendCustomerSubscriptionRejected } from "@/lib/email";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { action } = await req.json();
  const status: SubscriptionStatus = action === "approve" ? "approved" : "rejected";

  const sub = await getSubscriptionById(id);
  if (!sub) {
    return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
  }

  const updated = await updateSubscriptionStatus(id, status, session.userId);
  if (!updated) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  const user = await getUserById(updated.userId);
  const product = getProduct(updated.productSlug);
  if (user && product) {
    if (status === "approved") {
      sendCustomerSubscriptionApproved({
        customerEmail: user.email,
        customerName: user.name,
        productName: product.name,
        planName: updated.planName,
        price: updated.price,
        period: updated.period,
        expiresAt: updated.expiresAt,
      }).catch((err) => console.error("[approve] customer email failed:", err));
    } else {
      sendCustomerSubscriptionRejected({
        customerEmail: user.email,
        customerName: user.name,
        productName: product.name,
        planName: updated.planName,
      }).catch((err) => console.error("[approve] customer email failed:", err));
    }
  }

  return NextResponse.json({ subscription: updated });
}
