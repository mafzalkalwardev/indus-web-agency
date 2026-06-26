import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

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
  startsAt: string;
  expiresAt: string;
  active: boolean;
  createdAt: string;
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function getUsers(): Promise<User[]> {
  return readJson<User[]>("users.json", []);
}

export async function saveUsers(users: User[]): Promise<void> {
  await writeJson("users.json", users);
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
  return readJson<Subscription[]>("subscriptions.json", []);
}

export async function saveSubscriptions(subs: Subscription[]): Promise<void> {
  await writeJson("subscriptions.json", subs);
}

export async function getUserSubscriptions(userId: string): Promise<Subscription[]> {
  const subs = await getSubscriptions();
  return subs.filter((s) => s.userId === userId);
}

export async function createSubscription(
  userId: string,
  productSlug: string,
  planId: string,
  planName: string,
  price: number,
  durationDays: number
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
    startsAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    active: true,
    createdAt: now.toISOString(),
  };
  subs.push(sub);
  await saveSubscriptions(subs);
  return sub;
}

export async function initDefaultAdmin(): Promise<void> {
  const users = await getUsers();
  const adminEmail = process.env.ADMIN_EMAIL || "admin@induswebagency.com";
  if (!users.some((u) => u.role === "admin")) {
    await createUser(
      adminEmail,
      process.env.ADMIN_PASSWORD || "Admin@Indus2026!",
      "INDUS Admin",
      "admin"
    );
  }
}
