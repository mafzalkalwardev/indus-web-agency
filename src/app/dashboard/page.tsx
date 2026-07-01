"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Download, Clock, Package, AlertCircle, CheckCircle2, XCircle, Hourglass } from "lucide-react";
import { getProduct } from "@/lib/products";
import { formatDate, daysRemaining, isExpired } from "@/lib/utils";
import { useSession } from "@/components/auth/SessionProvider";
import { href } from "@/lib/paths";
import { periodLabel, type SubscriptionStatus } from "@/lib/billing";

interface Subscription {
  id: string;
  productSlug: string;
  planName: string;
  price: number;
  period: string;
  status: SubscriptionStatus;
  expiresAt: string;
  active: boolean;
}

function StatusBadge({ status }: { status: SubscriptionStatus }) {
  const styles = {
    pending: "bg-amber-100 text-amber-800 border-amber-200",
    approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };
  const icons = {
    pending: Hourglass,
    approved: CheckCircle2,
    rejected: XCircle,
  };
  const Icon = icons[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${styles[status]}`}>
      <Icon className="h-3 w-3" /> {status}
    </span>
  );
}

export default function DashboardPage() {
  const { user, loading: authLoading, logout } = useSession();
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      window.location.href = href("/login");
      return;
    }
    fetch(href("/api/subscriptions"), { credentials: "include", cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setSubs(d.subscriptions || []);
        setLoading(false);
      });
  }, [user, authLoading]);

  async function handleDownload(productSlug: string) {
    const res = await fetch(href(`/api/downloads/${productSlug}`), { credentials: "include" });
    const data = await res.json();
    if (res.ok && data.downloadUrl) {
      window.open(data.downloadUrl, "_blank");
    } else {
      alert(data.error || "Download not available");
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent" />
      </div>
    );
  }

  const activeSubs = subs.filter((s) => s.active && !isExpired(s.expiresAt));
  const pendingSubs = activeSubs.filter((s) => s.status === "pending");
  const approvedSubs = activeSubs.filter((s) => s.status === "approved");
  const rejectedSubs = activeSubs.filter((s) => s.status === "rejected");
  const expiredSubs = subs.filter((s) => isExpired(s.expiresAt));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Dashboard</h1>
          <p className="text-sm text-slate-600">Welcome back, {user?.name}</p>
        </div>
        <Link href={href("/products")} className="inline-flex items-center justify-center rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700">
          Browse Products
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Active", value: approvedSubs.length, color: "text-emerald-600" },
          { label: "Pending Approval", value: pendingSubs.length, color: "text-amber-600" },
          { label: "Total Subscriptions", value: subs.length, color: "text-[#0c2340]" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className={`mt-1 text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {pendingSubs.length > 0 && (
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-amber-700">
            <Hourglass className="h-5 w-5" /> Awaiting Admin Approval
          </h2>
          <div className="mt-4 space-y-3">
            {pendingSubs.map((sub) => {
              const product = getProduct(sub.productSlug);
              return (
                <div key={sub.id} className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{product?.name}</h3>
                        <StatusBadge status="pending" />
                      </div>
                      <p className="text-sm text-slate-600">{sub.planName} — ${sub.price} ({periodLabel(sub.period as "week" | "month" | "year")})</p>
                      <p className="mt-1 text-xs text-amber-700">An admin will review your request. Download unlocks after approval.</p>
                    </div>
                    <button disabled className="cursor-not-allowed rounded-lg bg-slate-200 px-5 py-2.5 text-sm font-medium text-slate-500">
                      <Download className="mr-1 inline h-4 w-4" /> Awaiting Approval
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Package className="h-5 w-5 text-cyan-600" /> My Products
        </h2>
        {approvedSubs.length === 0 && pendingSubs.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <Package className="mx-auto h-10 w-10 text-slate-300" />
            <p className="mt-3 text-slate-600">No products yet. Subscribe to a tool to get started.</p>
            <Link href={href("/demos")} className="mt-2 inline-block text-sm text-cyan-600 hover:underline">View live demos first →</Link>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {approvedSubs.map((sub) => {
              const product = getProduct(sub.productSlug);
              const days = daysRemaining(sub.expiresAt);
              const thumb = product?.screenshots[0];
              return (
                <div key={sub.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                  {thumb && (
                    <div className="h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-slate-100">
                      <Image src={thumb} alt="" width={128} height={80} className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{product?.name}</h3>
                      <StatusBadge status="approved" />
                    </div>
                    <p className="text-sm text-slate-600">{sub.planName} — ${sub.price} ({periodLabel(sub.period as "week" | "month" | "year")})</p>
                    <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="h-4 w-4" /> Expires {formatDate(sub.expiresAt)} · {days} days left
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

      {(rejectedSubs.length > 0 || expiredSubs.length > 0) && (
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-500">
            <AlertCircle className="h-5 w-5" /> Inactive
          </h2>
          <div className="mt-4 space-y-3">
            {[...rejectedSubs, ...expiredSubs].map((sub) => {
              const product = getProduct(sub.productSlug);
              return (
                <div key={sub.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 opacity-80">
                  <div>
                    <h3 className="font-medium">{product?.name}</h3>
                    <p className="text-xs text-slate-500">
                      {sub.status === "rejected" ? "Subscription rejected" : `Expired ${formatDate(sub.expiresAt)}`}
                    </p>
                  </div>
                  <Link href={href(`/products/${sub.productSlug}`)} className="text-sm text-cyan-600 hover:text-cyan-800">
                    Resubscribe →
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
