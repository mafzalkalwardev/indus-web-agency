"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Clock, Sparkles } from "lucide-react";
import type { ProductPlan } from "@/lib/products";
import { href } from "@/lib/paths";
import { useSession } from "@/components/auth/SessionProvider";
import { PAID_BILLING_OPTIONS, calcPrice, periodShort, type BillingPeriod } from "@/lib/billing";

interface SubscribeButtonProps {
  productSlug: string;
  plan: ProductPlan;
}

export function SubscribeButton({ productSlug, plan }: SubscribeButtonProps) {
  const router = useRouter();
  const { user, loading: authLoading, refresh } = useSession();
  const [loading, setLoading] = useState(false);
  const [trialLoading, setTrialLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("month");

  const price = calcPrice(plan.price, billingPeriod);
  const periodOpt = PAID_BILLING_OPTIONS.find((b) => b.id === billingPeriod)!;

  async function submitSubscription(period: BillingPeriod) {
    if (authLoading) return;

    if (!user) {
      const returnUrl = encodeURIComponent(
        href(`/products/${productSlug}?plan=${plan.id}&period=${period}`)
      );
      router.push(href(`/login?redirect=${returnUrl}`));
      return;
    }

    setError("");

    try {
      const res = await fetch(href("/api/subscriptions"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productSlug, planId: plan.id, billingPeriod: period }),
      });
      const data = await res.json();

      if (res.status === 401) {
        router.push(href("/login"));
        return;
      }
      if (!res.ok) {
        setError(data.error || "Subscription failed");
        return;
      }

      setDone(true);
      setPending(true);
      await refresh();
      setTimeout(() => router.push(href("/dashboard")), 1500);
    } catch {
      setError("Network error");
    }
  }

  async function handleSubscribe() {
    setLoading(true);
    await submitSubscription(billingPeriod);
    setLoading(false);
  }

  async function handleTrial() {
    setTrialLoading(true);
    await submitSubscription("trial");
    setTrialLoading(false);
  }

  if (done && pending) {
    return (
      <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-center">
        <Clock className="mx-auto h-6 w-6 text-amber-600" />
        <p className="mt-2 text-sm font-semibold text-amber-900">Pending Approval</p>
        <p className="mt-1 text-xs text-amber-700">Admin will review your subscription. Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex rounded-lg border border-slate-200 p-0.5">
        {PAID_BILLING_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setBillingPeriod(opt.id)}
            className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition ${
              billingPeriod === opt.id
                ? "bg-[#0c2340] text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubscribe}
        disabled={loading || trialLoading || authLoading}
        className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60 ${
          plan.highlighted ? "bg-cyan-600 hover:bg-cyan-700" : "bg-[#0c2340] hover:bg-[#1a3a5c]"
        }`}
      >
        {(loading || authLoading) && <Loader2 className="h-4 w-4 animate-spin" />}
        Subscribe — ${price}/{periodShort(billingPeriod)}
      </button>
      <p className="text-center text-xs text-slate-500">
        {periodOpt.durationDays}-day access · Requires admin approval
      </p>

      <button
        onClick={handleTrial}
        disabled={loading || trialLoading || authLoading}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-medium text-cyan-800 hover:bg-cyan-100 disabled:opacity-60"
      >
        {trialLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
        Try free for 30 minutes
      </button>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
