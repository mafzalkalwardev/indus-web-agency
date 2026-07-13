import Link from "next/link";
import type { Metadata } from "next";
import { DIALER_COMPARISON } from "@/lib/products";
import { href } from "@/lib/paths";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare AI Auto Dialer Software Plans",
  description:
    "Compare INDUS Web Agency auto dialer software plans, including DOM automation, Google Voice multi-slot dialing, AI agent calling, AMD, CRM, and admin dashboards.",
  alternates: {
    canonical: "/compare",
  },
};

const columns = [
  { key: "dom", name: "DOM/BOM Starter", slug: "dialer-starter-dom", price: "$29/mo" },
  { key: "multiSlot", name: "Multi-Slot Agent", slug: "dialer-multi-slot", price: "$79/mo" },
  { key: "aiSolo", name: "AI Agent Solo", slug: "dialer-ai-agent", price: "$99/mo" },
  { key: "aiMulti", name: "Enterprise AI Multi-Slot", slug: "dialer-ai-multi-slot", price: "$199/mo" },
] as const;

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="mx-auto h-5 w-5 text-accent" />;
  if (value === false) return <X className="mx-auto h-5 w-5 text-line-strong" />;
  return <span className="text-sm font-medium text-ink">{value}</span>;
}

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-accent" />
        <p className="eyebrow text-accent">Dialer comparison</p>
      </div>
      <h1 className="mt-6 font-bold text-4xl font-medium tracking-tight sm:text-5xl">Compare auto dialer plans</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
        Compare Google Voice auto dialer software from basic DOM automation to enterprise
        multi-slot AI dialing with voicemail detection, CRM tools, and admin dashboards.{" "}
        <Link href={href("/resources/dialer-comparison")} className="font-medium text-cyan-600 hover:underline">
          Print or save as PDF →
        </Link>
      </p>

      <div className="mt-12 overflow-x-auto rounded-2xl border border-line bg-paper-raised">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr>
              <th className="border-b border-line px-5 py-5 text-left font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted">Feature</th>
              {columns.map((col) => (
                <th key={col.key} className="border-b border-line px-5 py-5 text-center">
                  <div className="font-bold text-base font-medium text-ink">{col.name}</div>
                  <div className="mt-1 font-mono text-sm text-accent">{col.price}</div>
                  <Link
                    href={`/products/${col.slug}`}
                    className="mt-2 inline-block text-xs text-muted hover:text-accent"
                  >
                    View details
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DIALER_COMPARISON.map((row) => (
              <tr key={row.feature} className="border-b border-line last:border-0 transition-colors hover:bg-paper-sunk/40">
                <td className="px-5 py-3.5 font-medium text-ink">{row.feature}</td>
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-3.5 text-center">
                    <CellValue value={row[col.key as keyof typeof row] as boolean | string} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.key} className="rounded-2xl border border-line bg-paper-raised p-6 text-center">
            <h3 className="font-bold text-lg font-medium text-ink">{col.name}</h3>
            <p className="mt-1 font-bold text-2xl font-medium text-accent">{col.price}</p>
            <Link
              href={`/products/${col.slug}`}
              className="mt-5 inline-block rounded-lg bg-[#0c2340] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1a3a5c]"
            >
              Subscribe
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
