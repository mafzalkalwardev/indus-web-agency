import { FOUNDER, TEAM } from "@/lib/about";

/** Items for the rolling team strip — skills & identity, no pill badges */
export const TEAM_MARQUEE_ITEMS = [
  ...TEAM.flatMap((member) => [member.name, member.role, ...member.focus]),
  FOUNDER.location,
  "Remote worldwide",
  "CRM systems",
  "Dispatch dialers",
  "Email automation",
  "Web scraping",
  "SaaS products",
  "Licensed software",
];
