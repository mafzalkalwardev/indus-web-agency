/**
 * Sync and capture real product screenshots/videos for the INDUS marketplace.
 *
 * Usage:
 *   node scripts/capture-product-media.mjs          # sync from product repos
 *   node scripts/capture-product-media.mjs --live   # also capture live web UIs via Playwright
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DISPATCH = path.resolve(ROOT, "..");
const INDUS_PRODUCTS = path.join(DISPATCH, "_indus-products");
const AUTO_DIALER = path.join(DISPATCH, "Auto Dialer");
const OUT = path.join(ROOT, "public", "images", "products");

const LIVE = process.argv.includes("--live");

/** @type {Record<string, { sources: { from: string; to: string }[]; live?: { cwd: string; cmd: string; port: number; pages: { path: string; file: string }[] } }>} */
const PRODUCT_MEDIA = {
  "email-verifier-pro": {
    sources: [
      { from: path.join(INDUS_PRODUCTS, "email-verifier-pro/docs/screenshots/app.png"), to: "hero.png" },
    ],
    live: {
      cwd: path.join(INDUS_PRODUCTS, "email-verifier-pro"),
      cmd: "npm start",
      port: 5000,
      pages: [
        { path: "/", file: "hero.png" },
        { path: "/dashboard.html", file: "dashboard.png" },
        { path: "/bulk.html", file: "bulk.png" },
        { path: "/history.html", file: "history.png" },
      ],
    },
  },
  "bulk-email-verifier": {
    sources: [
      { from: path.join(INDUS_PRODUCTS, "bulk-email-verifier/docs/screenshots/app.png"), to: "hero.png" },
      { from: path.join(INDUS_PRODUCTS, "bulk-email-verifier/docs/screenshots/demo.webm"), to: "demo.webm" },
    ],
    live: {
      cwd: path.join(INDUS_PRODUCTS, "bulk-email-verifier"),
      cmd: "npm start",
      port: 5000,
      pages: [
        { path: "/", file: "hero.png" },
        { path: "/dashboard.html", file: "dashboard.png" },
      ],
    },
  },
  "auto-email-sender": {
    sources: [
      { from: path.join(INDUS_PRODUCTS, "multi-smtp-email-automation/docs/screenshots/app.png"), to: "hero.png" },
    ],
  },
  "unified-inbox": {
    sources: [
      { from: path.join(INDUS_PRODUCTS, "mailforge/docs/screenshots/inbox.png"), to: "hero.png" },
      { from: path.join(INDUS_PRODUCTS, "mailforge/docs/screenshots/dashboard.png"), to: "dashboard.png" },
    ],
  },
  mailforge: {
    sources: [
      { from: path.join(INDUS_PRODUCTS, "mailforge/docs/screenshots/dashboard.png"), to: "hero.png" },
      { from: path.join(INDUS_PRODUCTS, "mailforge/docs/screenshots/inbox.png"), to: "inbox.png" },
      { from: path.join(INDUS_PRODUCTS, "mailforge/docs/screenshots/templates.png"), to: "templates.png" },
      { from: path.join(INDUS_PRODUCTS, "mailforge/docs/screenshots/bulk-import-dark.png"), to: "bulk-import.png" },
      { from: path.join(INDUS_PRODUCTS, "mailforge/docs/screenshots/senders-dark.png"), to: "senders.png" },
    ],
  },
  "dialer-starter-dom": {
    sources: [
      { from: path.join(INDUS_PRODUCTS, "python-auto-dialer-pro/docs/screenshots/app.png"), to: "hero.png" },
      { from: path.join(AUTO_DIALER, "docs/screenshots/dialer-light.png"), to: "dialer.png" },
      { from: path.join(AUTO_DIALER, "docs/screenshots/login-light.png"), to: "login.png" },
    ],
  },
  "dialer-multi-slot": {
    sources: [
      { from: path.join(AUTO_DIALER, "docs/screenshots/live-calls-light.png"), to: "hero.png" },
      { from: path.join(AUTO_DIALER, "docs/screenshots/dialer-light.png"), to: "dialer.png" },
      { from: path.join(AUTO_DIALER, "docs/screenshots/administration-light.png"), to: "administration.png" },
      { from: path.join(AUTO_DIALER, "docs/screenshots/call-logs-light.png"), to: "call-logs.png" },
      { from: path.join(AUTO_DIALER, "docs/screenshots/crm-light.png"), to: "crm.png" },
    ],
  },
  "dialer-ai-agent": {
    sources: [
      { from: path.join(INDUS_PRODUCTS, "google-voice-dispatch-agent/docs/screenshots/app.png"), to: "hero.png" },
      { from: path.join(INDUS_PRODUCTS, "google-voice-dispatch-agent/docs/screenshots/demo.webm"), to: "demo.webm" },
    ],
    live: {
      cwd: path.join(INDUS_PRODUCTS, "google-voice-dispatch-agent"),
      cmd: "python -m src.web_app",
      port: 8000,
      pages: [
        { path: "/run", file: "hero.png" },
        { path: "/logs", file: "logs.png" },
        { path: "/crm", file: "crm.png" },
      ],
    },
  },
  "dialer-ai-multi-slot": {
    sources: [
      { from: path.join(AUTO_DIALER, "docs/screenshots/live-calls-dark.png"), to: "hero.png" },
      { from: path.join(AUTO_DIALER, "docs/screenshots/administration-dark.png"), to: "administration.png" },
      { from: path.join(AUTO_DIALER, "docs/screenshots/crm-dark.png"), to: "crm.png" },
      { from: path.join(INDUS_PRODUCTS, "google-voice-dispatch-agent/docs/screenshots/app.png"), to: "ai-console.png" },
      { from: path.join(INDUS_PRODUCTS, "google-voice-dispatch-agent/docs/screenshots/demo.webm"), to: "demo.webm" },
    ],
  },
  "playwright-scraper-pro": {
    sources: [
      { from: path.join(INDUS_PRODUCTS, "playwright-website-scraper-pro/docs/screenshots/home.png"), to: "hero.png" },
      { from: path.join(INDUS_PRODUCTS, "playwright-website-scraper-pro/docs/screenshots/app.png"), to: "scraper.png" },
      { from: path.join(INDUS_PRODUCTS, "playwright-website-scraper-pro/docs/screenshots/demo.webm"), to: "demo.webm" },
    ],
    live: {
      cwd: path.join(INDUS_PRODUCTS, "playwright-website-scraper-pro"),
      cmd: "npm start",
      port: 3000,
      pages: [{ path: "/", file: "hero.png" }],
    },
  },
  "fmcsa-safer-scraper": {
    sources: [
      { from: path.join(INDUS_PRODUCTS, "fmcsa-safer-scraper/docs/screenshots/app.png"), to: "hero.png" },
    ],
  },
  "canadian-website-scraper": {
    sources: [
      { from: path.join(INDUS_PRODUCTS, "Canadian-Website-Scraper/docs/screenshots/app.png"), to: "hero.png" },
    ],
    live: {
      cwd: path.join(INDUS_PRODUCTS, "Canadian-Website-Scraper"),
      cmd: "npm start",
      port: 3000,
      pages: [{ path: "/", file: "hero.png" }],
    },
  },
  "fiverr-lead-extractor": {
    sources: [
      { from: path.join(INDUS_PRODUCTS, "fiverr-lead-extractor-crm/docs/screenshots/app.png"), to: "hero.png" },
    ],
  },
};

function copyFile(from, to) {
  if (!fs.existsSync(from)) {
    console.warn(`  skip missing: ${from}`);
    return false;
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  console.log(`  copied ${path.basename(to)}`);
  return true;
}

function syncSources() {
  console.log("\n=== Syncing product media from repos ===\n");
  let copied = 0;
  for (const [slug, config] of Object.entries(PRODUCT_MEDIA)) {
    console.log(`[${slug}]`);
    const dir = path.join(OUT, slug);
    fs.mkdirSync(dir, { recursive: true });
    for (const { from, to } of config.sources) {
      if (copyFile(from, path.join(dir, to))) copied++;
    }
  }
  console.log(`\nSynced ${copied} files into ${OUT}\n`);
  return copied;
}

function waitForPort(port, timeoutMs = 60000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
      import("node:net").then(({ default: net }) => {
        const sock = net.createConnection({ port, host: "127.0.0.1" });
        sock.once("connect", () => {
          sock.destroy();
          resolve(true);
        });
        sock.once("error", () => {
          sock.destroy();
          if (Date.now() - start > timeoutMs) reject(new Error(`Port ${port} not ready`));
          else setTimeout(tick, 500);
        });
      });
    };
    tick();
  });
}

function startProcess(cwd, cmd) {
  const child = spawn(cmd, { cwd, shell: true, stdio: "pipe", env: { ...process.env, FORCE_COLOR: "0" } });
  child.stdout?.on("data", (d) => process.stdout.write(`  [${path.basename(cwd)}] ${d}`));
  child.stderr?.on("data", (d) => process.stderr.write(`  [${path.basename(cwd)}] ${d}`));
  return child;
}

async function captureLive() {
  const { chromium } = await import("playwright");

  console.log("\n=== Live Playwright capture ===\n");
  const browser = await chromium.launch({ headless: true });

  for (const [slug, config] of Object.entries(PRODUCT_MEDIA)) {
    if (!config.live) continue;
    const { cwd, cmd, port, pages } = config.live;
    if (!fs.existsSync(path.join(cwd, "node_modules")) && !cmd.includes("python")) {
      console.log(`[${slug}] skip live — no node_modules in ${cwd}`);
      continue;
    }

    console.log(`[${slug}] starting ${cmd} on :${port}`);
    const proc = startProcess(cwd, cmd);
    try {
      await waitForPort(port, 90000);
      await new Promise((r) => setTimeout(r, 2000));
      const dir = path.join(OUT, slug);
      fs.mkdirSync(dir, { recursive: true });

      const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        recordVideo: { dir, size: { width: 1280, height: 720 } },
      });
      const page = await context.newPage();

      for (const { path: pagePath, file } of pages) {
        const url = `http://127.0.0.1:${port}${pagePath}`;
        console.log(`  capture ${url} -> ${file}`);
        try {
          await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
          await page.waitForTimeout(1500);
          await page.screenshot({ path: path.join(dir, file), fullPage: false });
        } catch (e) {
          console.warn(`  failed ${url}:`, e.message);
        }
      }

      await context.close();
      const videos = fs.readdirSync(dir).filter((f) => f.endsWith(".webm") && f !== "demo.webm");
      if (videos.length && !fs.existsSync(path.join(dir, "demo-live.webm"))) {
        fs.renameSync(path.join(dir, videos[0]), path.join(dir, "demo-live.webm"));
        console.log(`  saved demo-live.webm`);
      }
    } catch (e) {
      console.warn(`[${slug}] live capture failed:`, e.message);
    } finally {
      proc.kill("SIGTERM");
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  await browser.close();
}

syncSources();
if (LIVE) {
  await captureLive();
} else {
  console.log("Tip: run with --live to capture fresh screenshots via Playwright\n");
}
