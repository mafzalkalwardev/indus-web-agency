import Link from "next/link";
import { DIALER_COMPARISON } from "@/lib/products";
import { PrintButton } from "@/components/resources/PrintButton";
import { SITE_CONTACT } from "@/lib/site-config";
import { href } from "@/lib/paths";

export const metadata = {
  title: "Auto Dialer Comparison Chart — Print & PDF",
  description:
    "Full INDUS auto dialer comparison chart. Print or save as PDF — DOM starter, multi-slot, AI solo, and enterprise AI dispatch plans.",
  alternates: { canonical: "/resources/dialer-comparison" },
};

const columns = [
  { key: "dom" as const, name: "DOM/BOM Starter", slug: "dialer-starter-dom", price: "$29/mo" },
  { key: "multiSlot" as const, name: "Multi-Slot Agent", slug: "dialer-multi-slot", price: "$79/mo" },
  { key: "aiSolo" as const, name: "AI Agent Solo", slug: "dialer-ai-agent", price: "$99/mo" },
  { key: "aiMulti" as const, name: "Enterprise AI Multi-Slot", slug: "dialer-ai-multi-slot", price: "$199/mo" },
];

function cell(value: boolean | string) {
  if (value === true) return "Yes";
  if (value === false) return "—";
  return String(value);
}

export default function DialerComparisonPrintPage() {
  return (
    <div className="bg-white text-[#0c2340] print:bg-white">
      <div className="mx-auto max-w-5xl px-6 py-10 print:px-0 print:py-6">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between print:border-slate-300">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-600">INDUS Web Agency</p>
            <h1 className="mt-2 text-3xl font-bold">Auto Dialer Plan Comparison</h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Google Voice auto dialers from solo DOM automation to enterprise multi-slot AI dispatch.
              Subscribe at {SITE_CONTACT.siteUrl.replace("https://", "")}
            </p>
          </div>
          <PrintButton />
        </div>

        <table className="mt-8 w-full border-collapse text-sm print:text-xs">
          <thead>
            <tr className="bg-[#0c2340] text-white">
              <th className="border border-slate-300 px-3 py-3 text-left font-semibold">Feature</th>
              {columns.map((col) => (
                <th key={col.key} className="border border-slate-300 px-3 py-3 text-center">
                  <div className="font-bold">{col.name}</div>
                  <div className="mt-1 text-cyan-300">{col.price}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DIALER_COMPARISON.map((row, i) => (
              <tr key={row.feature} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                <td className="border border-slate-200 px-3 py-2.5 font-medium">{row.feature}</td>
                {columns.map((col) => (
                  <td key={col.key} className="border border-slate-200 px-3 py-2.5 text-center">
                    {cell(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 print:grid-cols-2">
          {columns.map((col) => (
            <div key={col.key} className="rounded-lg border border-slate-200 p-4 print:break-inside-avoid">
              <h2 className="font-bold">{col.name}</h2>
              <p className="text-lg font-bold text-cyan-600">{col.price}</p>
              <p className="mt-2 text-xs text-slate-600 print:text-[10px]">
                {SITE_CONTACT.siteUrl}/products/{col.slug}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600 print:mt-8">
          <p>
            <strong>Need help choosing?</strong> Use our{" "}
            <Link href={href("/tools/dialer-calculator")} className="text-cyan-600 underline print:text-[#0c2340]">
              dialer calculator
            </Link>{" "}
            or contact {SITE_CONTACT.email} · WhatsApp {SITE_CONTACT.whatsapp}
          </p>
          <p className="mt-2 text-xs text-slate-500">© {new Date().getFullYear()} INDUS Web Agency. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
