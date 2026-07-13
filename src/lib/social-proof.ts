export const TRUST_STATS = [
  { value: "50+", label: "Projects shipped" },
  { value: "13", label: "Licensed products" },
  { value: "24h", label: "Typical response" },
  { value: "4", label: "Dialer tiers" },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "INDUS built our multi-slot dialer and CRM hooks in weeks — the same engineering quality behind their subscription products.",
    name: "Dispatch operations lead",
    role: "Outbound sales team",
    type: "studio" as const,
  },
  {
    quote:
      "We subscribed to Mailforge and had verify + send + inbox running the same day after approval. Setup guides were clear.",
    name: "Marketing agency owner",
    role: "Email operations",
    type: "products" as const,
  },
  {
    quote:
      "The AI multi-slot dialer cut manual dialing time dramatically. Licensing and downloads through the dashboard just work.",
    name: "Call center manager",
    role: "Auto dialer subscriber",
    type: "products" as const,
  },
] as const;

export const CLIENT_SEGMENTS = [
  "Dispatch & logistics",
  "Sales teams",
  "Marketing agencies",
  "Freelance operators",
  "SaaS founders",
] as const;
