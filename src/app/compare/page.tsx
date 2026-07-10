import Link from "next/link";
import type { Metadata } from "next";
import { DIALER_COMPARISON } from "@/lib/products";
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
  if (value === true) return <Check className="mx-auto h-5 w-5 text-emerald-600" />;
  if (value === false) return <X className="mx-auto h-5 w-5 text-slate-300" />;
  return <span className="text-sm font-medium">{value}</span>;
}

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">Google Voice dialer comparison</p>
      <h1 className="mt-2 text-3xl font-bold">Compare AI Auto Dialer Software Plans</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Compare Google Voice auto dialer software from basic DOM automation to enterprise
        multi-slot AI dialing with voicemail detection, CRM tools, and admin dashboards.
      </p>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 border-slate-200 px-4 py-4 text-left">Feature</th>
              {columns.map((col) => (
                <th key={col.key} className="border-b-2 border-slate-200 px-4 py-4 text-center">
                  <div className="font-bold">{col.name}</div>
                  <div className="mt-1 text-sm font-normal text-cyan-600">{col.price}</div>
                  <Link
                    href={`/products/${col.slug}`}
                    className="mt-2 inline-block text-xs text-slate-500 hover:text-cyan-600"
                  >
                    View details
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DIALER_COMPARISON.map((row) => (
              <tr key={row.feature} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">{row.feature}</td>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-center">
                    <CellValue value={row[col.key as keyof typeof row] as boolean | string} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.key} className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
            <h3 className="font-bold">{col.name}</h3>
            <p className="mt-1 text-2xl font-bold text-cyan-600">{col.price}</p>
            <Link
              href={`/products/${col.slug}`}
              className="mt-4 inline-block rounded-md bg-[#0c2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3a5c]"
            >
              Subscribe
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
