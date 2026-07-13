export type TeamSize = "solo" | "small" | "team" | "enterprise";
export type UseCase = "dom" | "parallel" | "ai-solo" | "ai-dispatch";

export const TEAM_OPTIONS: { id: TeamSize; label: string; hint: string }[] = [
  { id: "solo", label: "1 agent", hint: "Solo operator" },
  { id: "small", label: "2–5 agents", hint: "Small team" },
  { id: "team", label: "6–15 agents", hint: "Growing dispatch" },
  { id: "enterprise", label: "15+ agents", hint: "High volume" },
];

export const USE_CASE_OPTIONS: { id: UseCase; label: string; hint: string }[] = [
  { id: "dom", label: "Basic outbound / DOM dialer", hint: "Single line, manual workflow" },
  { id: "parallel", label: "Multi-line parallel dialing", hint: "Agent sees only picked call" },
  { id: "ai-solo", label: "AI handles every call", hint: "Hands-free voice agent" },
  { id: "ai-dispatch", label: "Dispatch + AI on picked call", hint: "Enterprise multi-slot" },
];

export interface DialerRecommendation {
  slug: string;
  name: string;
  price: number;
  reason: string;
  highlights: string[];
}

export function recommendDialer(team: TeamSize, useCase: UseCase): DialerRecommendation {
  if (useCase === "dom" || team === "solo") {
    return {
      slug: "dialer-starter-dom",
      name: "DOM/BOM Starter",
      price: 29,
      reason: "Best for a single agent running DOM-based outbound with a simple, affordable stack.",
      highlights: ["Single-line PyAutoGUI dialer", "DOM/BOM automation", "Lowest entry price"],
    };
  }

  if (useCase === "ai-solo") {
    return {
      slug: "dialer-ai-agent",
      name: "AI Agent Solo",
      price: 99,
      reason: "AI voice on every call — ideal when you want hands-free outbound without multi-slot complexity.",
      highlights: ["AI talks on all calls", "Voice automation", "Solo operator focus"],
    };
  }

  if (useCase === "ai-dispatch" || team === "enterprise") {
    return {
      slug: "dialer-ai-multi-slot",
      name: "Enterprise AI Multi-Slot",
      price: 199,
      reason: "Multi-slot dispatch with AI on the picked call — built for high-volume operations.",
      highlights: ["Up to 5 parallel lines", "AI on picked call only", "CRM & admin dashboard"],
    };
  }

  return {
    slug: "dialer-multi-slot",
    name: "Multi-Slot Agent",
    price: 79,
    reason: "Five parallel lines with agents seeing only the picked call — the sweet spot for small dispatch teams.",
    highlights: ["5 parallel dial slots", "Skip unpicked lines", "Team-ready workflow"],
  };
}
