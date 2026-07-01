import { NextResponse } from "next/server";
import { initDefaultAdmin } from "@/lib/db";

function adminHint() {
  const email = process.env.ADMIN_EMAIL?.trim() || "admin@induswebagency.com";
  return { ok: true, message: "Database initialized", adminEmail: email };
}

export async function GET() {
  await initDefaultAdmin();
  return NextResponse.json(adminHint());
}

export async function POST() {
  await initDefaultAdmin();
  return NextResponse.json(adminHint());
}
