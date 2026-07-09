"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const os = require("os");

const LICENSE_VERIFY_URL = "https://indus-web-agency.vercel.app/api/license/verify";
const LICENSE_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvSs97mdbBj+wgf4mLVqQ
kyE2DKQuTxhhJ+Ze8YLM162CjOiUllUOft+8l2eAnb8ER+OX/gqBDybwv7ncDtDy
jStlygwGv1L5EuT4mMrCEaxRgsyHct36JgkcSZ5Fxk+zFSjFbq1+mN02AT/sZ6xo
NXWqBYto2L9RZp4I66GmLMXePz4Q+1DgraC4eB/YGsFKg32SebRISDoFzMhcayKH
lBVJz+riN+psvHpehA2dshiAw47JpTpvRohTrXzeGkNiZucnzADGEFQ+T2KzSfau
djQ6lxfLVF7CgFf/QFSnDUhUfrrwkMFqnztpAOGjwiw0/NceocYsQSUWjzsoq9cR
LwIDAQAB
-----END PUBLIC KEY-----`;
const LICENSE_PREFIX = "indus-license";
const OFFLINE_GRACE_HOURS = 48;
const PERIODIC_CHECK_MS = 4 * 60 * 60 * 1000;

function b64urlDecode(input) {
  const pad = "=".repeat((4 - (input.length % 4)) % 4);
  return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

function getMachineId() {
  const macs = Object.values(os.networkInterfaces())
    .flat()
    .map((i) => i && i.mac)
    .filter((m) => m && m !== "00:00:00:00:00:00");
  const raw = [os.hostname(), os.platform(), os.arch(), ...macs].join("|");
  return crypto.createHash("sha256").update(raw).digest("hex");
}

function verifyJwtLocally(token) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [headerB64, payloadB64, sigB64] = parts;
  let header;
  try {
    header = JSON.parse(b64urlDecode(headerB64).toString("utf8"));
  } catch {
    return null;
  }
  if (header.alg !== "RS256") return null;
  const data = Buffer.from(`${headerB64}.${payloadB64}`);
  const sig = b64urlDecode(sigB64);
  const key = crypto.createPublicKey(LICENSE_PUBLIC_KEY_PEM);
  if (!crypto.verify("RSA-SHA256", data, key, sig)) return null;
  try {
    const payload = JSON.parse(b64urlDecode(payloadB64).toString("utf8"));
    if (!payload.exp || payload.exp * 1000 <= Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

function devSkipAllowed(root) {
  const env = String(process.env.INDUS_LICENSE_DEV || "").toLowerCase();
  if (!["1", "true", "yes", "on"].includes(env)) return false;
  return fs.existsSync(path.join(root, ".indus-dev-local"));
}

function searchDirs(root) {
  const dirs = [root];
  const data = path.join(root, "data");
  if (fs.existsSync(data)) dirs.push(data);
  return dirs;
}

function findLicenseFile(root) {
  for (const dir of searchDirs(root)) {
    let names = [];
    try {
      names = fs.readdirSync(dir);
    } catch {
      continue;
    }
    for (const name of names.sort()) {
      const lower = name.toLowerCase();
      if (lower.startsWith(LICENSE_PREFIX) && lower.endsWith(".json")) {
        return path.join(dir, name);
      }
    }
  }
  return null;
}

function parseIso(value) {
  if (!value) return null;
  const t = Date.parse(value);
  return Number.isNaN(t) ? null : t;
}

function isExpired(expiresAt) {
  const t = parseIso(expiresAt);
  return t === null || t <= Date.now();
}

function cachePath(root) {
  const dir = path.join(root, "data");
  fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, "indus_license_cache.json");
}

async function verifyOnline(record) {
  const res = await fetch(LICENSE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ licenseToken: record.licenseToken, machineId: getMachineId() }),
  });
  const data = await res.json().catch(() => ({}));
  if (data.valid) {
    return {
      ok: true,
      expiresAt: data.expiresAt || record.expiresAt,
      productSlug: data.productSlug || record.productSlug,
    };
  }
  return { ok: false, reason: data.reason || "invalid", message: data.error || "License invalid" };
}

async function verifyLicense(root, licensePath) {
  if (devSkipAllowed(root)) return { ok: true };
  const file = licensePath || findLicenseFile(root);
  if (!file) {
    throw new Error(
      "No INDUS license file found. Download from https://indus-web-agency.vercel.app/dashboard"
    );
  }
  const record = JSON.parse(fs.readFileSync(file, "utf8"));
  record.licenseToken = record.licenseToken || record.license_token;
  record.expiresAt = record.expiresAt || record.expires_at;
  record.productSlug = record.productSlug || record.product_slug;
  if (!record.licenseToken) throw new Error("License file missing licenseToken");

  const localPayload = verifyJwtLocally(record.licenseToken);
  if (!localPayload) {
    throw new Error("License signature invalid or token expired — renew at indus-web-agency.vercel.app");
  }

  const tokenExpires = String(localPayload.expiresAt || record.expiresAt);
  if (isExpired(tokenExpires)) {
    throw new Error("Subscription expired — renew at indus-web-agency.vercel.app");
  }

  try {
    const online = await verifyOnline(record);
    if (online.ok) {
      fs.writeFileSync(
        cachePath(root),
        JSON.stringify(
          { verifiedAt: new Date().toISOString(), expiresAt: online.expiresAt, licensePath: file },
          null,
          2
        )
      );
      return online;
    }
    throw new Error(online.message || "License verification failed");
  } catch (err) {
    if (err.message && !String(err.message).includes("fetch")) throw err;
    try {
      const cache = JSON.parse(fs.readFileSync(cachePath(root), "utf8"));
      if (cache.licensePath === file && cache.expiresAt && !isExpired(cache.expiresAt)) {
        const ageH = (Date.now() - Date.parse(cache.verifiedAt)) / 3600000;
        if (ageH <= OFFLINE_GRACE_HOURS) return { ok: true, offline: true, expiresAt: cache.expiresAt };
      }
    } catch {
      /* no cache */
    }
    throw new Error(err.message || "Could not verify license online");
  }
}

function startPeriodicLicenseCheck(root, licensePath) {
  const file = licensePath || findLicenseFile(root);
  if (!file) return () => {};
  const record = JSON.parse(fs.readFileSync(file, "utf8"));
  record.licenseToken = record.licenseToken || record.license_token;

  const timer = setInterval(async () => {
    try {
      await verifyLicense(root, file);
    } catch (err) {
      console.error("[INDUS License]", err.message || err);
      process.exit(1);
    }
  }, PERIODIC_CHECK_MS);
  if (timer.unref) timer.unref();
  return () => clearInterval(timer);
}

async function requireIndusLicense(root) {
  await verifyLicense(root);
  startPeriodicLicenseCheck(root);
}

module.exports = {
  requireIndusLicense,
  verifyLicense,
  findLicenseFile,
  getMachineId,
  verifyJwtLocally,
  startPeriodicLicenseCheck,
  LICENSE_VERIFY_URL,
};
