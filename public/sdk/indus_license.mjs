/**
 * INDUS Web Agency subscription license verification (Node.js / browser).
 */
export const DEFAULT_VERIFY_URL =
  "https://indus-web-agency.vercel.app/api/license/verify";

export const OFFLINE_GRACE_HOURS = 48;

export interface LicenseRecord {
  product: string;
  productSlug: string;
  expiresAt: string;
  period: string;
  licenseToken: string;
  verifyUrl: string;
}

export interface LicenseCheckResult {
  ok: boolean;
  reason?: string;
  message?: string;
  expiresAt?: string;
  daysRemaining?: number;
  productSlug?: string;
  email?: string;
  offline?: boolean;
}

export function parseLicenseFile(data: Record<string, unknown>): LicenseRecord {
  return {
    product: String(data.product ?? ""),
    productSlug: String(data.productSlug ?? data.product_slug ?? ""),
    expiresAt: String(data.expiresAt ?? data.expires_at ?? ""),
    period: String(data.period ?? ""),
    licenseToken: String(data.licenseToken ?? data.license_token ?? ""),
    verifyUrl: String(data.verifyUrl ?? data.verify_url ?? DEFAULT_VERIFY_URL),
  };
}

export function isExpired(expiresAt: string): boolean {
  const t = Date.parse(expiresAt);
  return Number.isNaN(t) || t <= Date.now();
}

export async function verifyOnline(
  record: LicenseRecord,
  fetchImpl: typeof fetch = fetch
): Promise<LicenseCheckResult> {
  const res = await fetchImpl(record.verifyUrl || DEFAULT_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ licenseToken: record.licenseToken }),
  });
  const data = await res.json();
  if (data.valid) {
    return {
      ok: true,
      reason: "valid",
      message: "License active",
      expiresAt: data.expiresAt ?? record.expiresAt,
      daysRemaining: data.daysRemaining,
      productSlug: data.productSlug ?? record.productSlug,
      email: data.email,
    };
  }
  return {
    ok: false,
    reason: data.reason ?? "invalid",
    message: data.error ?? "License is not valid",
    expiresAt: data.expiresAt ?? record.expiresAt,
  };
}

/** Call on app startup and every few hours while running. */
export async function verifyLicense(
  record: LicenseRecord,
  fetchImpl: typeof fetch = fetch
): Promise<LicenseCheckResult> {
  if (isExpired(record.expiresAt)) {
    return {
      ok: false,
      reason: "expired",
      message: "Subscription expired — renew at indus-web-agency.vercel.app",
      expiresAt: record.expiresAt,
    };
  }
  return verifyOnline(record, fetchImpl);
}
