import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getUserSubscriptions } from "@/lib/db";
import { getProduct } from "@/lib/products";
import { isExpired } from "@/lib/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await params;
  const product = getProduct(productId);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const subs = await getUserSubscriptions(session.userId);
  const activeSub = subs.find(
    (s) => s.productSlug === productId && s.active && !isExpired(s.expiresAt)
  );

  if (!activeSub) {
    return NextResponse.json(
      { error: "No active subscription for this product" },
      { status: 403 }
    );
  }

  return NextResponse.json({
    downloadUrl: product.downloadUrl,
    expiresAt: activeSub.expiresAt,
    productName: product.name,
  });
}
