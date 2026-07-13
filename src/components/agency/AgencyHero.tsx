"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { href } from "@/lib/paths";

const AgencyScene3D = dynamic(
  () => import("./AgencyScene3D").then((m) => m.AgencyScene3D),
  { ssr: false, loading: () => <div className="h-full w-full" /> }
);

type Word = { t: string; em?: boolean };
const words: Word[] = [
  { t: "We" },
  { t: "design" },
  { t: "&" },
  { t: "build" },
  { t: "software", em: true },
  { t: "worth" },
  { t: "keeping." },
];

export function AgencyHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.from(headlineRef.current.querySelectorAll(".hero-word"), {
          yPercent: 110,
          opacity: 0,
          duration: 1,
          stagger: 0.06,
          ease: "power4.out",
          delay: 0.15,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] overflow-hidden bg-[#0c2340] text-white"
    >
      {/* INDUS brand gradient — explicit utilities (custom .gradient-hero was not applying in prod) */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0c2340] via-[#1a3a5c] to-[#0891b2]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_75%_15%,rgba(34,211,238,0.18),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-slate-50"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-5 pb-28 pt-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:pb-36 lg:pt-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-8 bg-cyan-400" />
            <span className="eyebrow text-cyan-200">Software studio &amp; product shelf</span>
          </motion.div>

          <h1
            ref={headlineRef}
            className="mt-7 text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {words.map((w, i) => (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden py-[0.05em] align-bottom">
                <span
                  className={`hero-word inline-block ${w.em ? "text-cyan-300" : "text-white"}`}
                >
                  {w.t}
                </span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-md text-lg leading-relaxed text-slate-200"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            INDUS is a studio for custom software, considered websites, and automation —
            from first sketch to shipped product. Plus a shelf of tools you can license today.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.6 }}
          >
            <Button asChild size="lg">
              <Link href={href("/start-project")}>
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={href("/work")}>View our work</Link>
            </Button>
          </motion.div>

          <motion.div
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {[
              ["50+", "Projects shipped"],
              ["13", "Licensed products"],
              ["24h", "Response time"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="text-2xl font-bold text-cyan-300">{v}</p>
                <p className="mt-1.5 text-xs leading-tight text-slate-300">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative h-full min-h-[320px] w-full sm:min-h-[400px] lg:min-h-[520px]">
            <AgencyScene3D />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
