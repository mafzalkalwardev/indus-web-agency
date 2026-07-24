export type BillingPeriod = "trial" | "week" | "halfmonth" | "month" | "year";

export type SubscriptionStatus = "pending" | "approved" | "rejected" | "expired";

export interface BillingOption {
  id: BillingPeriod;
  label: string;
  durationDays: number;
  priceMultiplier: number;
  badge?: string;
}

export const BILLING_OPTIONS: BillingOption[] = [
  { id: "trial", label: "Free Trial", durationDays: 30 / (24 * 60), priceMultiplier: 0, badge: "30 min" },
  { id: "week", label: "7 Days", durationDays: 7, priceMultiplier: 0.35 },
  { id: "halfmonth", label: "15 Days", durationDays: 15, priceMultiplier: 0.55 },
  { id: "month", label: "30 Days", durationDays: 30, priceMultiplier: 1, badge: "Popular" },
  { id: "year", label: "Yearly", durationDays: 365, priceMultiplier: 10, badge: "Save 17%" },
];

/** Periods excluded from the paid billing-period selector (rendered as a separate CTA instead). */
export const PAID_BILLING_OPTIONS = BILLING_OPTIONS.filter((o) => o.id !== "trial");

export function getBillingOption(period: BillingPeriod): BillingOption {
  return BILLING_OPTIONS.find((b) => b.id === period) ?? BILLING_OPTIONS[2];
}

export function calcPrice(baseMonthlyPrice: number, period: BillingPeriod): number {
  const opt = getBillingOption(period);
  return Math.round(baseMonthlyPrice * opt.priceMultiplier);
}

export function periodLabel(period: BillingPeriod): string {
  return getBillingOption(period).label;
}

export function periodShort(period: BillingPeriod): string {
  const map: Record<BillingPeriod, string> = {
    trial: "30 min",
    week: "7d",
    halfmonth: "15d",
    month: "30d",
    year: "yr",
  };
  return map[period] ?? "30d";
}

/** Human-readable access window, correctly handling the sub-day trial duration. */
export function accessDurationLabel(period: BillingPeriod): string {
  if (period === "trial") return "30-minute";
  return `${getBillingOption(period).durationDays}-day`;
}
