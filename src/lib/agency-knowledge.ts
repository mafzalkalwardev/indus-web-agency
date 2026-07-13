import { AGENCY_SERVICES, PROJECT_TYPES, BUDGET_RANGES, TIMELINE_OPTIONS } from "@/lib/agency-services";
import { COMPANY_STORY, TEAM } from "@/lib/about";
import { PRODUCTS, CATEGORY_LABELS } from "@/lib/products";
import { PORTFOLIO } from "@/lib/portfolio";
import { FAQ_ITEMS } from "@/lib/faq-content";
import { SITE_CONTACT, SITE_SEO } from "@/lib/site-config";

/** Compact knowledge base injected into the AI support agent system prompt */
export function buildAgencyKnowledgeBase(): string {
  const services = AGENCY_SERVICES.map(
    (s) => `- ${s.title}: ${s.tagline}. ${s.description}`
  ).join("\n");

  const products = PRODUCTS.map(
    (p) => `- ${p.name} (${CATEGORY_LABELS[p.category]}): ${p.tagline}. From $${Math.min(...p.plans.map((pl) => pl.price))}/mo`
  ).join("\n");

  const portfolio = PORTFOLIO.slice(0, 4).map((p) => `- ${p.title} (${p.client}): ${p.summary}`).join("\n");

  const team = TEAM.map((m) => `- ${m.name}, ${m.role} (${m.location || "Remote"}): ${m.bio}`).join("\n");

  const founderNote = `Founder: Muhammad Afzal Kalwar — Full-Stack Developer & Python Automation Engineer. Portfolio: https://mafzalkalwardev.github.io | GitHub: https://github.com/mafzalkalwardev`;

  const faq = FAQ_ITEMS.slice(0, 8).map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");

  const projectTypes = PROJECT_TYPES.map((t) => t.label).join(", ");
  const budgets = BUDGET_RANGES.map((b) => b.label).join(", ");
  const timelines = TIMELINE_OPTIONS.map((t) => t.label).join(", ");

  return `
# ${SITE_SEO.name}

${COMPANY_STORY.mission}

Founded: ${COMPANY_STORY.founded} | HQ: ${COMPANY_STORY.headquarters}
Contact email: ${SITE_CONTACT.email}
WhatsApp: ${SITE_CONTACT.whatsapp}
Website: ${SITE_CONTACT.siteUrl}

## What we do (Agency)
${services}

Project types we accept: ${projectTypes}
Typical budgets clients select: ${budgets}
Timeline options: ${timelines}

To start a custom project: ${SITE_CONTACT.siteUrl}/start-project
Portfolio: ${SITE_CONTACT.siteUrl}/work
Services: ${SITE_CONTACT.siteUrl}/services
About & team: ${SITE_CONTACT.siteUrl}/about
Contact form: ${SITE_CONTACT.siteUrl}/contact

## Software products (Subscriptions)
${products}

Browse all: ${SITE_CONTACT.siteUrl}/products
Compare dialers: ${SITE_CONTACT.siteUrl}/compare
Pricing: ${SITE_CONTACT.siteUrl}/pricing
Live demos: ${SITE_CONTACT.siteUrl}/demos

Subscription flow:
1. Create account → 2. Pick product & plan → 3. Admin approves (usually within 24h) → 4. Download from dashboard with license file

## Selected portfolio
${portfolio}

## Team
${founderNote}
${team}

## FAQ excerpts
${faq}

## Response rules for the assistant
- Be concise, professional, and helpful (2-4 short paragraphs max unless listing products).
- Use markdown links with full URLs (e.g. [Compare dialers](${SITE_CONTACT.siteUrl}/compare)) when pointing to site pages.
- For custom builds, encourage /start-project or /contact.
- For product issues, mention dashboard, setup guides on product pages, or email/WhatsApp.
- Do not invent pricing beyond what's listed. Do not promise instant approval.
- If unsure, suggest contacting ${SITE_CONTACT.email} or WhatsApp ${SITE_CONTACT.whatsapp}.
`.trim();
}
