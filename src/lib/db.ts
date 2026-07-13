import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { hasRedis, redisGet, redisSet, REDIS_KEYS } from "./redis";
import { getBillingOption, type BillingPeriod, type SubscriptionStatus } from "./billing";
import { isExpired, daysRemaining } from "./utils";
import { passwordFingerprint, getStoredAdminPasswordFp, setStoredAdminPasswordFp } from "./rate-limit";

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
  /** ISO timestamps when expiry reminder emails were sent */
  expiryReminder7dAt?: string;
  expiryReminder1dAt?: string;
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

/** Send 7-day and 1-day expiry reminder flags; returns count of reminders marked */
export async function markExpiryRemindersSent(
  updates: { id: string; field: "expiryReminder7dAt" | "expiryReminder1dAt" }[]
): Promise<void> {
  if (updates.length === 0) return;
  const subs = await getSubscriptions();
  const byId = Object.fromEntries(updates.map((u) => [u.id, u.field]));
  const now = new Date().toISOString();
  const updated = subs.map((sub) => {
    const field = byId[sub.id];
    if (!field) return sub;
    return { ...sub, [field]: now };
  });
  await saveSubscriptions(updated);
}

export function getSubscriptionsNeedingExpiryReminders(subs: Subscription[]): {
  sub: Subscription;
  daysLeft: number;
  field: "expiryReminder7dAt" | "expiryReminder1dAt";
}[] {
  const out: { sub: Subscription; daysLeft: number; field: "expiryReminder7dAt" | "expiryReminder1dAt" }[] = [];
  for (const sub of subs) {
    if (!sub.active || sub.status !== "approved" || isExpired(sub.expiresAt)) continue;
    const days = daysRemaining(sub.expiresAt);
    if (days <= 7 && days > 1 && !sub.expiryReminder7dAt) {
      out.push({ sub, daysLeft: days, field: "expiryReminder7dAt" });
    } else if (days <= 1 && days >= 0 && !sub.expiryReminder1dAt) {
      out.push({ sub, daysLeft: Math.max(days, 1), field: "expiryReminder1dAt" });
    }
  }
  return out;
}

export async function createRenewalSubscription(
  userId: string,
  previousSubId: string,
  productSlug: string,
  planId: string,
  planName: string,
  price: number,
  durationDays: number,
  period: BillingPeriod
): Promise<Subscription | { error: string }> {
  const subs = await getSubscriptions();
  const prev = subs.find((s) => s.id === previousSubId && s.userId === userId);
  if (!prev) return { error: "Subscription not found" };

  const canRenew =
    prev.status === "rejected" ||
    prev.status === "expired" ||
    isExpired(prev.expiresAt) ||
    daysRemaining(prev.expiresAt) <= 7;

  if (!canRenew) {
    return { error: "Renewal is only available within 7 days of expiry or after expiration" };
  }

  const hasPending = subs.some(
    (s) =>
      s.userId === userId &&
      s.productSlug === productSlug &&
      s.active &&
      s.status === "pending" &&
      !isExpired(s.expiresAt)
  );
  if (hasPending) return { error: "You already have a pending renewal for this product" };

  const idx = subs.findIndex((s) => s.id === previousSubId);
  if (idx !== -1 && prev.active && prev.status === "approved" && !isExpired(prev.expiresAt)) {
    subs[idx] = { ...subs[idx], active: false };
  }

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
    status: "pending",
    startsAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    active: true,
    createdAt: now.toISOString(),
  };
  subs.push(sub);
  await saveSubscriptions(subs);
  return sub;
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
  const envPassword = process.env.ADMIN_PASSWORD?.trim();
  const defaultPassword = "Admin@Indus2026!";
  const adminPassword = envPassword || defaultPassword;

  const users = await getUsers();
  const existingIdx = users.findIndex((u) => u.email === adminEmail);
  const fp = passwordFingerprint(adminPassword);
  const storedFp = await getStoredAdminPasswordFp();

  if (existingIdx === -1) {
    const adminUser: User = {
      id: uuidv4(),
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 10),
      name: "INDUS Admin",
      role: "admin",
      createdAt: new Date().toISOString(),
    };
    await saveUsers([...users, adminUser]);
    await setStoredAdminPasswordFp(fp);
    return;
  }

  if (envPassword && storedFp !== fp) {
    const updated = [...users];
    updated[existingIdx] = {
      ...updated[existingIdx],
      passwordHash: await bcrypt.hash(adminPassword, 10),
      role: "admin",
    };
    await saveUsers(updated);
    await setStoredAdminPasswordFp(fp);
  }
}

function envOr(key: string, fallback: string): string {
  const value = process.env[key]?.trim();
  return value ? value : fallback;
}

export async function getStorageMode(): Promise<"redis" | "file"> {
  return hasRedis() ? "redis" : "file";
}

export type ProjectInquiryStatus = "new" | "reviewed" | "contacted" | "closed";

export interface ProjectInquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  description: string;
  status: ProjectInquiryStatus;
  createdAt: string;
}

export async function getProjectInquiries(): Promise<ProjectInquiry[]> {
  return readStore(REDIS_KEYS.projectInquiries, "project_inquiries.json", []);
}

export async function saveProjectInquiries(inquiries: ProjectInquiry[]): Promise<void> {
  await writeStore(REDIS_KEYS.projectInquiries, "project_inquiries.json", inquiries);
}

export async function createProjectInquiry(data: Omit<ProjectInquiry, "id" | "status" | "createdAt">): Promise<ProjectInquiry> {
  const inquiries = await getProjectInquiries();
  const inquiry: ProjectInquiry = {
    id: uuidv4(),
    ...data,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  inquiries.unshift(inquiry);
  await saveProjectInquiries(inquiries);
  return inquiry;
}

export async function updateProjectInquiryStatus(
  id: string,
  status: ProjectInquiryStatus
): Promise<ProjectInquiry | null> {
  const inquiries = await getProjectInquiries();
  const idx = inquiries.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  inquiries[idx] = { ...inquiries[idx], status };
  await saveProjectInquiries(inquiries);
  return inquiries[idx];
}

export type ContactInquiryStatus = "new" | "reviewed" | "replied" | "closed";

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  topic: string;
  subject?: string;
  message: string;
  status: ContactInquiryStatus;
  createdAt: string;
}

export async function getContactInquiries(): Promise<ContactInquiry[]> {
  return readStore(REDIS_KEYS.contactInquiries, "contact_inquiries.json", []);
}

export async function saveContactInquiries(inquiries: ContactInquiry[]): Promise<void> {
  await writeStore(REDIS_KEYS.contactInquiries, "contact_inquiries.json", inquiries);
}

export async function createContactInquiry(
  data: Omit<ContactInquiry, "id" | "status" | "createdAt">
): Promise<ContactInquiry> {
  const inquiries = await getContactInquiries();
  const inquiry: ContactInquiry = {
    id: uuidv4(),
    ...data,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  inquiries.unshift(inquiry);
  await saveContactInquiries(inquiries);
  return inquiry;
}

export async function updateContactInquiryStatus(
  id: string,
  status: ContactInquiryStatus
): Promise<ContactInquiry | null> {
  const inquiries = await getContactInquiries();
  const idx = inquiries.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  inquiries[idx] = { ...inquiries[idx], status };
  await saveContactInquiries(inquiries);
  return inquiries[idx];
}
