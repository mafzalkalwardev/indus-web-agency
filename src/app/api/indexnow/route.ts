import { NextRequest, NextResponse } from "next/server";
import { submitIndexNow } from "@/lib/indexnow";
import { SITE_CONTACT } from "@/lib/site-config";

const DEFAULT_URLS = [
  "/",
  "/telecom",
  "/telecom/best-auto-dialers",
  "/telecom/use-cases/ai-custom-dialer-crm",
  "/telecom/use-cases/insurance",
  "/telecom/verticals/insurance",
  "/agency/islamabad",
  "/compare",
  "/compare/ai-dialer-crm-vs-saas",
  "/compare/custom-crm-vs-off-the-shelf",
  "/compare/web-agency-islamabad",
  "/compare/indus-vs-cloud-dialers",
  "/work/ai-custom-dialer-crm",
  "/work/custom-outbound-crm",
  "/process/custom-dialer-crm",
  "/resources/dialer-crm-checklist",
  "/resources/dialer-guide",
];

/**
 * POST { urls?: string[], secret?: string }
 * Set INDEXNOW_SUBMIT_SECRET in env to require auth; without it, only default money URLs are allowed in production if secret matches empty (dev-friendly).
 */
export async function POST(req: NextRequest) {
  const secret = process.env.INDEXNOW_SUBMIT_SECRET;
  let body: { urls?: string[]; secret?: string } = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  if (secret && body.secret !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const urls = Array.isArray(body.urls) && body.urls.length > 0 ? body.urls.slice(0, 100) : DEFAULT_URLS;
  const result = await submitIndexNow(urls);

  return NextResponse.json({
    ...result,
    submitted: urls.length,
    keyLocation: `${SITE_CONTACT.siteUrl}/a7f3c91e0b2d4e8f9a1c6d5e4b3a2f10.txt`,
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    hint: "POST to this endpoint to submit money URLs to IndexNow (Bing/Yandex).",
    keyLocation: `${SITE_CONTACT.siteUrl}/a7f3c91e0b2d4e8f9a1c6d5e4b3a2f10.txt`,
  });
}
