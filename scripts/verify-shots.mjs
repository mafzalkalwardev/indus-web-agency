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
  { path: "/work/enterprise-ai-dialer", file: "case-study" },
  { path: "/start-project", file: "start-project" },
  { path: "/products", file: "products" },
  { path: "/products/dialer-multi-slot", file: "product-detail" },
  { path: "/pricing", file: "pricing" },
  { path: "/compare", file: "compare" },
  { path: "/demos", file: "demos" },
  { path: "/contact", file: "contact" },
  { path: "/guides", file: "guides" },
  { path: "/tools/dialer-calculator", file: "dialer-calculator" },
  { path: "/resources/dialer-guide", file: "dialer-guide" },
  { path: "/about", file: "about" },
];

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

let failed = 0;

for (const { path: route, file } of PAGES) {
  const url = `${BASE.replace(/\/$/, "")}${route}`;
  console.log(`Capturing ${url}`);
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  } catch {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  }
  await page.waitForTimeout(2200);
  const title = await page.title();
  if (title.toLowerCase().includes("not found")) {
    console.error(`  FAIL: ${route} returned not-found title`);
    failed++;
    continue;
  }
  await page.screenshot({ path: path.join(OUT, `${file}-top.png`), fullPage: false });
  await page.screenshot({ path: path.join(OUT, `${file}-full.png`), fullPage: true });
  console.log(`  OK: ${file}`);
}

await browser.close();
console.log(`Saved to ${OUT}`);
if (failed > 0) {
  console.error(`${failed} page(s) failed verification`);
  process.exit(1);
}
