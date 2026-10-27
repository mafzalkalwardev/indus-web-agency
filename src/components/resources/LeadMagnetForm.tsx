"use client";

import { useState } from "react";
import { Download, Loader2, CheckCircle2 } from "lucide-react";
import { href } from "@/lib/paths";

export type LeadResourceId = "dialer-comparison-guide" | "dialer-crm-stack-checklist";

const RESOURCE_COPY: Record<
  LeadResourceId,
  { title: string; subtitle: string; success: string; cta: string; nextHref: string; nextLabel: string }
> = {
  "dialer-comparison-guide": {
    title: "Free dialer comparison guide",
    subtitle: "PDF-style breakdown emailed to you",
    success: "We sent the dialer comparison guide and a link to our plan calculator.",
    cta: "Send me the guide",
    nextHref: "/tools/dialer-calculator",
    nextLabel: "Try the dialer calculator now →",
  },
  "dialer-crm-stack-checklist": {
    title: "Dialer + CRM stack checklist",
    subtitle: "Buy vs build, AI agent fit, and CRM fields — emailed free",
    success: "Checklist is on the way. Meanwhile, skim the build process and comparisons.",
    cta: "Send me the checklist",
    nextHref: "/process/custom-dialer-crm",
    nextLabel: "See how we build dialer + CRM →",
  },
};

export function LeadMagnetForm({
  resource = "dialer-comparison-guide",
  compact = false,
}: {
  resource?: LeadResourceId;
  compact?: boolean;
}) {
  const copy = RESOURCE_COPY[resource];
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(href("/api/leads"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, resource }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div
        className={`rounded-2xl border border-emerald-200 bg-emerald-50 text-center ${compact ? "p-5" : "p-8"}`}
      >
        <CheckCircle2 className={`mx-auto text-emerald-600 ${compact ? "h-8 w-8" : "h-10 w-10"}`} />
        <h3 className={`mt-3 font-bold text-[#0c2340] ${compact ? "text-lg" : "text-xl"}`}>Check your inbox</h3>
        <p className="mt-2 text-sm text-muted">{copy.success}</p>
        <a href={href(copy.nextHref)} className="mt-4 inline-block text-sm font-semibold text-cyan-600 hover:underline">
          {copy.nextLabel}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl border border-line bg-white shadow-sm ${compact ? "p-5" : "p-8"}`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
          <Download className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-bold text-[#0c2340]">{copy.title}</h3>
          <p className="text-sm text-muted">{copy.subtitle}</p>
        </div>
      </div>
      <div className={`mt-5 space-y-3 ${compact ? "" : "space-y-4"}`}>
        <div>
          <label className="text-sm font-medium text-[#0c2340]">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1.5 w-full rounded-lg border border-line px-4 py-2.5 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-[#0c2340]">Work email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1.5 w-full rounded-lg border border-line px-4 py-2.5 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            placeholder="you@company.com"
          />
        </div>
      </div>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {copy.cta}
      </button>
      <p className="mt-3 text-center text-xs text-muted">No spam. Unsubscribe anytime via reply.</p>
    </form>
  );
}
