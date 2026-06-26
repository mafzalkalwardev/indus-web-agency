import { NextRequest, NextResponse } from "next/server";
import { createUser, initDefaultAdmin } from "@/lib/db";
import { setSessionCookie, userToSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await initDefaultAdmin();
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
    return NextResponse.json({ ok: true, role: user.role, name: user.name });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Signup failed";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}
