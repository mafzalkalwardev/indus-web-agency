import { getSession } from "./auth";
import {
  findActiveSubscription,
  getUserById,
  getUserSubscriptions,
} from "./db";
import { getProduct } from "./products";
import { getProductDownloadSource } from "./product-sources.server";
import { isExpired } from "./utils";

export interface DownloadAuthorization {
  userId: string;
  productSlug: string;
  productName: string;
  expiresAt: string;
  period: string;
  subscriptionId: string;
  sourceUrl: string;
  fileName: string;
}

export async function authorizeProductDownload(
  productSlug: string
): Promise<
  | { ok: true; auth: DownloadAuthorization }
  | { ok: false; status: number; error: string; expiredAt?: string }
> {
  const session = await getSession();
  if (!session) {
    return { ok: false, status: 401, error: "Unauthorized" };
  }

  const product = getProduct(productSlug);
  if (!product) {
    return { ok: false, status: 404, error: "Product not found" };
  }

  const sourceUrl = getProductDownloadSource(productSlug);
  if (!sourceUrl) {
    return { ok: false, status: 503, error: "Download not configured for this product" };
  }

  const activeSub = await findActiveSubscription(session.userId, productSlug);
  if (!activeSub) {
    const subs = await getUserSubscriptions(session.userId);
    const pending = subs.find(
      (s) => s.productSlug === productSlug && s.status === "pending" && !isExpired(s.expiresAt)
    );
    if (pending) {
      return {
        ok: false,
        status: 403,
        error:
          "Your subscription is pending admin approval. You will be able to download once approved.",
      };
    }
    const expired = subs.find(
      (s) => s.productSlug === productSlug && (isExpired(s.expiresAt) || s.status === "expired")
    );
    if (expired) {
      return {
        ok: false,
        status: 403,
        error: "Your subscription has expired. Please renew to download again.",
        expiredAt: expired.expiresAt,
      };
    }
    return { ok: false, status: 403, error: "No approved subscription for this product" };
  }

  const user = await getUserById(session.userId);
  if (!user) {
    return { ok: false, status: 404, error: "User not found" };
  }

  return {
    ok: true,
    auth: {
      userId: session.userId,
      productSlug,
      productName: product.name,
      expiresAt: activeSub.expiresAt,
      period: activeSub.period,
      subscriptionId: activeSub.id,
      sourceUrl,
      fileName: `indus-${productSlug}.zip`,
    },
  };
}
