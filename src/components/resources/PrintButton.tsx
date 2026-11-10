"use client";

export function PrintButton({ label = "Print / Save as PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#007492] print:hidden"
    >
      {label}
    </button>
  );
}
