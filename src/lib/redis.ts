import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

function redisUrl(): string | undefined {
  return process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
}

function redisToken(): string | undefined {
  return process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
}

export function hasRedis(): boolean {
  return !!(redisUrl() && redisToken());
}

function getRedis(): Redis {
  if (!redis) {
    const url = redisUrl();
    const token = redisToken();
    if (url && token) {
      redis = new Redis({ url, token });
    } else {
      redis = Redis.fromEnv();
    }
  }
  return redis;
}

export async function redisGet<T>(key: string, fallback: T): Promise<T> {
  if (!hasRedis()) return fallback;
  try {
    const value = await getRedis().get<T>(key);
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export async function redisSet<T>(key: string, value: T): Promise<void> {
  if (!hasRedis()) return;
  await getRedis().set(key, value);
}

export const REDIS_KEYS = {
  users: "indus:users",
  subscriptions: "indus:subscriptions",
} as const;
