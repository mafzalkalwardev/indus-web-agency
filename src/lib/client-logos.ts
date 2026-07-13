/** Client trust strip — swap `image` when you have real logo assets */

export interface ClientLogo {
  id: string;
  name: string;
  industry: string;
  initials: string;
  /** Optional path under /public, e.g. /images/clients/acme.png */
  image?: string;
}

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: "dispatch", name: "Dispatch Operations", industry: "Logistics & outbound", initials: "DO" },
  { id: "apex", name: "Apex Sales Group", industry: "B2B sales team", initials: "AS" },
  { id: "nova", name: "Nova Marketing", industry: "Email agency", initials: "NM" },
  { id: "freight", name: "Freight Connect", industry: "Call center", initials: "FC" },
  { id: "leadlab", name: "LeadLab Studio", industry: "Lead generation", initials: "LL" },
  { id: "saas", name: "SaaS Operator", industry: "Automation startup", initials: "SO" },
];
