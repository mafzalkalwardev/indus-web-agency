export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  readMinutes: number;
  publishedAt: string;
  category: "dialers" | "email" | "automation" | "agency";
  sections: { heading: string; body: string }[];
}

export const GUIDES: GuideArticle[] = [
  {
    slug: "choose-auto-dialer-plan",
    title: "How to Choose the Right Auto Dialer Plan",
    description:
      "Compare DOM starter, multi-slot, AI solo, and enterprise AI dialers — team size, workflow, and budget explained.",
    readMinutes: 6,
    publishedAt: "2026-03-01",
    category: "dialers",
    sections: [
      {
        heading: "Start with your team size",
        body: "Solo agents doing basic outbound can start with DOM/BOM Starter at $29/mo. Teams of 2–15 agents placing parallel calls should look at Multi-Slot Agent ($79/mo). High-volume dispatch centers need Enterprise AI Multi-Slot ($199/mo).",
      },
      {
        heading: "Decide if you need AI on calls",
        body: "AI Agent Solo ($99/mo) puts AI voice on every call — great for hands-free outbound. Enterprise AI Multi-Slot adds AI only on the picked call in a multi-line dispatch workflow — better for teams that still want human agents on qualified leads.",
      },
      {
        heading: "Use our calculator",
        body: "Not sure? Use the INDUS Dialer Calculator on our site — answer two questions and get a recommended plan with a link to subscribe.",
      },
    ],
  },
  {
    slug: "email-verification-workflow",
    title: "Bulk Email Verification: A Practical Workflow",
    description:
      "How to verify lists before campaigns, choose between cloud and self-hosted tools, and avoid deliverability pitfalls.",
    readMinutes: 5,
    publishedAt: "2026-03-05",
    category: "email",
    sections: [
      {
        heading: "Why verify before you send",
        body: "Sending to invalid addresses hurts sender reputation and wastes SMTP capacity. Run syntax, MX, and mailbox checks before any bulk campaign.",
      },
      {
        heading: "Cloud vs self-hosted",
        body: "Email Verifier Pro offers a cloud dashboard with analytics — ideal for teams that want zero setup. Bulk Email Verifier is a self-hosted Go engine for operators who want speed and control on their own machine.",
      },
      {
        heading: "Pair with sending tools",
        body: "After verification, use Auto Email Sender or the Mailforge bundle for outreach plus unified inbox management — all available as INDUS subscriptions.",
      },
    ],
  },
  {
    slug: "custom-software-vs-off-the-shelf",
    title: "Custom Software vs Off-the-Shelf: When to Build vs Buy",
    description:
      "How INDUS clients decide between a custom project and licensing an existing automation product.",
    readMinutes: 4,
    publishedAt: "2026-03-10",
    category: "agency",
    sections: [
      {
        heading: "Buy when the workflow matches",
        body: "If you need standard outbound dialing, email verification, or lead scraping — our licensed products are battle-tested and faster to deploy than a custom build.",
      },
      {
        heading: "Build when you're unique",
        body: "Custom CRM integrations, proprietary dispatch logic, branded client portals, or industry-specific compliance usually warrant a studio project.",
      },
      {
        heading: "Hybrid is common",
        body: "Many clients license Mailforge or a dialer today, then hire INDUS to extend integrations or build a custom dashboard around it.",
      },
    ],
  },
  {
    slug: "google-voice-auto-dialer-guide",
    title: "Google Voice Auto Dialer: Setup & Best Practices",
    description:
      "How DOM/BOM automation works with Google Voice, what to expect from parallel slots, and when to upgrade to AI dispatch.",
    readMinutes: 7,
    publishedAt: "2026-03-12",
    category: "dialers",
    sections: [
      {
        heading: "Why Google Voice for outbound",
        body: "Many small teams already use Google Voice for a dedicated business line. INDUS dialers automate the click-to-dial workflow in Chrome — no PBX migration required for the starter tier.",
      },
      {
        heading: "DOM/BOM vs multi-slot",
        body: "DOM/BOM Starter controls one browser tab — ideal for solo reps. Multi-Slot Agent opens up to five parallel lines; the agent only sees the call that connects, which is the standard dispatch pattern for busy sales floors.",
      },
      {
        heading: "When AI makes sense",
        body: "If your reps spend time on voicemails and no-answers, AI Agent Solo or Enterprise AI Multi-Slot can handle AMD, leave messages, or qualify leads before a human picks up.",
      },
    ],
  },
  {
    slug: "mailforge-setup-overview",
    title: "Mailforge: Unified Inbox & Outreach Overview",
    description:
      "How Mailforge bundles sending, inbox sync, and campaign tracking — and how it pairs with email verification.",
    readMinutes: 5,
    publishedAt: "2026-03-14",
    category: "email",
    sections: [
      {
        heading: "What Mailforge covers",
        body: "Mailforge is INDUS's email operations bundle: connect SMTP accounts, send sequences, and manage replies from one dashboard instead of juggling multiple inboxes.",
      },
      {
        heading: "Verify before you send",
        body: "Always run lists through Email Verifier Pro or Bulk Email Verifier first. Clean data improves deliverability and keeps your domains off blocklists.",
      },
      {
        heading: "Scale with automation",
        body: "Pair Mailforge with Auto Email Sender for high-volume outreach, or use our web scraper products to build targeted lists before campaigns.",
      },
    ],
  },
  {
    slug: "web-scraper-lead-generation",
    title: "Web Scraping for B2B Lead Generation",
    description:
      "Ethical scraping workflows, list hygiene, and how INDUS scraper tools fit into outbound sales pipelines.",
    readMinutes: 6,
    publishedAt: "2026-03-16",
    category: "automation",
    sections: [
      {
        heading: "Start with a clear ICP",
        body: "Define industry, geography, and role before scraping. Narrow targets produce smaller but higher-converting lists than broad crawls.",
      },
      {
        heading: "Respect robots and rate limits",
        body: "INDUS scrapers include configurable delays and domain rules. Aggressive crawling hurts your IP reputation and can violate site terms — throttle responsibly.",
      },
      {
        heading: "Close the loop",
        body: "Export to CSV, verify emails, then push into Mailforge or your dialer queue. Scraping is only step one; verification and outreach complete the pipeline.",
      },
    ],
  },
];

export function getGuide(slug: string): GuideArticle | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
