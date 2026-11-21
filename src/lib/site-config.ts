/** Public site contact & support configuration */

import { ALL_TELECOM_KEYWORDS, PRIMARY_FOCUS_KEYWORDS } from "@/lib/telecom-keywords";

export const CANONICAL_SITE_URL = "https://www.induswebagency.com";

export const SITE_CONTACT = {
  email: "info@mail.induswebagency.com",
  whatsapp: "+923079670503",
  whatsappUrl: "https://wa.me/923079670503",
  adminNotificationEmail: process.env.ADMIN_NOTIFICATION_EMAIL || "induswebagency@gmail.com",
  siteUrl: CANONICAL_SITE_URL,
} as const;

/** Public profiles. Each URL was checked and none returned 404. */
export const SITE_PROFILES = {
  linkedin: "https://www.linkedin.com/in/mafzalkalwardev/",
  upwork: "https://www.upwork.com/freelancers/mafzalkalwardev",
  freelancer: "https://www.freelancer.com/u/mafzalkalwardev",
  githubOrg: "https://github.com/induswebagency",
  github: "https://github.com/mafzalkalwardev",
  devto: "https://dev.to/mafzalkalwardev",
  hashnode: "https://mafzalkalwardev.hashnode.dev",
  linktree: "https://linktr.ee/mafzalkalwardev",
  linkedinCompany: "https://www.linkedin.com/company/induswebagency",
} as const;

/** Founder Person sameAs — personal profiles only. */
export const FOUNDER_SAME_AS = [
  SITE_PROFILES.linkedin,
  SITE_PROFILES.upwork,
  SITE_PROFILES.freelancer,
  SITE_PROFILES.github,
  SITE_PROFILES.devto,
  SITE_PROFILES.hashnode,
  SITE_PROFILES.linktree,
] as const;

export const SITE_ADDRESS = {
  streetAddress: "Flat G209, Fortune Residency, E-11/4",
  addressLocality: "Islamabad",
  postalCode: "44000",
  addressCountry: "PK",
} as const;

/** Short Organization knowsAbout list. Do not dump SITE_SEO.keywords here. */
export const SITE_KNOWS_ABOUT = [
  "Rust and Python workflow automation",
  "AI calling agents and dialers",
  "Web scraping and data pipelines",
  "Web applications, CRMs, and dashboards",
] as const;

export const SITE_SEO = {
  name: "INDUS Web Agency",
  legalName: "INDUS Web Agency",
  url: SITE_CONTACT.siteUrl,
  title: "INDUS Web Agency | AI Dialers with CRM, Custom CRMs & Islamabad Web Agency",
  description:
    "AI agent custom auto dialers with CRMs, custom CRM development, and Google Voice cold-calling dialers—plus a web & software agency in Islamabad, serving clients worldwide.",
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
