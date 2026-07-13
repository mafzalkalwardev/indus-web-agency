"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { PORTFOLIO } from "@/lib/portfolio";
import { StaggerChildren, staggerItem, FadeIn } from "@/components/agency/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { href } from "@/lib/paths";

export function WorkPageContent() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <StaggerChildren className="grid gap-8 md:grid-cols-2">
        {PORTFOLIO.map((project) => (
          <motion.article
            key={project.slug}
            variants={staggerItem}
            className="group overflow-hidden rounded-2xl border border-line bg-paper-raised transition-all duration-300 hover:-translate-y-1 hover:border-ink"
          >
            <Link href={href(`/work/${project.slug}`)} className="block">
              <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <Badge className="absolute left-4 top-4 border-none bg-paper/90 capitalize text-ink backdrop-blur">{project.category}</Badge>
              </div>
              <div className="p-7">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-accent">{project.client}</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">{project.title}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{project.summary}</p>
              </div>
            </Link>
            <div className="border-t border-line px-7 pb-7">
              <ul className="space-y-1.5 text-sm text-ink">
                {project.results.slice(0, 2).map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" /> {r}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((t) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
              <Link
                href={href(`/work/${project.slug}`)}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 hover:text-cyan-700"
              >
                Read case study <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </StaggerChildren>

      <FadeIn className="relative mt-20 overflow-hidden rounded-3xl bg-[#0c2340] p-12 text-center text-white sm:p-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[100px]" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Have a project in mind?</h2>
          <p className="mt-3 text-slate-300">We&apos;d love to add your product to this wall.</p>
          <Button asChild className="mt-8" size="lg">
            <Link href={href("/start-project")}>
              Start your project <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
