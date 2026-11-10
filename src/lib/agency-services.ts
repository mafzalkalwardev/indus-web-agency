import {
  Globe,
  Smartphone,
  Code2,
  Bot,
  Palette,
  LineChart,
  AppWindow,
  MessageSquare,
  Brain,
  Server,
  Workflow,
  PhoneCall,
  ListChecks,
  Building2,
  Mail,
  Database,
  Truck,
  Search,
  type LucideIcon,
} from "lucide-react";

export interface AgencyService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: LucideIcon;
  technologies: string[];
  /** Ids from LIVE_PRODUCTS. */
  relatedProductIds?: string[];
}

export const AGENCY_SERVICES: AgencyService[] = [
  {
    id: "custom-software",
    title: "Custom Software Development",
    tagline: "Built for your workflow",
    description:
      "Desktop apps, internal tools, automation pipelines, and SaaS products tailored to how your team actually operates — not generic templates.",
    deliverables: ["Requirements & architecture", "MVP to production", "License & deployment", "Ongoing support"],
    icon: Code2,
    technologies: ["Python", "Node.js", "React", "Electron", "Playwright"],
  },
  {
    id: "websites",
    title: "Websites & Web Apps",
    tagline: "Premium, fast, conversion-focused",
    description:
      "Marketing sites, landing pages, client portals, and full-stack web applications with modern UX, SEO, and performance baked in.",
    deliverables: ["UI/UX design", "Next.js development", "CMS integration", "Analytics & SEO"],
    icon: Globe,
    technologies: ["Next.js", "React", "Tailwind", "Vercel", "TypeScript"],
  },
  {
    id: "automation",
    title: "Business Automation",
    tagline: "Dialers, email, scraping",
    description:
      "Outbound dialers, email verification, lead extraction, and dispatch automation — the same production systems we ship as subscription products.",
    deliverables: ["Workflow audit", "Custom automation", "Integrations", "Training & docs"],
    icon: Bot,
    technologies: ["AI voice", "SMTP", "Playwright", "APIs", "CRM hooks"],
    relatedProductIds: ["mailforge", "routelix", "carriersource"],
  },
  {
    id: "mobile",
    title: "Mobile & Cross-Platform",
    tagline: "Reach users everywhere",
    description:
      "Companion apps, field tools, and responsive experiences that sync with your backend and licensing systems.",
    deliverables: ["React Native / PWA", "Offline support", "Push notifications", "App store prep"],
    icon: Smartphone,
    technologies: ["React Native", "PWA", "REST APIs", "Firebase"],
  },
  {
    id: "design",
    title: "Product Design & Branding",
    tagline: "Polished from first pixel",
    description:
      "Visual identity, design systems, and interaction design with motion — inspired by premium agency craft (Emil Kowalski–level polish).",
    deliverables: ["Brand guidelines", "Figma systems", "Motion prototypes", "Dev handoff"],
    icon: Palette,
    technologies: ["Figma", "Motion", "GSAP", "Design tokens"],
  },
  {
    id: "consulting",
    title: "Technical Consulting",
    tagline: "Strategy before code",
    description:
      "Architecture reviews, stack selection, scaling plans, and automation ROI analysis for teams ready to invest in software.",
    deliverables: ["Discovery workshop", "Technical roadmap", "Cost estimates", "Vendor evaluation"],
    icon: LineChart,
    technologies: ["Architecture", "DevOps", "Security", "Licensing"],
  },
  {
    id: "custom-web",
    title: "Custom web development",
    tagline: "Sites and web apps, built to spec",
    description:
      "Custom web development for websites and web applications shaped around your workflow, from the layout through launch.",
    deliverables: ["Information architecture", "Interface build", "Launch"],
    icon: AppWindow,
    technologies: ["Next.js", "React", "TypeScript"],
  },
  {
    id: "ai-chatbots",
    title: "AI chatbots for support",
    tagline: "Multilingual, on the channels you already use",
    description:
      "Support chatbots that reply in more than one language on Slack, Telegram, and WhatsApp.",
    deliverables: ["Multilingual replies", "Slack", "Telegram", "WhatsApp"],
    icon: MessageSquare,
    technologies: ["Slack", "Telegram", "WhatsApp"],
  },
  {
    id: "rag-assistants",
    title: "RAG knowledge assistants",
    tagline: "Documents, agents, and local models",
    description:
      "RAG knowledge assistants over your own material, plus multi-agent systems and setups that run on a local LLM.",
    deliverables: ["Document retrieval", "Multi-agent workflows", "Local LLM option"],
    icon: Brain,
    technologies: ["RAG", "Multi-agent", "Local LLM"],
  },
  {
    id: "ai-ops-hubs",
    title: "Self-hosted AI ops hubs",
    tagline: "The hub stays on your machines",
    description:
      "Self-hosted AI ops hubs for the workflows your team runs, on infrastructure you control.",
    deliverables: ["Hub you host", "Ops workflows", "Your own infrastructure"],
    icon: Server,
    technologies: ["Self-hosted"],
    relatedProductIds: ["mailforge", "routelix"],
  },
  {
    id: "workflow-automation",
    title: "Workflow automation",
    tagline: "n8n, Make, and Zapier, with a person in the loop",
    description:
      "Workflow automation on n8n, Make, and Zapier, with a human approval gate before a sensitive step goes out.",
    deliverables: ["n8n", "Make", "Zapier", "Human approval gates"],
    icon: Workflow,
    technologies: ["n8n", "Make", "Zapier"],
  },
  {
    id: "ai-calling",
    title: "AI calling and auto dialers",
    tagline: "Outbound calls, with or without an agent on the line",
    description:
      "AI calling and auto dialers for outbound campaigns, including voicemail detection and call recording.",
    deliverables: ["Auto dialer", "AI calling", "Voicemail detection", "Call recording"],
    icon: PhoneCall,
    technologies: ["Google Voice", "Local speech", "Groq"],
    relatedProductIds: ["routelix"],
  },
  {
    id: "crm-development",
    title: "CRM development",
    tagline: "Including carrier and dispatch desks",
    description:
      "CRM development for the way a team sells or dispatches, including carrier and dispatch CRMs.",
    deliverables: ["Pipeline and records", "Carrier CRM", "Dispatch CRM"],
    icon: Building2,
    technologies: ["CRM"],
    relatedProductIds: ["routelix"],
  },
  {
    id: "email-infrastructure",
    title: "Email verification and cold-email infrastructure",
    tagline: "Check the list, send, then read the replies",
    description:
      "Email verification and cold-email infrastructure: check a CSV over SMTP, send from your own accounts, and read every reply in one inbox.",
    deliverables: ["SMTP verification", "Campaign sending", "Unified inbox"],
    icon: Mail,
    technologies: ["SMTP", "IMAP"],
    relatedProductIds: ["mailforge"],
  },
  {
    id: "phone-verification",
    title: "Phone number verification",
    tagline: "Clean a list before you text or call",
    description:
      "Bulk phone number verification with libphonenumber format checks, US/UK/DE regulator block assignment, CSV cleanup exports, and a Live HLR slot.",
    deliverables: ["Format checks", "Regulator block assignment", "CSV exports", "Live HLR slot"],
    icon: ListChecks,
    technologies: ["libphonenumber", "HLR"],
    relatedProductIds: ["bulk-phone-number-verifier"],
  },
  {
    id: "data-collection",
    title: "Web data collection and lead generation",
    tagline: "What is already on the page",
    description:
      "Web data collection and lead generation from information that is already visible on the page, saved for research and outreach.",
    deliverables: ["Visible-page collection", "Local storage", "CSV or Excel export"],
    icon: Database,
    technologies: ["Chrome extension", "CSV", "Excel"],
    relatedProductIds: ["carriersource"],
  },
  {
    id: "freight-dispatch",
    title: "Freight and dispatch software",
    tagline: "Shared boards for US dispatchers",
    description:
      "Freight and dispatch software, including a Windows desktop client that gives US freight dispatchers shared load-board access with one sign-in.",
    deliverables: ["Dispatch workflows", "Shared load-board access", "Windows desktop client"],
    icon: Truck,
    technologies: ["Windows", "Load board"],
    relatedProductIds: ["laneora"],
  },
  {
    id: "seo-aeo-geo",
    title: "SEO, AEO, and GEO",
    tagline: "Search, answer engines, and place",
    description:
      "SEO, AEO, and GEO for the pages we ship: structure, metadata, and copy for classic search, answer engines, and geographic queries.",
    deliverables: ["Search structure", "Answer-engine copy", "Geographic pages"],
    icon: Search,
    technologies: ["SEO", "AEO", "GEO"],
  },
];

export const SERVICE_FAQS = [
  {
    q: "Do you build custom websites?",
    a: "Yes. Custom web development covers sites and web apps built around a workflow, and the studio also ships marketing sites, landing pages, and client portals.",
  },
  {
    q: "Where can a support chatbot run?",
    a: "On Slack, Telegram, and WhatsApp, with replies in more than one language.",
  },
  {
    q: "Which services line up with a product you already publish?",
    a: "AI calling and carrier CRM work lines up with Routelix. Email verification and cold email lines up with MailForge. Phone number verification lines up with Bulk Phone Number Verifier. Carrier-card collection lines up with CarrierSource Free Data Collector. Freight dispatch software lines up with Laneora. MailForge and Routelix are also the self-hosted products behind the ops-hub work.",
  },
  {
    q: "What do SEO, AEO, and GEO mean here?",
    a: "SEO is classic search visibility, AEO is visibility in answer engines, and GEO is geographic relevance. The work is page structure, metadata, and copy. This page does not quote rankings or traffic.",
  },
] as const;

export const PROJECT_TYPES = [
  { value: "custom-software", label: "Custom Software" },
  { value: "website", label: "Website / Landing Page" },
  { value: "web-app", label: "Web Application" },
  { value: "automation", label: "Automation / Integration" },
  { value: "mobile", label: "Mobile App" },
  { value: "redesign", label: "Redesign / Rebuild" },
  { value: "other", label: "Other" },
] as const;

export const BUDGET_RANGES = [
  { value: "under-2k", label: "Under $2,000" },
  { value: "2k-5k", label: "$2,000 – $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-50k", label: "$15,000 – $50,000" },
  { value: "50k-plus", label: "$50,000+" },
  { value: "discuss", label: "Let's discuss" },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP (< 4 weeks)" },
  { value: "1-2-months", label: "1–2 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "flexible", label: "Flexible" },
] as const;

export const TECH_STACK_SUGGESTIONS = [
  "Framer Motion / Motion.dev — React page & micro-interactions",
  "GSAP + ScrollTrigger — cinematic scroll storytelling",
  "React Three Fiber + drei — lightweight 3D heroes & product visuals",
  "Lenis — buttery smooth scroll (pairs with GSAP)",
  "shadcn/ui + Radix — accessible, premium component primitives",
  "Tailwind CSS v4 — design tokens & rapid iteration",
  "Aceternity UI / Magic UI — high-impact marketing sections",
  "React Hook Form + Zod — bulletproof inquiry & checkout forms",
  "Sanity / Contentful — client-editable portfolio & blog",
  "Cal.com — embedded discovery calls for agency leads",
] as const;
