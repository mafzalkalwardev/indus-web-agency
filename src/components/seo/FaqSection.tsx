import type { FaqItem } from "@/lib/schema";

export function FaqSection({ faqs, title = "Frequently asked questions" }: { faqs: FaqItem[]; title?: string }) {
  if (!faqs.length) return null;
  return (
    <section className="mt-14">
      <h2 className="text-2xl font-bold text-[#0c2340]">{title}</h2>
      <div className="mt-6 space-y-4">
        {faqs.map((item) => (
          <article key={item.q} className="rounded-xl border border-line bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-[#0c2340]">{item.q}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
