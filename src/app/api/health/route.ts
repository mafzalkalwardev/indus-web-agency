import { NextResponse } from "next/server";
import { getStorageMode } from "@/lib/db";

export async function GET() {
  const mode = await getStorageMode();
  return NextResponse.json({ ok: true, storage: mode });
}
