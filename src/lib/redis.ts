import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

export function hasRedis(): boolean {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

function getRedis(): Redis {
  if (!redis) {
    redis = Redis.fromEnv();
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
