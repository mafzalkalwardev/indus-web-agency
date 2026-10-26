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
  title: "INDUS Web Agency | Outbound Telecom Dialers, CRMs & Custom Software",
  description:
    "INDUS Web Agency — Google Voice auto dialers, telecom CRMs for outbound sales & dispatch, AI calling software, plus custom software and websites.",
  keywords: [
    "INDUS Web Agency",
    "Google Voice auto dialer",
    "outbound dialer CRM",
    "AI auto dialer",
    "multi slot dialer",
    "call center CRM",
    "dispatch dialer software",
    "predictive dialer software",
    "telecommunications CRM",
    "auto dialer software",
    "custom software development agency",
    "email marketing automation",
    "bulk email verifier",
    "web scraping tools",
    "lead generation software",
    "Mailforge",
  ],
} as const;
