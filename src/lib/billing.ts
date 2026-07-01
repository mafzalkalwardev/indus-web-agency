export type BillingPeriod = "week" | "month" | "year";

export type SubscriptionStatus = "pending" | "approved" | "rejected";

export interface BillingOption {
  id: BillingPeriod;
  label: string;
  durationDays: number;
  priceMultiplier: number;
  badge?: string;
}

export const BILLING_OPTIONS: BillingOption[] = [
  { id: "week", label: "Weekly", durationDays: 7, priceMultiplier: 0.35 },
  { id: "month", label: "Monthly", durationDays: 30, priceMultiplier: 1, badge: "Popular" },
  { id: "year", label: "Yearly", durationDays: 365, priceMultiplier: 10, badge: "Save 17%" },
];

export function getBillingOption(period: BillingPeriod): BillingOption {
  return BILLING_OPTIONS.find((b) => b.id === period) ?? BILLING_OPTIONS[1];
}

export function calcPrice(baseMonthlyPrice: number, period: BillingPeriod): number {
  const opt = getBillingOption(period);
  return Math.round(baseMonthlyPrice * opt.priceMultiplier);
}

export function periodLabel(period: BillingPeriod): string {
  return getBillingOption(period).label;
}
