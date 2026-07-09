/** Public site contact & support configuration */

export const SITE_CONTACT = {
  email: "induswebagency@gmail.com",
  whatsapp: "+923079670503",
  whatsappUrl: "https://wa.me/923079670503",
  adminNotificationEmail: process.env.ADMIN_NOTIFICATION_EMAIL || "induswebagency@gmail.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://indus-web-agency.vercel.app",
} as const;
