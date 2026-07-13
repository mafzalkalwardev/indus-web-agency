import { NextRequest, NextResponse } from "next/server";
import { createUser, initDefaultAdmin } from "@/lib/db";
import { setSessionCookie, userToSession } from "@/lib/auth";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { sendWelcomeSignupEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  await initDefaultAdmin();

  const ip = clientIp(req);
  const limited = await rateLimit(`signup:${ip}`, 5, 3600);
  if (!limited.ok) {
    return NextResponse.json(
      { error: `Too many signups from this IP. Try again in ${limited.retryAfterSec}s.` },
      { status: 429 }
    );
  }

  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }

  try {
    const user = await createUser(email, password, name, "customer");
    await setSessionCookie(userToSession(user));
    sendWelcomeSignupEmail({ name: user.name, email: user.email }).catch((err) =>
      console.error("[signup] welcome email failed:", err)
    );
    return NextResponse.json({ ok: true, role: user.role, name: user.name });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Signup failed";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}
