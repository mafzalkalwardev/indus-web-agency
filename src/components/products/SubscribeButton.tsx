"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import type { ProductPlan } from "@/lib/products";
import { href } from "@/lib/paths";

interface SubscribeButtonProps {
  productSlug: string;
  plan: ProductPlan;
}

export function SubscribeButton({ productSlug, plan }: SubscribeButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch(href("/api/auth/me"), { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setIsLoggedIn(!!d.user))
      .catch(() => setIsLoggedIn(false))
      .finally(() => setAuthChecking(false));
  }, []);

  async function handleSubscribe() {
    if (authChecking) return;

    if (!isLoggedIn) {
      const returnUrl = encodeURIComponent(
        href(`/products/${productSlug}?plan=${plan.id}`)
      );
      router.push(href(`/login?redirect=${returnUrl}`));
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(href("/api/subscriptions"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productSlug, planId: plan.id }),
      });
      const data = await res.json();

      if (res.status === 401) {
        setIsLoggedIn(false);
        const returnUrl = encodeURIComponent(
          href(`/products/${productSlug}?plan=${plan.id}`)
        );
        router.push(href(`/login?redirect=${returnUrl}`));
        return;
      }

      if (!res.ok) {
        setError(data.error || "Subscription failed");
        return;
      }

      setDone(true);
      router.push(href("/dashboard"));
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
        disabled={loading || authChecking}
        className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60 ${
          plan.highlighted
            ? "bg-cyan-600 hover:bg-cyan-700"
            : "bg-[#0c2340] hover:bg-[#1a3a5c]"
        }`}
      >
        {(loading || authChecking) && <Loader2 className="h-4 w-4 animate-spin" />}
        {authChecking
          ? "Checking account..."
          : `Subscribe — $${plan.price}/${plan.period}`}
      </button>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
