const fs = require("fs");
const bcrypt = require("bcryptjs");
const { Redis } = require("@upstash/redis");
const { v4: uuidv4 } = require("uuid");

function loadEnv() {
  const env = fs.readFileSync(".env.vercel", "utf8");
  const out = {};
  for (const line of env.split("\n")) {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) out[m[1]] = m[2].replace(/^"|"$/g, "");
  }
  return out;
}

async function main() {
  const env = loadEnv();
  const redis = new Redis({ url: env.KV_REST_API_URL, token: env.KV_REST_API_TOKEN });
  const adminEmail = (env.ADMIN_EMAIL || "admin@induswebagency.com").trim().toLowerCase();
  const adminPassword = (env.ADMIN_PASSWORD || "Admin@Indus2026!").trim();

  let users = (await redis.get("indus:users")) || [];
  console.log("Before:", users.map((u) => ({ email: u.email, role: u.role })));

  users = users.filter((u) => u.role !== "admin" && u.email !== adminEmail);
  const hash = await bcrypt.hash(adminPassword, 10);
  users.push({
    id: uuidv4(),
    email: adminEmail,
    passwordHash: hash,
    name: "INDUS Admin",
    role: "admin",
    createdAt: new Date().toISOString(),
  });

  await redis.set("indus:users", users);
  const verify = await bcrypt.compare(adminPassword, hash);
  console.log("Password verify:", verify);
  console.log("After:", users.map((u) => ({ email: u.email, role: u.role })));
}

main().catch(console.error);
