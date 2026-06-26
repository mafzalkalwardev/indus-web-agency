import { NextResponse } from "next/server";
import { initDefaultAdmin } from "@/lib/db";

export async function GET() {
  await initDefaultAdmin();
  return NextResponse.json({ ok: true, message: "Database initialized" });
}

export async function POST() {
  await initDefaultAdmin();
  return NextResponse.json({ ok: true, message: "Database initialized" });
}
