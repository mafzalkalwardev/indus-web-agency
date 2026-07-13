"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import {
  TEAM_OPTIONS,
  USE_CASE_OPTIONS,
  recommendDialer,
  type TeamSize,
  type UseCase,
} from "@/lib/dialer-calculator";
import { href } from "@/lib/paths";

export function DialerCalculator() {
  const [team, setTeam] = useState<TeamSize>("small");
  const [useCase, setUseCase] = useState<UseCase>("parallel");
  const rec = recommendDialer(team, useCase);

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-8">
        <div>
          <p className="text-sm font-semibold text-[#0c2340]">Team size</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {TEAM_OPTIONS.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setTeam(o.id)}
                className={`rounded-xl border p-4 text-left transition ${
                  team === o.id
                    ? "border-cyan-500 bg-cyan-50 ring-2 ring-cyan-500/30"
                    : "border-line bg-white hover:border-slate-300"
                }`}
              >
                <p className="font-semibold text-[#0c2340]">{o.label}</p>
                <p className="mt-0.5 text-xs text-muted">{o.hint}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-[#0c2340]">Primary use case</p>
          <div className="mt-3 grid gap-2">
            {USE_CASE_OPTIONS.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setUseCase(o.id)}
                className={`rounded-xl border p-4 text-left transition ${
                  useCase === o.id
                    ? "border-cyan-500 bg-cyan-50 ring-2 ring-cyan-500/30"
                    : "border-line bg-white hover:border-slate-300"
                }`}
              >
                <p className="font-semibold text-[#0c2340]">{o.label}</p>
                <p className="mt-0.5 text-xs text-muted">{o.hint}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#0c2340]/15 bg-[#0c2340] p-8 text-white">
        <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cyan-400">
          Recommended plan
        </p>
        <h2 className="mt-3 text-3xl font-bold">{rec.name}</h2>
        <p className="mt-2 text-2xl font-bold text-cyan-300">
          ${rec.price}
          <span className="text-base font-normal text-slate-400">/mo starting</span>
        </p>
        <p className="mt-4 text-sm leading-relaxed text-slate-300">{rec.reason}</p>
        <ul className="mt-6 space-y-2">
          {rec.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-slate-200">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={href(`/products/${rec.slug}`)}
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500"
          >
            View product <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={href("/compare")}
            className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-2.5 text-sm font-medium transition hover:bg-white/10"
          >
            Compare all plans
          </Link>
        </div>
      </div>
    </div>
  );
}
