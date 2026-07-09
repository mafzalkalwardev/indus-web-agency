import { NextRequest, NextResponse } from "next/server";
import { authorizeProductDownload } from "@/lib/download-auth";
import { getSubscriptionById, getUserById } from "@/lib/db";
import { createLicenseToken } from "@/lib/license";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  const result = await authorizeProductDownload(productId);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const { auth } = result;
  const sub = await getSubscriptionById(auth.subscriptionId);
  const user = await getUserById(auth.userId);

  if (!sub || !user) {
    return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
  }

  const licenseToken = await createLicenseToken(sub, user.email);

  return NextResponse.json({
    productName: auth.productName,
    productSlug: auth.productSlug,
    expiresAt: auth.expiresAt,
    period: auth.period,
    licenseToken,
    fileName: auth.fileName,
    downloadPath: `/api/downloads/${auth.productSlug}/file`,
  });
}
