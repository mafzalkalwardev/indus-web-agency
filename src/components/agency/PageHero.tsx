import { FadeIn } from "@/components/agency/FadeIn";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#0c2340] text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0c2340] via-[#1a3a5c] to-[#0891b2]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_75%_15%,rgba(34,211,238,0.15),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <FadeIn>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-cyan-400" />
            <p className="eyebrow text-cyan-300">{eyebrow}</p>
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">{description}</p>
          )}
          {children}
        </FadeIn>
      </div>
    </section>
  );
}
