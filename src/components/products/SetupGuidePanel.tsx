import { Download } from "lucide-react";
import type { SetupGuide } from "@/lib/setup-guides";
import { href } from "@/lib/paths";

export function SetupGuidePanel({ guide, productName }: { guide: SetupGuide; productName: string }) {
  return (
    <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Setup Guide</h2>
          <p className="mt-1 text-sm text-slate-600">Follow these steps after your subscription is approved.</p>
        </div>
        <a
          href={href(`/setup/${guide.slug}.txt`)}
          download
          className="inline-flex items-center gap-2 rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-800 hover:bg-cyan-100"
        >
          <Download className="h-4 w-4" /> Download SETUP.txt
        </a>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Requirements</h3>
          <ul className="mt-2 space-y-1">
            {guide.requirements.map((r) => (
              <li key={r} className="text-sm text-slate-700">• {r}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Installation Steps</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-4">
            {guide.steps.map((s) => (
              <li key={s} className="text-sm text-slate-700">{s}</li>
            ))}
          </ol>
        </div>
      </div>

      {guide.notes && guide.notes.length > 0 && (
        <div className="mt-4 rounded-lg bg-amber-50 border border-amber-100 p-3 text-sm text-amber-900">
          {guide.notes.map((n) => (
            <p key={n}>💡 {n}</p>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500">
        Need help? Email <a href="mailto:induswebagency@gmail.com" className="text-cyan-600 hover:underline">induswebagency@gmail.com</a> or use the INDUS Guide chat (bottom-right).
      </p>
    </section>
  );
}
