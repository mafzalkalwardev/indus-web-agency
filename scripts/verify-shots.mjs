import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, ".verify-shots");
const BASE = process.argv[2] || "http://localhost:3000";

const PAGES = [
  { path: "/", file: "home" },
  { path: "/services", file: "services" },
  { path: "/work", file: "work" },
  { path: "/start-project", file: "start-project" },
  { path: "/products", file: "products" },
  { path: "/pricing", file: "pricing" },
  { path: "/compare", file: "compare" },
  { path: "/demos", file: "demos" },
];

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

for (const { path: route, file } of PAGES) {
  const url = `${BASE.replace(/\/$/, "")}${route}`;
  console.log(`Capturing ${url}`);
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  } catch {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  }
  await page.waitForTimeout(2200);
  await page.screenshot({ path: path.join(OUT, `${file}-top.png`), fullPage: false });
  await page.screenshot({ path: path.join(OUT, `${file}-full.png`), fullPage: true });
}

await browser.close();
console.log(`Saved to ${OUT}`);
