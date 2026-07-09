import "server-only";
import { createHash } from "crypto";
import { hasRedis, redisGet, redisSet } from "./redis";

const memoryBuckets = new Map<string, { count: number; resetAt: number }>();

export async function rateLimit(
  key: string,
  limit: number,
  windowSec: number
): Promise<{ ok: true } | { ok: false; retryAfterSec: number }> {
  const now = Date.now();
  const bucketKey = `ratelimit:${key}`;

  if (hasRedis()) {
    try {
      const { Redis } = await import("@upstash/redis");
      const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
      const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
      if (!url || !token) throw new Error("no redis");
      const redis = new Redis({ url, token });
      const count = await redis.incr(bucketKey);
      if (count === 1) await redis.expire(bucketKey, windowSec);
      const ttl = await redis.ttl(bucketKey);
      if (count > limit) {
        return { ok: false, retryAfterSec: Math.max(ttl, 1) };
      }
      return { ok: true };
    } catch {
      // fall through to memory
    }
  }

  const bucket = memoryBuckets.get(bucketKey);
  if (!bucket || bucket.resetAt <= now) {
    memoryBuckets.set(bucketKey, { count: 1, resetAt: now + windowSec * 1000 });
    return { ok: true };
  }
  bucket.count += 1;
  if (bucket.count > limit) {
    return { ok: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true };
}

export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

export function passwordFingerprint(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

const ADMIN_PW_FP_KEY = "indus:admin_password_fp";

export async function getStoredAdminPasswordFp(): Promise<string> {
  return redisGet(ADMIN_PW_FP_KEY, "");
}

export async function setStoredAdminPasswordFp(fp: string): Promise<void> {
  await redisSet(ADMIN_PW_FP_KEY, fp);
}
