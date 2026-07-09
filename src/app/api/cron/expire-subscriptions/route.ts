import { NextRequest, NextResponse } from "next/server";
import {
  deactivateExpiredSubscriptions,
  getSubscriptions,
  getSubscriptionsNeedingExpiryReminders,
  markExpiryRemindersSent,
  getUserById,
} from "@/lib/db";
import { getProduct } from "@/lib/products";
import { sendCustomerExpiryReminder } from "@/lib/email";

function authorizeCron(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return true;
  const auth = req.headers.get("authorization");
  const headerSecret = req.headers.get("x-cron-secret");
  return auth === `Bearer ${secret}` || headerSecret === secret;
}

export async function GET(req: NextRequest) {
  if (!authorizeCron(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deactivated = await deactivateExpiredSubscriptions();
  const subs = await getSubscriptions();
  const reminders = getSubscriptionsNeedingExpiryReminders(subs);
  const sent: string[] = [];

  for (const { sub, daysLeft, field } of reminders) {
    const user = await getUserById(sub.userId);
    const product = getProduct(sub.productSlug);
    if (!user || !product) continue;

    const result = await sendCustomerExpiryReminder({
      customerEmail: user.email,
      customerName: user.name,
      productName: product.name,
      planName: sub.planName,
      expiresAt: sub.expiresAt,
      daysLeft,
    });

    if (result.sent) {
      await markExpiryRemindersSent([{ id: sub.id, field }]);
      sent.push(sub.id);
    }
  }

  return NextResponse.json({
    ok: true,
    deactivated,
    remindersSent: sent.length,
    ranAt: new Date().toISOString(),
  });
}
