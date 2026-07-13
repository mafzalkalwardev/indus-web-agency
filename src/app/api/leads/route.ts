import { NextRequest, NextResponse } from "next/server";
import { sendLeadMagnetEmail, sendAdminLeadAlert } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const RESOURCES: Record<string, { title: string; calculatorUrl: string; compareUrl: string }> = {
  "dialer-comparison-guide": {
    title: "Auto Dialer Comparison Guide",
    calculatorUrl: "/tools/dialer-calculator",
    compareUrl: "/compare",
  },
};

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const limited = await rateLimit(`leads:${ip}`, 5, 3600);
  if (!limited.ok) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${limited.retryAfterSec}s.` },
      { status: 429 }
    );
  }

  const body = await req.json();
  const email = String(body.email || "").trim().toLowerCase();
  const name = String(body.name || "").trim();
  const resource = String(body.resource || "dialer-comparison-guide");

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const meta = RESOURCES[resource];
  if (!meta) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 400 });
  }

  sendLeadMagnetEmail({ name, email, resourceTitle: meta.title, calculatorUrl: meta.calculatorUrl, compareUrl: meta.compareUrl }).catch(
    (err) => console.error("[leads] magnet email failed:", err)
  );

  sendAdminLeadAlert({ name, email, resource: meta.title }).catch((err) =>
    console.error("[leads] admin alert failed:", err)
  );

  return NextResponse.json({ ok: true });
}
