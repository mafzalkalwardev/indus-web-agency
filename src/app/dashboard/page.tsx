"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Clock, LogOut, Package, AlertCircle } from "lucide-react";
import { getProduct } from "@/lib/products";
import { formatDate, daysRemaining, isExpired } from "@/lib/utils";

interface Subscription {
  id: string;
  productSlug: string;
  planName: string;
  price: number;
  expiresAt: string;
  active: boolean;
}

export default function DashboardPage() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then((r) => r.json()),
      fetch("/api/subscriptions").then((r) => r.json()),
    ]).then(([me, subData]) => {
      if (!me.user) {
        window.location.href = "/login";
        return;
      }
      setUser(me.user);
      setSubs(subData.subscriptions || []);
      setLoading(false);
    });
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  async function handleDownload(productSlug: string) {
    const res = await fetch(`/api/downloads/${productSlug}`);
    const data = await res.json();
    if (res.ok && data.downloadUrl) {
      window.open(data.downloadUrl, "_blank");
    } else {
      alert(data.error || "Download not available");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent" />
      </div>
    );
  }

  const activeSubs = subs.filter((s) => s.active && !isExpired(s.expiresAt));
  const expiredSubs = subs.filter((s) => isExpired(s.expiresAt));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Dashboard</h1>
          <p className="text-sm text-slate-600">Welcome, {user?.name}</p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Package className="h-5 w-5 text-cyan-600" /> Active Subscriptions
        </h2>
        {activeSubs.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-slate-600">No active subscriptions yet.</p>
            <Link href="/products" className="mt-4 inline-block text-cyan-600 font-medium hover:text-cyan-800">
              Browse products →
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {activeSubs.map((sub) => {
              const product = getProduct(sub.productSlug);
              const days = daysRemaining(sub.expiresAt);
              return (
                <div key={sub.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-bold">{product?.name || sub.productSlug}</h3>
                    <p className="text-sm text-slate-600">Plan: {sub.planName} — ${sub.price}/mo</p>
                    <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="h-4 w-4" />
                      Expires {formatDate(sub.expiresAt)} ({days} days left)
                    </p>
                  </div>
                  <button
                    onClick={() => handleDownload(sub.productSlug)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0c2340] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1a3a5c]"
                  >
                    <Download className="h-4 w-4" /> Download
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {expiredSubs.length > 0 && (
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-500">
            <AlertCircle className="h-5 w-5" /> Expired Subscriptions
          </h2>
          <div className="mt-4 space-y-3">
            {expiredSubs.map((sub) => {
              const product = getProduct(sub.productSlug);
              return (
                <div key={sub.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 opacity-70">
                  <div>
                    <h3 className="font-medium">{product?.name || sub.productSlug}</h3>
                    <p className="text-xs text-slate-500">Expired {formatDate(sub.expiresAt)}</p>
                  </div>
                  <Link
                    href={`/products/${sub.productSlug}`}
                    className="text-sm text-cyan-600 hover:text-cyan-800"
                  >
                    Renew →
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
