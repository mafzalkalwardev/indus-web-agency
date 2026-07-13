import {
  Globe,
  Smartphone,
  Code2,
  Bot,
  Palette,
  LineChart,
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
];

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
