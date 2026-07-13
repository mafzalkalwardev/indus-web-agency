import { NextRequest, NextResponse } from "next/server";
import { createContactInquiry } from "@/lib/db";
import { sendAdminContactAlert, sendClientContactConfirmation } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { CONTACT_TOPICS } from "@/lib/about";

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const limited = await rateLimit(`contact:${ip}`, 5, 3600);
  if (!limited.ok) {
    return NextResponse.json(
      { error: `Too many submissions. Try again in ${limited.retryAfterSec}s.` },
      { status: 429 }
    );
  }

  const body = await req.json();
  const { name, email, phone, topic, subject, message } = body;

  if (!name?.trim() || !email?.trim() || !topic || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, topic, and message are required" },
      { status: 400 }
    );
  }

  const validTopic = CONTACT_TOPICS.some((t) => t.value === topic);
  if (!validTopic) {
    return NextResponse.json({ error: "Invalid topic" }, { status: 400 });
  }

  if (message.trim().length < 10) {
    return NextResponse.json({ error: "Please provide more detail (at least 10 characters)" }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  if (!emailOk) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const inquiry = await createContactInquiry({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || undefined,
    topic,
    subject: subject?.trim() || undefined,
    message: message.trim(),
  });

  const topicLabel = CONTACT_TOPICS.find((t) => t.value === topic)?.label || topic;

  sendAdminContactAlert({
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone,
    topic: topicLabel,
    subject: inquiry.subject,
    message: inquiry.message,
    inquiryId: inquiry.id,
  }).catch((err) => console.error("[contact] admin email failed:", err));

  sendClientContactConfirmation({
    name: inquiry.name,
    email: inquiry.email,
    topic: topicLabel,
  }).catch((err) => console.error("[contact] client email failed:", err));

  return NextResponse.json({
    ok: true,
    message: "Thank you! We'll get back to you within 24 hours.",
    id: inquiry.id,
  });
}
