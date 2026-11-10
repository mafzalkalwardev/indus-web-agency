"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PROJECT_TYPES, BUDGET_RANGES, TIMELINE_OPTIONS } from "@/lib/agency-services";
import { href } from "@/lib/paths";

export function ProjectInquiryForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "custom-software",
    budget: "discuss",
    timeline: "flexible",
    description: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(href("/api/projects/inquiry"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Submission failed");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-tint text-accent-strong">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <h2 className="mt-5 font-bold text-2xl font-medium text-ink">Inquiry received</h2>
          <p className="mt-2 max-w-sm text-sm text-muted">
            We&apos;ll review your project details and respond within 24 hours on business days.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tell us about your project</CardTitle>
        <CardDescription>
          Custom software, websites, or automation — share your goals and we&apos;ll follow up with a plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="project-name" className="mb-1.5 block text-sm font-medium">Full name *</label>
              <Input id="project-name" name="name" autoComplete="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label htmlFor="project-email" className="mb-1.5 block text-sm font-medium">Email *</label>
              <Input id="project-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label htmlFor="project-company" className="mb-1.5 block text-sm font-medium">Company</label>
              <Input id="project-company" name="company" autoComplete="organization" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
            <div>
              <label htmlFor="project-phone" className="mb-1.5 block text-sm font-medium">Phone / WhatsApp</label>
              <Input id="project-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>

          <div>
            <label htmlFor="project-type" className="mb-1.5 block text-sm font-medium">Project type *</label>
            <select
              id="project-type"
              name="projectType"
              required
              value={form.projectType}
              onChange={(e) => setForm({ ...form, projectType: e.target.value })}
              className="flex h-11 w-full rounded-lg border border-line bg-paper-raised px-3.5 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {PROJECT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="project-budget" className="mb-1.5 block text-sm font-medium">Budget range</label>
              <select
                id="project-budget"
                name="budget"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="flex h-11 w-full rounded-lg border border-line bg-paper-raised px-3.5 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                {BUDGET_RANGES.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="project-timeline" className="mb-1.5 block text-sm font-medium">Timeline</label>
              <select
                id="project-timeline"
                name="timeline"
                value={form.timeline}
                onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                className="flex h-11 w-full rounded-lg border border-line bg-paper-raised px-3.5 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                {TIMELINE_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="project-description" className="mb-1.5 block text-sm font-medium">Project description *</label>
            <Textarea
              id="project-description"
              name="description"
              required
              rows={5}
              placeholder="What should we build? Who is it for? Any integrations, design references, or deadlines?"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" disabled={loading} size="lg" className="w-full sm:w-auto">
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
            ) : (
              "Submit Project Inquiry"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
