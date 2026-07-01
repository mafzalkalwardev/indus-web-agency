const fs = require("fs");
const bcrypt = require("bcryptjs");
const { Redis } = require("@upstash/redis");

function loadEnv() {
  const env = fs.readFileSync(".env.vercel", "utf8");
  const out = {};
  for (const line of env.split("\n")) {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) out[m[1]] = m[2].replace(/^"|"$/g, "");
  }
  return out;
}

async function getAdmin(redis) {
  const users = (await redis.get("indus:users")) || [];
  return users.find((u) => u.email === "admin@induswebagency.com");
}

async function main() {
  const env = loadEnv();
  const redis = new Redis({ url: env.KV_REST_API_URL, token: env.KV_REST_API_TOKEN });
  const pass = "Admin@Indus2026!";

  let admin = await getAdmin(redis);
  console.log("Before init - compare:", await bcrypt.compare(pass, admin?.passwordHash || ""));

  await fetch("https://indus-web-agency.vercel.app/api/init", { method: "POST" });

  admin = await getAdmin(redis);
  console.log("After init - compare:", await bcrypt.compare(pass, admin?.passwordHash || ""));

  const res = await fetch("https://indus-web-agency.vercel.app/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@induswebagency.com", password: pass }),
  });
  console.log("login:", res.status, await res.text());
}

main().catch(console.error);
