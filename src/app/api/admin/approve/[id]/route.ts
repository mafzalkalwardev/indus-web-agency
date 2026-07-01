import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { updateSubscriptionStatus, getSubscriptionById } from "@/lib/db";
import type { SubscriptionStatus } from "@/lib/billing";

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
  return NextResponse.json({ subscription: updated });
}
