import { ProjectInquiryForm } from "@/components/agency/ProjectInquiryForm";
import { FadeIn } from "@/components/agency/FadeIn";
import { SITE_CONTACT } from "@/lib/site-config";
import { Mail, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Start a Project — INDUS Web Agency",
  description: "Request custom software, a website, or automation project from INDUS Web Agency.",
};

export default function StartProjectPage() {
  return (
    <div className="bg-paper py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_360px]">
        <div>
          <FadeIn>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <p className="eyebrow text-accent">Start a project</p>
            </div>
            <h1 className="mt-6 font-display text-4xl font-medium tracking-tight sm:text-5xl">Tell us what to build</h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              Custom software, a website, or automation — share the brief and we respond within 24 hours
              with next steps and a rough scope.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="mt-10">
            <ProjectInquiryForm />
          </FadeIn>
        </div>

        <FadeIn delay={0.2} className="space-y-6">
          <div className="rounded-2xl border border-line bg-paper-raised p-7">
            <h2 className="font-display text-lg font-medium text-ink">What happens next?</h2>
            <ol className="mt-5 space-y-4 text-sm text-muted">
              {["We review your brief", "Discovery call (optional)", "Proposal with timeline & quote", "Build, iterate, launch"].map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-xs text-ink">{i + 1}</span>
                  <span className="text-ink">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-accent/25 bg-accent-tint/40 p-7">
            <h2 className="font-display text-lg font-medium text-ink">Prefer direct contact?</h2>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent" />
                <a href={`mailto:${SITE_CONTACT.email}`} className="text-ink hover:text-accent-strong">
                  {SITE_CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 text-accent" />
                <a href={SITE_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-accent-strong">
                  WhatsApp {SITE_CONTACT.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
