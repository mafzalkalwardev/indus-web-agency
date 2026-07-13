/**
 * Sync OPENAI_* vars from .env.vercel or .env.local to Vercel (production + preview).
 * Usage: node scripts/sync-openai-env.mjs
 */
import { readFileSync, existsSync } from "fs";
import { execSync } from "child_process";

function parseEnvFile(path) {
  const out = {};
  const content = readFileSync(path, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

const sources = [".env.vercel", ".env.local"];
const vars = {};

for (const file of sources) {
  if (!existsSync(file)) continue;
  Object.assign(vars, parseEnvFile(file));
}

const keys = ["OPENAI_API_KEY", "OPENAI_MODEL"];
let synced = 0;

for (const key of keys) {
  const value = vars[key]?.trim();
  if (!value) continue;

  for (const env of ["production"]) {
    execSync(
      `npx vercel env add ${key} ${env} --value "${value.replace(/"/g, '\\"')}" --yes --force`,
      { stdio: "inherit" }
    );
    synced++;
    console.log(`Synced ${key} → ${env}`);
  }
}

if (!synced) {
  console.error("No OPENAI_* variables found in .env.vercel or .env.local");
  process.exit(1);
}

console.log("Done. Redeploy production for changes to take effect.");
