import { FadeIn } from "@/components/agency/FadeIn";
import { WorkPageContent } from "@/components/agency/WorkPageContent";

export const metadata = {
  title: "Our Work — Portfolio | INDUS Web Agency",
  description: "Case studies in custom software, websites, and business automation from INDUS Web Agency.",
};

export default function WorkPage() {
  return (
    <div className="bg-paper">
      <section className="border-b border-line bg-paper py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <FadeIn>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <p className="eyebrow text-accent">Selected work</p>
            </div>
            <h1 className="mt-6 max-w-3xl font-bold text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl">
              Work that ships
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Real projects — dialers, email platforms, scrapers, and the marketplace you&apos;re browsing now.
            </p>
          </FadeIn>
        </div>
      </section>
      <WorkPageContent />
    </div>
  );
}
