/**
 * Capture marketing screenshots for README / docs.
 * Usage: node scripts/capture-website-screenshots.mjs [baseUrl]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "docs", "screenshots");
const BASE = process.argv[2] || "http://localhost:3000";

const PAGES = [
  { path: "/", file: "home.png", label: "Homepage" },
  { path: "/products", file: "products.png", label: "Products" },
  { path: "/pricing", file: "pricing.png", label: "Pricing" },
  { path: "/compare", file: "compare.png", label: "Compare" },
  { path: "/demos", file: "demos.png", label: "Live Demos" },
  { path: "/products/dialer-ai-multi-slot", file: "product-detail.png", label: "Product Detail" },
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
  console.log(`Capturing ${url} → ${file}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT, file), fullPage: false });
}

await browser.close();
console.log(`Saved ${PAGES.length} screenshots to docs/screenshots/`);
