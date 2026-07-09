/**
 * Server-only product download sources. Never import this from client components.
 * GitHub URLs are kept here so they are not exposed in the public bundle or UI.
 */
import "server-only";

const PRODUCT_DOWNLOAD_SOURCES: Record<string, string> = {
  "email-verifier-pro":
    "https://github.com/mafzalkalwardev/email-verifier-pro/archive/refs/heads/main.zip",
  "bulk-email-verifier":
    "https://github.com/mafzalkalwardev/bulk-email-verifier/archive/refs/heads/main.zip",
  "auto-email-sender":
    "https://github.com/mafzalkalwardev/multi-smtp-email-automation/archive/refs/heads/main.zip",
  "unified-inbox":
    "https://github.com/mafzalkalwardev/mailforge/archive/refs/heads/main.zip",
  mailforge:
    "https://github.com/mafzalkalwardev/mailforge/archive/refs/heads/main.zip",
  "dialer-starter-dom":
    "https://github.com/mafzalkalwardev/python-auto-dialer-pro/archive/refs/heads/main.zip",
  "dialer-multi-slot":
    "https://github.com/mafzalkalwardev/indus-transport-auto-dialer/archive/refs/heads/main.zip",
  "dialer-ai-agent":
    "https://github.com/mafzalkalwardev/google-voice-dispatch-agent/archive/refs/heads/main.zip",
  "dialer-ai-multi-slot":
    "https://github.com/mafzalkalwardev/indus-transport-auto-dialer/archive/refs/heads/main.zip",
  "playwright-scraper-pro":
    "https://github.com/mafzalkalwardev/playwright-website-scraper-pro/archive/refs/heads/main.zip",
  "fmcsa-safer-scraper":
    "https://github.com/mafzalkalwardev/fmcsa-safer-scraper/archive/refs/heads/main.zip",
  "canadian-website-scraper":
    "https://github.com/mafzalkalwardev/Canadian-Website-Scraper/archive/refs/heads/main.zip",
  "fiverr-lead-extractor":
    "https://github.com/mafzalkalwardev/fiverr-lead-extractor-crm/archive/refs/heads/main.zip",
};

export function getProductDownloadSource(slug: string): string | undefined {
  return PRODUCT_DOWNLOAD_SOURCES[slug];
}

export function productDownloadFilename(slug: string): string {
  return `indus-${slug}.zip`;
}
