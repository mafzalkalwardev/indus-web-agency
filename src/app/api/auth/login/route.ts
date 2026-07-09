import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, verifyPassword, initDefaultAdmin } from "@/lib/db";
import { setSessionCookie, userToSession } from "@/lib/auth";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  await initDefaultAdmin();

  const ip = clientIp(req);
  const limited = await rateLimit(`login:${ip}`, 10, 900);
  if (!limited.ok) {
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${limited.retryAfterSec}s.` },
      { status: 429 }
    );
  }

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const user = await getUserByEmail(email);
  if (!user || !(await verifyPassword(user, password))) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  await setSessionCookie(userToSession(user));
  return NextResponse.json({
    ok: true,
    role: user.role,
    name: user.name,
  });
}
