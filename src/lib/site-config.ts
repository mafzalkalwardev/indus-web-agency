/** Public site contact & support configuration */

import { ALL_TELECOM_KEYWORDS, PRIMARY_FOCUS_KEYWORDS } from "@/lib/telecom-keywords";

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
  title: "INDUS Web Agency | AI Dialers with CRM, Custom CRMs & Islamabad Web Agency",
  description:
    "Best AI agent custom auto dialers with CRMs, custom CRM development, and Google Voice cold-calling dialers—plus one of the strongest web & software agencies in Islamabad, serving clients worldwide.",
  keywords: [
    "INDUS Web Agency",
    ...PRIMARY_FOCUS_KEYWORDS,
    ...ALL_TELECOM_KEYWORDS.slice(0, 80),
    "custom software development agency",
    "Mailforge",
    "email marketing automation",
    "web scraping tools",
  ],
} as const;
