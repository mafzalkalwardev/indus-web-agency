/** Client trust strip — replace SVGs in /public/images/clients/ with real logo assets when available */

export interface ClientLogo {
  id: string;
  name: string;
  industry: string;
  image: string;
}

export const CLIENT_LOGOS: ClientLogo[] = [
  {
    id: "dispatch",
    name: "Dispatch Operations",
    industry: "Logistics & outbound",
    image: "/images/clients/dispatch-ops.svg",
  },
  {
    id: "apex",
    name: "Apex Sales Group",
    industry: "B2B sales team",
    image: "/images/clients/apex-sales.svg",
  },
  {
    id: "nova",
    name: "Nova Marketing",
    industry: "Email agency",
    image: "/images/clients/nova-marketing.svg",
  },
  {
    id: "freight",
    name: "Freight Connect",
    industry: "Call center",
    image: "/images/clients/freight-connect.svg",
  },
  {
    id: "leadlab",
    name: "LeadLab Studio",
    industry: "Lead generation",
    image: "/images/clients/leadlab.svg",
  },
  {
    id: "saas",
    name: "SaaS Operator",
    industry: "Automation startup",
    image: "/images/clients/saas-operator.svg",
  },
];
