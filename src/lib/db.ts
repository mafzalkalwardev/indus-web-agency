import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { hasRedis, redisGet, redisSet, REDIS_KEYS } from "./redis";
import { getBillingOption, type BillingPeriod, type SubscriptionStatus } from "./billing";
import { isExpired } from "./utils";

const DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "indus-data")
  : path.join(process.cwd(), "data");

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: "customer" | "admin";
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  productSlug: string;
  planId: string;
  planName: string;
  price: number;
  period: BillingPeriod;
  status: SubscriptionStatus;
  startsAt: string;
  expiresAt: string;
  active: boolean;
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
  /** SHA-256 machine fingerprints bound to this subscription (max 2). */
  activatedMachines?: string[];
}

function normalizeSubscription(sub: Subscription): Subscription {
  return {
    ...sub,
    period: sub.period ?? "month",
    status: sub.status ?? "approved",
  };
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

async function readStore<T>(redisKey: string, filename: string, fallback: T): Promise<T> {
  if (hasRedis()) {
    return redisGet(redisKey, fallback);
  }
  return readJsonFile(filename, fallback);
}

async function writeStore<T>(redisKey: string, filename: string, data: T): Promise<void> {
  if (hasRedis()) {
    await redisSet(redisKey, data);
  }
  await writeJsonFile(filename, data);
}

export async function getUsers(): Promise<User[]> {
  return readStore(REDIS_KEYS.users, "users.json", []);
}

export async function saveUsers(users: User[]): Promise<void> {
  await writeStore(REDIS_KEYS.users, "users.json", users);
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function getUserById(id: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((u) => u.id === id);
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: "customer" | "admin" = "customer"
): Promise<User> {
  const users = await getUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("Email already registered");
  }
  const user: User = {
    id: uuidv4(),
    email: email.toLowerCase(),
    passwordHash: await bcrypt.hash(password, 10),
    name,
    role,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  await saveUsers(users);
  return user;
}

export async function verifyPassword(user: User, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.passwordHash);
}

export async function getSubscriptions(): Promise<Subscription[]> {
  const subs = await readStore<Subscription[]>(REDIS_KEYS.subscriptions, "subscriptions.json", []);
  return subs.map(normalizeSubscription);
}

export async function saveSubscriptions(subs: Subscription[]): Promise<void> {
  await writeStore(REDIS_KEYS.subscriptions, "subscriptions.json", subs);
}

export async function getUserSubscriptions(userId: string): Promise<Subscription[]> {
  const subs = await getSubscriptions();
  return subs.filter((s) => s.userId === userId);
}

export async function getSubscriptionById(id: string): Promise<Subscription | undefined> {
  const subs = await getSubscriptions();
  return subs.find((s) => s.id === id);
}

export async function createSubscription(
  userId: string,
  productSlug: string,
  planId: string,
  planName: string,
  price: number,
  durationDays: number,
  period: BillingPeriod = "month",
  status: SubscriptionStatus = "pending"
): Promise<Subscription> {
  const subs = await getSubscriptions();
  const now = new Date();
  const expires = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);
  const sub: Subscription = {
    id: uuidv4(),
    userId,
    productSlug,
    planId,
    planName,
    price,
    period,
    status,
    startsAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    active: true,
    createdAt: now.toISOString(),
    ...(status === "approved" ? { approvedAt: now.toISOString() } : {}),
  };
  subs.push(sub);
  await saveSubscriptions(subs);
  return sub;
}

export async function updateSubscriptionStatus(
  subscriptionId: string,
  status: SubscriptionStatus,
  adminUserId?: string
): Promise<Subscription | null> {
  const subs = await getSubscriptions();
  const idx = subs.findIndex((s) => s.id === subscriptionId);
  if (idx === -1) return null;

  const now = new Date();
  const current = subs[idx];

  if (status === "approved" && current.status === "pending") {
    const durationDays = getBillingOption(current.period).durationDays;
    const expires = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);
    subs[idx] = {
      ...current,
      status,
      startsAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      approvedAt: now.toISOString(),
      approvedBy: adminUserId,
    };
  } else {
    subs[idx] = {
      ...current,
      status,
      approvedAt: status === "approved" ? now.toISOString() : current.approvedAt,
      approvedBy: status === "approved" ? adminUserId : current.approvedBy,
    };
  }

  await saveSubscriptions(subs);
  return subs[idx];
}

export async function deactivateExpiredSubscriptions(): Promise<number> {
  const subs = await getSubscriptions();
  let changed = 0;

  const updated = subs.map((sub) => {
    if (sub.active && isExpired(sub.expiresAt)) {
      changed += 1;
      return { ...sub, active: false, status: "expired" as SubscriptionStatus };
    }
    return sub;
  });

  if (changed > 0) {
    await saveSubscriptions(updated);
  }
  return changed;
}

export async function findActiveSubscription(
  userId: string,
  productSlug: string
): Promise<Subscription | undefined> {
  const subs = await getUserSubscriptions(userId);
  return subs.find(
    (s) =>
      s.productSlug === productSlug &&
      s.active &&
      !isExpired(s.expiresAt) &&
      s.status === "approved"
  );
}

export async function bindMachineToSubscription(
  subscriptionId: string,
  machineId: string,
  maxMachines: number
): Promise<{ ok: true } | { ok: false; reason: "not_found" | "machine_limit" }> {
  const subs = await getSubscriptions();
  const idx = subs.findIndex((s) => s.id === subscriptionId);
  if (idx === -1) return { ok: false, reason: "not_found" };

  const current = subs[idx];
  const machines = current.activatedMachines ?? [];
  if (machines.includes(machineId)) return { ok: true };
  if (machines.length >= maxMachines) return { ok: false, reason: "machine_limit" };

  subs[idx] = { ...current, activatedMachines: [...machines, machineId] };
  await saveSubscriptions(subs);
  return { ok: true };
}

export async function resetSubscriptionMachines(subscriptionId: string): Promise<boolean> {
  const subs = await getSubscriptions();
  const idx = subs.findIndex((s) => s.id === subscriptionId);
  if (idx === -1) return false;
  subs[idx] = { ...subs[idx], activatedMachines: [] };
  await saveSubscriptions(subs);
  return true;
}

export async function initDefaultAdmin(): Promise<void> {
  const adminEmail = envOr("ADMIN_EMAIL", "admin@induswebagency.com").toLowerCase();
  const adminPassword = envOr("ADMIN_PASSWORD", "Admin@Indus2026!");
  const users = await getUsers();
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const withoutAdmin = users.filter(
    (u) => u.role !== "admin" && u.email !== adminEmail
  );

  const adminUser: User = {
    id: users.find((u) => u.email === adminEmail)?.id ?? uuidv4(),
    email: adminEmail,
    passwordHash,
    name: "INDUS Admin",
    role: "admin",
    createdAt: users.find((u) => u.email === adminEmail)?.createdAt ?? new Date().toISOString(),
  };

  await saveUsers([...withoutAdmin, adminUser]);
}

function envOr(key: string, fallback: string): string {
  const value = process.env[key]?.trim();
  return value ? value : fallback;
}

export async function getStorageMode(): Promise<"redis" | "file"> {
  return hasRedis() ? "redis" : "file";
}
