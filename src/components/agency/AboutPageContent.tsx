"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { COMPANY_STORY, STUDIO_CAPABILITIES, FOUNDER, TEAM } from "@/lib/about";
import { TEAM_MARQUEE_ITEMS } from "@/lib/team-marquee";
import { StaggerChildren, staggerItem, FadeIn } from "@/components/agency/FadeIn";

export function AboutPageContent() {
  const marqueeTrack = [...TEAM_MARQUEE_ITEMS, ...TEAM_MARQUEE_ITEMS];

  return (
    <>
      {/* Story */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <FadeIn className="max-w-3xl">
          <p className="text-lg leading-relaxed text-muted">{COMPANY_STORY.mission}</p>
          <p className="mt-5 text-muted">
            Based in {FOUNDER.location} and working remote worldwide, {FOUNDER.shortName} leads INDUS as a
            founder-led studio, working alongside full-stack developer Muhammad Ahmed — combining agency craft
            with a product shelf clients can license today.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COMPANY_STORY.stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-line bg-paper-raised p-6 text-center">
              <p className="font-bold text-3xl font-medium text-ink">{s.value}</p>
              <p className="mt-1.5 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team — rolling strip (right → left) */}
      <section className="border-y border-line bg-paper-sunk/40 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <FadeIn>
            <p className="eyebrow text-accent">Founder &amp; team</p>
            <h2 className="mt-4 font-bold text-3xl font-medium tracking-tight sm:text-4xl">
              The team behind INDUS
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Direct access to the people who design, build, and ship every system — no account-manager layers.
            </p>
          </FadeIn>
        </div>

        <div className="relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper-sunk/90 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper-sunk/90 to-transparent sm:w-24" />
          <div className="flex">
            <div className="animate-marquee flex shrink-0 items-center gap-0">
              {marqueeTrack.map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="flex shrink-0 items-center whitespace-nowrap border-r border-line px-8 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-soft sm:px-12 sm:text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <StaggerChildren className="mx-auto mt-10 grid max-w-7xl gap-5 border-t border-line px-5 pt-10 sm:px-8 md:grid-cols-2">
          {TEAM.map((member) => (
            <motion.div
              key={member.id}
              variants={staggerItem}
              className="rounded-2xl border border-line bg-paper-raised p-7"
            >
              <div className="flex items-center gap-4">
                {member.avatar && (
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 shrink-0 rounded-full border border-line object-cover"
                  />
                )}
                <div>
                  <h3 className="font-bold text-lg text-ink">{member.name}</h3>
                  <p className="text-sm text-muted">{member.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{member.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {member.focus.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-line px-3 py-1 text-xs text-ink-soft"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-4 border-t border-line pt-4">
                {member.portfolio && (
                  <Link
                    href={member.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink"
                  >
                    <span className="link-underline">Portfolio</span>
                    <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                )}
                {member.github && (
                  <Link
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink"
                  >
                    <span className="link-underline">GitHub</span>
                    <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <FadeIn>
          <p className="eyebrow text-accent">What we build</p>
          <h2 className="mt-4 font-bold text-3xl font-medium tracking-tight sm:text-4xl">Studio capabilities</h2>
          <p className="mt-4 max-w-2xl text-muted">
            End-to-end development across web, desktop, and automation — the same stack behind our licensed products.
          </p>
        </FadeIn>

        <StaggerChildren className="mt-12 grid gap-5 md:grid-cols-2">
          {STUDIO_CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.id}
              variants={staggerItem}
              className="rounded-2xl border border-line bg-paper-raised p-7"
            >
              <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-bold text-xl font-medium text-ink">{cap.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{cap.description}</p>
            </motion.div>
          ))}
        </StaggerChildren>
      </section>

      {/* Values */}
      <section className="border-t border-line bg-paper-sunk/50 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <FadeIn>
            <p className="eyebrow text-accent">How we work</p>
            <h2 className="mt-4 font-bold text-3xl font-medium tracking-tight sm:text-4xl">What we stand for</h2>
          </FadeIn>
          <StaggerChildren className="mt-12 grid gap-5 md:grid-cols-2">
            {COMPANY_STORY.values.map((v) => (
              <motion.div key={v.title} variants={staggerItem} className="rounded-2xl border border-line bg-paper-raised p-7">
                <h3 className="font-bold text-xl font-medium text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
