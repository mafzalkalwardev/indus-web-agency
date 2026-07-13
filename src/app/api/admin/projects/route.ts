import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getProjectInquiries } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const inquiries = await getProjectInquiries();
  return NextResponse.json({ inquiries });
}
