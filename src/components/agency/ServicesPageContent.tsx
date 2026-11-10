"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { AGENCY_SERVICES, TECH_STACK_SUGGESTIONS } from "@/lib/agency-services";
import { LIVE_PRODUCTS } from "@/lib/products";
import { StaggerChildren, staggerItem, FadeIn } from "@/components/agency/FadeIn";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function relatedProducts(ids?: readonly string[]) {
  if (!ids?.length) return [];
  return ids.flatMap((id) => {
    const product = LIVE_PRODUCTS.find((item) => item.id === id);
    return product ? [product] : [];
  });
}

export function ServicesPageContent() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AGENCY_SERVICES.map((service) => {
            const related = relatedProducts(service.relatedProductIds);
            return (
            <motion.div key={service.id} variants={staggerItem}>
              <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-ink">
                <CardHeader>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-paper text-ink">
                    <service.icon className="h-5 w-5" />
                  </span>
                  <CardTitle className="mt-4">{service.title}</CardTitle>
                  <CardDescription>{service.tagline}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted">{service.description}</p>
                  <ul className="mt-5 space-y-2 text-sm text-ink">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2.5">
                        <span className="h-1 w-1 rounded-full bg-accent" /> {d}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {service.technologies.map((t) => (
                      <Badge key={t} variant="secondary">{t}</Badge>
                    ))}
                  </div>
                  {related.length > 0 && (
                    <div className="mt-5 border-t border-line pt-4">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
                        Related {related.length === 1 ? "product" : "products"}
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {related.map((product) => (
                          <li key={product.id}>
                            <a
                              href={product.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:underline"
                            >
                              {product.name}
                              <ArrowUpRight className="h-3.5 w-3.5 text-accent" aria-hidden />
                              <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
            );
          })}
        </StaggerChildren>
      </section>

      <section className="border-t border-line bg-paper-sunk/50 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <FadeIn>
            <p className="eyebrow text-accent">Toolkit</p>
            <h2 className="mt-4 font-bold text-3xl font-medium tracking-tight sm:text-4xl">Our design &amp; motion stack</h2>
            <p className="mt-3 max-w-2xl text-muted">
              Established tools for polished, performant experiences.
            </p>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_STACK_SUGGESTIONS.map((item) => (
              <div key={item} className="rounded-xl border border-line bg-paper-raised px-4 py-3.5 text-sm text-ink">
                {item}
              </div>
            ))}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
