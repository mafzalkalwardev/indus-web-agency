import { NextRequest, NextResponse } from "next/server";
import { createProjectInquiry } from "@/lib/db";
import { sendAdminProjectInquiryAlert, sendClientProjectConfirmation } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { PROJECT_TYPES } from "@/lib/agency-services";

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const limited = await rateLimit(`project-inquiry:${ip}`, 3, 3600);
  if (!limited.ok) {
    return NextResponse.json(
      { error: `Too many submissions. Try again in ${limited.retryAfterSec}s.` },
      { status: 429 }
    );
  }

  const body = await req.json();
  const { name, email, company, phone, projectType, budget, timeline, description } = body;

  if (!name?.trim() || !email?.trim() || !projectType || !description?.trim()) {
    return NextResponse.json({ error: "Name, email, project type, and description are required" }, { status: 400 });
  }

  const validType = PROJECT_TYPES.some((t) => t.value === projectType);
  if (!validType) {
    return NextResponse.json({ error: "Invalid project type" }, { status: 400 });
  }

  if (description.trim().length < 20) {
    return NextResponse.json({ error: "Please provide more detail (at least 20 characters)" }, { status: 400 });
  }

  const inquiry = await createProjectInquiry({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    company: company?.trim() || undefined,
    phone: phone?.trim() || undefined,
    projectType,
    budget: budget || undefined,
    timeline: timeline || undefined,
    description: description.trim(),
  });

  const typeLabel = PROJECT_TYPES.find((t) => t.value === projectType)?.label || projectType;

  sendAdminProjectInquiryAlert({
    name: inquiry.name,
    email: inquiry.email,
    company: inquiry.company,
    projectType: typeLabel,
    budget: inquiry.budget,
    timeline: inquiry.timeline,
    description: inquiry.description,
    inquiryId: inquiry.id,
  }).catch((err) => console.error("[inquiry] admin email failed:", err));

  sendClientProjectConfirmation({
    name: inquiry.name,
    email: inquiry.email,
    projectType: typeLabel,
  }).catch((err) => console.error("[inquiry] client email failed:", err));

  return NextResponse.json({
    ok: true,
    message: "Thank you! We'll review your project and respond within 24 hours.",
    id: inquiry.id,
  });
}
