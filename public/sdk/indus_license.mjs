/**
 * INDUS Web Agency subscription license verification (Node.js / browser).
 * verifyUrl is hardcoded — never read from the license JSON file.
 */
import { createHash, createPublicKey, verify as cryptoVerify } from "crypto";
import os from "os";

export const LICENSE_VERIFY_URL =
  "https://indus-web-agency.vercel.app/api/license/verify";

export const LICENSE_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvSs97mdbBj+wgf4mLVqQ
kyE2DKQuTxhhJ+Ze8YLM162CjOiUllUOft+8l2eAnb8ER+OX/gqBDybwv7ncDtDy
jStlygwGv1L5EuT4mMrCEaxRgsyHct36JgkcSZ5Fxk+zFSjFbq1+mN02AT/sZ6xo
NXWqBYto2L9RZp4I66GmLMXePz4Q+1DgraC4eB/YGsFKg32SebRISDoFzMhcayKH
lBVJz+riN+psvHpehA2dshiAw47JpTpvRohTrXzeGkNiZucnzADGEFQ+T2KzSfau
djQ6lxfLVF7CgFf/QFSnDUhUfrrwkMFqnztpAOGjwiw0/NceocYsQSUWjzsoq9cR
LwIDAQAB
-----END PUBLIC KEY-----`;

export const OFFLINE_GRACE_HOURS = 48;
export const PERIODIC_CHECK_MS = 4 * 60 * 60 * 1000;

export interface LicenseRecord {
  product: string;
  productSlug: string;
  expiresAt: string;
  period: string;
  licenseToken: string;
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

function b64urlDecode(input: string): Buffer {
  const pad = "=".repeat((4 - (input.length % 4)) % 4);
  return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

export function getMachineId(): string {
  const macs = Object.values(os.networkInterfaces())
    .flat()
    .map((i) => i?.mac)
    .filter((m) => m && m !== "00:00:00:00:00:00");
  const raw = [os.hostname(), os.platform(), os.arch(), ...macs].join("|");
  return createHash("sha256").update(raw).digest("hex");
}

export function verifyJwtLocally(token: string): Record<string, unknown> | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [headerB64, payloadB64, sigB64] = parts;
  let header: { alg?: string };
  try {
    header = JSON.parse(b64urlDecode(headerB64).toString("utf8"));
  } catch {
    return null;
  }
  if (header.alg !== "RS256") return null;

  const data = Buffer.from(`${headerB64}.${payloadB64}`);
  const sig = b64urlDecode(sigB64);
  const key = createPublicKey(LICENSE_PUBLIC_KEY_PEM);
  const valid = cryptoVerify("RSA-SHA256", data, key, sig);
  if (!valid) return null;

  try {
    const payload = JSON.parse(b64urlDecode(payloadB64).toString("utf8"));
    const exp = Number(payload.exp);
    if (!exp || exp * 1000 <= Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function parseLicenseFile(data: Record<string, unknown>): LicenseRecord {
  return {
    product: String(data.product ?? ""),
    productSlug: String(data.productSlug ?? data.product_slug ?? ""),
    expiresAt: String(data.expiresAt ?? data.expires_at ?? ""),
    period: String(data.period ?? ""),
    licenseToken: String(data.licenseToken ?? data.license_token ?? ""),
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
  const machineId = getMachineId();
  const res = await fetchImpl(LICENSE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ licenseToken: record.licenseToken, machineId }),
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

/** Verify locally (JWT signature + expiry) then online (subscription + machine binding). */
export async function verifyLicense(
  record: LicenseRecord,
  fetchImpl: typeof fetch = fetch
): Promise<LicenseCheckResult> {
  if (!record.licenseToken) {
    return { ok: false, reason: "missing", message: "License file missing licenseToken" };
  }

  const localPayload = verifyJwtLocally(record.licenseToken);
  if (!localPayload) {
    return {
      ok: false,
      reason: "token_invalid",
      message: "License signature invalid or token expired",
      expiresAt: record.expiresAt,
    };
  }

  const tokenExpires = String(localPayload.expiresAt ?? record.expiresAt);
  if (isExpired(tokenExpires)) {
    return {
      ok: false,
      reason: "expired",
      message: "Subscription expired — renew at indus-web-agency.vercel.app",
      expiresAt: tokenExpires,
    };
  }

  return verifyOnline(record, fetchImpl);
}

/** Re-check every few hours while the app is running. Calls onFailure and exits if invalid. */
export function startPeriodicLicenseCheck(
  record: LicenseRecord,
  options: {
    intervalMs?: number;
    onFailure?: (result: LicenseCheckResult) => void;
    fetchImpl?: typeof fetch;
  } = {}
): () => void {
  const intervalMs = options.intervalMs ?? PERIODIC_CHECK_MS;
  const fetchImpl = options.fetchImpl ?? fetch;
  const onFailure =
    options.onFailure ??
    ((result: LicenseCheckResult) => {
      console.error("[INDUS License]", result.message ?? "License check failed");
      process.exit(1);
    });

  const timer = setInterval(async () => {
    const result = await verifyLicense(record, fetchImpl);
    if (!result.ok) onFailure(result);
  }, intervalMs);

  if (typeof timer === "object" && "unref" in timer) {
    (timer as NodeJS.Timeout).unref();
  }

  return () => clearInterval(timer);
}
