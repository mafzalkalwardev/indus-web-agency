import { readFileSync } from "fs";
import path from "path";
import { SignJWT, jwtVerify, importPKCS8, importSPKI } from "jose";
import type { Subscription } from "./db";
import { isExpired } from "./utils";
import {
  LICENSE_PUBLIC_KEY_PEM,
  MAX_MACHINES_PER_SUBSCRIPTION,
} from "./license-public-key";

export interface LicensePayload {
  subscriptionId: string;
  userId: string;
  email: string;
  productSlug: string;
  planId: string;
  planName: string;
  period: string;
  expiresAt: string;
  v?: number;
}

const LEGACY_HS256_SECRET = new TextEncoder().encode(
  process.env.LICENSE_SECRET || process.env.JWT_SECRET || "indus-web-agency-secret-key-change-in-production"
);

let cachedPrivateKey: CryptoKey | null = null;
let cachedPublicKey: CryptoKey | null = null;

function resolvePrivateKeyPem(): string | null {
  const fromEnv = process.env.LICENSE_PRIVATE_KEY?.trim();
  if (fromEnv) {
    if (fromEnv.includes("BEGIN")) return fromEnv;
    return Buffer.from(fromEnv, "base64").toString("utf-8");
  }
  try {
    const keyPath = path.join(process.cwd(), "scripts", "license_private.pem");
    return readFileSync(keyPath, "utf-8");
  } catch {
    return null;
  }
}

async function getPrivateKey(): Promise<CryptoKey | null> {
  if (cachedPrivateKey) return cachedPrivateKey;
  const pem = resolvePrivateKeyPem();
  if (!pem) return null;
  cachedPrivateKey = await importPKCS8(pem, "RS256");
  return cachedPrivateKey;
}

async function getPublicKey(): Promise<CryptoKey> {
  if (cachedPublicKey) return cachedPublicKey;
  cachedPublicKey = await importSPKI(LICENSE_PUBLIC_KEY_PEM, "RS256");
  return cachedPublicKey;
}

export async function createLicenseToken(
  sub: Subscription,
  email: string
): Promise<string> {
  const payload: LicensePayload = {
    subscriptionId: sub.id,
    userId: sub.userId,
    email,
    productSlug: sub.productSlug,
    planId: sub.planId,
    planName: sub.planName,
    period: sub.period,
    expiresAt: sub.expiresAt,
    v: 2,
  };

  const expSeconds = Math.floor(new Date(sub.expiresAt).getTime() / 1000);
  const privateKey = await getPrivateKey();

  if (privateKey) {
    return new SignJWT(payload as unknown as Record<string, unknown>)
      .setProtectedHeader({ alg: "RS256" })
      .setIssuedAt()
      .setExpirationTime(expSeconds)
      .sign(privateKey);
  }

  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expSeconds)
    .sign(LEGACY_HS256_SECRET);
}

export async function verifyLicenseToken(token: string): Promise<LicensePayload | null> {
  try {
    const publicKey = await getPublicKey();
    const { payload } = await jwtVerify(token, publicKey, { algorithms: ["RS256"] });
    return payload as unknown as LicensePayload;
  } catch {
    try {
      const { payload } = await jwtVerify(token, LEGACY_HS256_SECRET, { algorithms: ["HS256"] });
      return payload as unknown as LicensePayload;
    } catch {
      return null;
    }
  }
}

export function subscriptionIsUsable(sub: Subscription): boolean {
  return sub.active && sub.status === "approved" && !isExpired(sub.expiresAt);
}

export function normalizeMachineId(machineId: unknown): string | null {
  if (typeof machineId !== "string") return null;
  const trimmed = machineId.trim().toLowerCase();
  if (!/^[a-f0-9]{32,64}$/.test(trimmed)) return null;
  return trimmed;
}

export function machineActivationAllowed(
  activatedMachines: string[] | undefined,
  machineId: string
): { allowed: boolean; reason?: "machine_limit" | "invalid_machine" } {
  const machines = activatedMachines ?? [];
  if (machines.includes(machineId)) return { allowed: true };
  if (machines.length >= MAX_MACHINES_PER_SUBSCRIPTION) {
    return { allowed: false, reason: "machine_limit" };
  }
  return { allowed: true };
}
