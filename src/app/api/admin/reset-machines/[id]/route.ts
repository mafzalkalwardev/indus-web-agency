import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { resetSubscriptionMachines } from "@/lib/db";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const ok = await resetSubscriptionMachines(id);
  if (!ok) {
    return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
