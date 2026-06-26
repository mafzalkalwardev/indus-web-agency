import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, verifyPassword, initDefaultAdmin } from "@/lib/db";
import { setSessionCookie, userToSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await initDefaultAdmin();
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
