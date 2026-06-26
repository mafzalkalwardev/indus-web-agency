"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import type { ProductPlan } from "@/lib/products";

interface SubscribeButtonProps {
  productSlug: string;
  plan: ProductPlan;
  isLoggedIn: boolean;
}

export function SubscribeButton({ productSlug, plan, isLoggedIn }: SubscribeButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe() {
    if (!isLoggedIn) {
      router.push(`/signup?plan=${plan.id}&product=${productSlug}`);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, planId: plan.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Subscription failed");
        return;
      }
      setDone(true);
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <button disabled className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white">
        <Check className="h-4 w-4" /> Subscribed!
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60 ${
          plan.highlighted
            ? "bg-cyan-600 hover:bg-cyan-700"
            : "bg-[#0c2340] hover:bg-[#1a3a5c]"
        }`}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Subscribe — ${plan.price}/{plan.period}
      </button>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
