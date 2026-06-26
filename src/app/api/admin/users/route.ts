import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getUsers } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await getUsers();
  const safeUsers = users.map(({ passwordHash: _, ...u }) => u);
  return NextResponse.json({ users: safeUsers });
}
