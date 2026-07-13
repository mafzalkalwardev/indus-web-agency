/** Public site contact & support configuration */

export const CANONICAL_SITE_URL = "https://www.induswebagency.com";

export const SITE_CONTACT = {
  email: "induswebagency@gmail.com",
  whatsapp: "+923079670503",
  whatsappUrl: "https://wa.me/923079670503",
  adminNotificationEmail: process.env.ADMIN_NOTIFICATION_EMAIL || "induswebagency@gmail.com",
  siteUrl: CANONICAL_SITE_URL,
} as const;

export const SITE_SEO = {
  name: "INDUS Web Agency",
  legalName: "INDUS Web Agency",
  url: SITE_CONTACT.siteUrl,
  title: "INDUS Web Agency | Custom Software, Web Design & Automation Products",
  description:
    "INDUS Web Agency — custom software development, premium websites, and subscription-ready automation tools: AI dialers, email marketing, and web scraping.",
  keywords: [
    "INDUS Web Agency",
    "web design agency",
    "business automation software",
    "custom software development agency",
    "AI auto dialer",
    "auto dialer software",
    "email marketing automation",
    "bulk email verifier",
    "web scraping tools",
    "lead generation software",
    "dispatch automation software",
    "Google Voice auto dialer",
    "Mailforge",
    "software subscription platform",
  ],
} as const;
