import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSubscriptions, getUsers } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const subscriptions = await getSubscriptions();
  const users = await getUsers();
  const userMap = Object.fromEntries(users.map((u) => [u.id, u.email]));

  const enriched = subscriptions.map((s) => ({
    ...s,
    userEmail: userMap[s.userId] || "unknown",
  }));

  return NextResponse.json({ subscriptions: enriched });
}
