import { FOUNDER, TEAM } from "@/lib/about";

/** Items for the rolling team strip — skills & identity, no pill badges */
export const TEAM_MARQUEE_ITEMS = [
  FOUNDER.name,
  FOUNDER.role,
  FOUNDER.title,
  FOUNDER.location,
  "Remote worldwide",
  ...TEAM[0].focus,
  "CRM systems",
  "Dispatch dialers",
  "Email automation",
  "Web scraping",
  "SaaS products",
  "Licensed software",
  FOUNDER.portfolio.replace("https://", ""),
];
