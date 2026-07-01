import { NextRequest, NextResponse } from "next/server";
import { deactivateExpiredSubscriptions } from "@/lib/db";

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim();
  const auth = req.headers.get("authorization");
  const headerSecret = req.headers.get("x-cron-secret");

  if (secret && auth !== `Bearer ${secret}` && headerSecret !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deactivated = await deactivateExpiredSubscriptions();
  return NextResponse.json({
    ok: true,
    deactivated,
    ranAt: new Date().toISOString(),
  });
}
