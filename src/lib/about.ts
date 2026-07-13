export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  focus: string[];
  location?: string;
  github?: string;
  portfolio?: string;
  avatar?: string;
  featured?: boolean;
}

export const FOUNDER = {
  name: "Muhammad Afzal Kalwar",
  shortName: "Muhammad Afzal",
  role: "Founder & Principal Engineer",
  title: "Full-Stack Developer & Python Automation Engineer",
  location: "Islamabad, Pakistan",
  github: "https://github.com/mafzalkalwardev",
  portfolio: "https://mafzalkalwardev.github.io",
  avatar: "https://avatars.githubusercontent.com/u/234403541?v=4",
  tagline:
    "Building CRM, scraping, dispatch, sales, email, and AI workflow systems for real businesses.",
} as const;

export const COMPANY_STORY = {
  founded: "2020",
  headquarters: "Islamabad, Pakistan · Remote worldwide",
  tagline: "A founder-led software studio — custom builds and licensed products under one roof.",
  mission:
    "INDUS Web Agency helps operators and growing businesses move faster with custom software, considered websites, and production-grade automation — built by Muhammad Afzal Kalwar and the same engineering stack behind our subscription product shelf.",
  values: [
    {
      title: "Ship, don't slide",
      description: "We scope in weeks, not quarters. Every engagement ends with something deployed and documented.",
    },
    {
      title: "Engineering over decoration",
      description: "Polish matters, but reliability, licensing, and maintainability come first.",
    },
    {
      title: "Direct access",
      description: "No account-manager layers. You work directly with the engineer who architects and builds your product.",
    },
    {
      title: "Dual model",
      description: "Need bespoke work? We build it. Need proven tools? Subscribe to our product shelf.",
    },
  ],
  stats: [
    { value: "50+", label: "Projects delivered" },
    { value: "13", label: "Licensed products" },
    { value: "80+", label: "Open source repositories" },
    { value: "24h", label: "Typical inquiry response" },
  ],
} as const;

export const STUDIO_CAPABILITIES = [
  {
    id: "web",
    title: "Web applications",
    description:
      "React frontends, Node.js APIs, dashboards, and SaaS products with clean architecture — including this marketplace.",
  },
  {
    id: "desktop",
    title: "Python & desktop software",
    description:
      "PyQt6 Windows applications, FastAPI services, scripts, and internal business tools for operators.",
  },
  {
    id: "automation",
    title: "Automation & scraping",
    description:
      "Playwright and Selenium pipelines for data extraction, monitoring, dispatch dialers, and workflow automation.",
  },
  {
    id: "ai",
    title: "AI integration",
    description:
      "Whisper transcription, LLM-powered features, call analytics, and intelligent workflow prototypes.",
  },
] as const;

export const TEAM: TeamMember[] = [
  {
    id: "founder",
    name: FOUNDER.name,
    role: FOUNDER.role,
    bio: `${FOUNDER.title} and founder of INDUS Web Agency. ${FOUNDER.tagline} From auto dialers and email platforms to web scrapers and CRM systems — every product on this site was designed, built, and shipped in production.`,
    focus: ["Next.js & React", "Python & PyQt6", "Playwright automation", "AI & LLM integration", "CRM & dispatch"],
    location: FOUNDER.location,
    github: FOUNDER.github,
    portfolio: FOUNDER.portfolio,
    avatar: FOUNDER.avatar,
    featured: true,
  },
];

export const CONTACT_TOPICS = [
  { value: "general", label: "General inquiry" },
  { value: "project", label: "Custom project / quote" },
  { value: "support", label: "Product support" },
  { value: "billing", label: "Billing & subscriptions" },
  { value: "partnership", label: "Partnership" },
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number]["value"];
