import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { updateContactInquiryStatus, type ContactInquiryStatus } from "@/lib/db";

const VALID: ContactInquiryStatus[] = ["new", "reviewed", "replied", "closed"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { status } = await req.json();

  if (!VALID.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updated = await updateContactInquiryStatus(id, status);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ inquiry: updated });
}
