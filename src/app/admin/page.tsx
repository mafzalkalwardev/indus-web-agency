"use client";

import { useEffect, useMemo, useState } from "react";
import { Users, CreditCard, PlusCircle, Hourglass, CheckCircle2, XCircle, DollarSign, Search, Briefcase, Mail } from "lucide-react";
import { PROJECT_TYPES } from "@/lib/agency-services";
import { CONTACT_TOPICS } from "@/lib/about";
import { formatDate, isExpired } from "@/lib/utils";
import { getProduct, PRODUCTS } from "@/lib/products";
import { periodLabel, BILLING_OPTIONS, type BillingPeriod } from "@/lib/billing";
import { href } from "@/lib/paths";
import { AdminBar } from "@/components/admin/AdminBar";

interface UserRow {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

interface SubRow {
  id: string;
  userEmail: string;
  productSlug: string;
  planName: string;
  price: number;
  period: string;
  status: string;
  expiresAt: string;
  active: boolean;
  activatedMachines?: string[];
  approvedAt?: string;
}

interface ProjectRow {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  description: string;
  status: string;
  createdAt: string;
}

interface ContactRow {
  id: string;
  name: string;
  email: string;
  phone?: string;
  topic: string;
  subject?: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [subs, setSubs] = useState<SubRow[]>([]);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"pending" | "subscriptions" | "users" | "grant" | "projects" | "contacts">("pending");
  const [storage, setStorage] = useState("");
  const [grantEmail, setGrantEmail] = useState("");
  const [grantProduct, setGrantProduct] = useState(PRODUCTS[0]?.slug || "");
  const [grantPlan, setGrantPlan] = useState(PRODUCTS[0]?.plans[0]?.id || "");
  const [grantPeriod, setGrantPeriod] = useState<BillingPeriod>("month");
  const [grantMsg, setGrantMsg] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [productFilter, setProductFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"expires" | "newest">("expires");

  function loadData() {
    return Promise.all([
      fetch(href("/api/admin/users"), { credentials: "include" }).then((r) => r.json()),
      fetch(href("/api/admin/subscriptions"), { credentials: "include" }).then((r) => r.json()),
      fetch(href("/api/admin/projects"), { credentials: "include" }).then((r) => r.json()),
      fetch(href("/api/admin/contacts"), { credentials: "include" }).then((r) => r.json()),
      fetch(href("/api/health")).then((r) => r.json()),
    ]).then(([userData, subData, projectData, contactData, health]) => {
      setUsers(userData.users || []);
      setSubs(subData.subscriptions || []);
      setProjects(projectData.inquiries || []);
      setContacts(contactData.inquiries || []);
      setStorage(health.storage || "file");
      setLoading(false);
    });
  }

  useEffect(() => {
    fetch(href("/api/auth/me"), { credentials: "include" })
      .then((r) => r.json())
      .then((me) => {
        if (!me.user || me.user.role !== "admin") {
          window.location.href = href("/admin/login");
          return;
        }
        return loadData();
      });
  }, []);

  async function handleApprove(id: string, action: "approve" | "reject") {
    await fetch(href(`/api/admin/approve/${id}`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ action }),
    });
    await loadData();
  }

  async function handleResetMachines(id: string) {
    if (!confirm("Reset device bindings for this subscription?")) return;
    await fetch(href(`/api/admin/reset-machines/${id}`), { method: "POST", credentials: "include" });
    await loadData();
  }

  async function handleGrant(e: React.FormEvent) {
    e.preventDefault();
    setGrantMsg("");
    const res = await fetch(href("/api/admin/grant"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        userEmail: grantEmail,
        productSlug: grantProduct,
        planId: grantPlan,
        billingPeriod: grantPeriod,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setGrantMsg(data.error || "Failed");
      return;
    }
    setGrantMsg("Subscription granted and auto-approved!");
    setGrantEmail("");
    await loadData();
    setTab("subscriptions");
  }

  async function handleProjectStatus(id: string, status: string) {
    await fetch(href(`/api/admin/projects/${id}`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    });
    await loadData();
  }

  async function handleContactStatus(id: string, status: string) {
    await fetch(href(`/api/admin/contacts/${id}`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    });
    await loadData();
  }

  const pendingSubs = subs.filter((s) => s.status === "pending" && !isExpired(s.expiresAt));
  const approvedSubs = subs.filter((s) => s.status === "approved" && s.active && !isExpired(s.expiresAt));
  const selectedProduct = getProduct(grantProduct);

  const revenueThisMonth = useMemo(() => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    return subs
      .filter((s) => {
        if (s.status !== "approved" || !s.approvedAt) return false;
        const d = new Date(s.approvedAt);
        return d.getMonth() === month && d.getFullYear() === year;
      })
      .reduce((sum, s) => sum + s.price, 0);
  }, [subs]);

  const filteredSubs = useMemo(() => {
    let list = [...subs];
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((s) => {
        const product = getProduct(s.productSlug);
        return (
          s.userEmail.toLowerCase().includes(q) ||
          s.productSlug.toLowerCase().includes(q) ||
          (product?.name.toLowerCase().includes(q) ?? false)
        );
      });
    }
    if (statusFilter !== "all") list = list.filter((s) => s.status === statusFilter);
    if (productFilter !== "all") list = list.filter((s) => s.productSlug === productFilter);
    list.sort((a, b) => {
      if (sortBy === "expires") return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
      return new Date(b.expiresAt).getTime() - new Date(a.expiresAt).getTime();
    });
    return list;
  }, [subs, search, statusFilter, productFilter, sortBy]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <AdminBar pendingCount={pendingSubs.length} />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-slate-600">Subscriptions, project leads, and users</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${storage === "redis" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
            Storage: {storage}
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Pending", value: pendingSubs.length, icon: Hourglass, color: "text-amber-600" },
            { label: "Active Subs", value: approvedSubs.length, icon: CreditCard, color: "text-emerald-600" },
            { label: "Revenue (month)", value: `$${revenueThisMonth}`, icon: DollarSign, color: "text-[#0c2340]" },
            { label: "Users", value: users.length, icon: Users, color: "text-cyan-700" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{label}</p>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { id: "pending" as const, label: `Pending (${pendingSubs.length})`, icon: Hourglass },
            { id: "projects" as const, label: `Projects (${projects.filter((p) => p.status === "new").length})`, icon: Briefcase },
            { id: "contacts" as const, label: `Contacts (${contacts.filter((c) => c.status === "new").length})`, icon: Mail },
            { id: "subscriptions" as const, label: `All (${subs.length})`, icon: CreditCard },
            { id: "users" as const, label: `Users (${users.length})`, icon: Users },
            { id: "grant" as const, label: "Grant", icon: PlusCircle },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
                tab === id ? "bg-[#0c2340] text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        {tab === "pending" && (
          <div className="mt-6 space-y-4">
            {pendingSubs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                No pending subscriptions to review.
              </div>
            ) : (
              pendingSubs.map((s) => {
                const product = getProduct(s.productSlug);
                return (
                  <div key={s.id} className="flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50/30 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-bold">{s.userEmail}</p>
                      <p className="text-sm">{product?.name} — {s.planName}</p>
                      <p className="text-sm text-slate-600">${s.price} · {periodLabel(s.period as BillingPeriod)} · Expires {formatDate(s.expiresAt)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(s.id, "approve")} className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
                        <CheckCircle2 className="h-4 w-4" /> Approve
                      </button>
                      <button onClick={() => handleApprove(s.id, "reject")} className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                        <XCircle className="h-4 w-4" /> Reject
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {tab === "grant" && (
          <form onSubmit={handleGrant} className="mt-6 max-w-lg rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold">Grant subscription (auto-approved)</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Customer email</label>
                <input type="email" required value={grantEmail} onChange={(e) => setGrantEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Product</label>
                <select value={grantProduct} onChange={(e) => { setGrantProduct(e.target.value); setGrantPlan(getProduct(e.target.value)?.plans[0]?.id || ""); }} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                  {PRODUCTS.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Plan</label>
                <select value={grantPlan} onChange={(e) => setGrantPlan(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                  {selectedProduct?.plans.map((pl) => <option key={pl.id} value={pl.id}>{pl.name} — ${pl.price}/mo base</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Billing period</label>
                <select value={grantPeriod} onChange={(e) => setGrantPeriod(e.target.value as BillingPeriod)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                  {BILLING_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label} ({opt.durationDays} days)</option>
                  ))}
                </select>
              </div>
              {grantMsg && <p className={`text-sm ${grantMsg.includes("granted") ? "text-emerald-600" : "text-red-600"}`}>{grantMsg}</p>}
              <button type="submit" className="rounded-lg bg-[#0c2340] px-4 py-2 text-sm font-medium text-white">Grant & Approve</button>
            </div>
          </form>
        )}

        {tab === "subscriptions" && (
          <div className="mt-6 space-y-4">
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="relative min-w-[200px] flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search email or product…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm"
                />
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option value="all">All statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="expired">Expired</option>
              </select>
              <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option value="all">All products</option>
                {PRODUCTS.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "expires" | "newest")} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option value="expires">Sort: expiry (soonest)</option>
                <option value="newest">Sort: expiry (latest)</option>
              </select>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full min-w-[800px] text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Customer</th>
                    <th className="px-4 py-3 text-left">Product</th>
                    <th className="px-4 py-3 text-left">Plan</th>
                    <th className="px-4 py-3 text-left">Period</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-right">Price</th>
                    <th className="px-4 py-3 text-left">Expires</th>
                    <th className="px-4 py-3 text-left">Devices</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubs.map((s) => {
                    const product = getProduct(s.productSlug);
                    const deviceCount = s.activatedMachines?.length ?? 0;
                    return (
                      <tr key={s.id} className="border-t border-slate-100">
                        <td className="px-4 py-3">{s.userEmail}</td>
                        <td className="px-4 py-3">{product?.name}</td>
                        <td className="px-4 py-3">{s.planName}</td>
                        <td className="px-4 py-3 capitalize">{s.period || "month"}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                            s.status === "approved" ? "bg-emerald-100 text-emerald-700" :
                            s.status === "pending" ? "bg-amber-100 text-amber-700" :
                            s.status === "expired" ? "bg-slate-100 text-slate-600" : "bg-red-100 text-red-700"
                          }`}>{s.status || "approved"}</span>
                        </td>
                        <td className="px-4 py-3 text-right">${s.price}</td>
                        <td className="px-4 py-3">{formatDate(s.expiresAt)}</td>
                        <td className="px-4 py-3">
                          {deviceCount}/2
                          {deviceCount > 0 && (
                            <button type="button" onClick={() => handleResetMachines(s.id)} className="ml-2 text-xs text-cyan-700 hover:underline">
                              Reset
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "projects" && (
          <div className="mt-6 space-y-4">
            {projects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                No project inquiries yet.
              </div>
            ) : (
              projects.map((p) => {
                const typeLabel = PROJECT_TYPES.find((t) => t.value === p.projectType)?.label || p.projectType;
                return (
                  <div key={p.id} className={`rounded-2xl border p-5 ${p.status === "new" ? "border-cyan-200 bg-cyan-50/30" : "border-slate-200 bg-white"}`}>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-bold">{p.name}</p>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${p.status === "new" ? "bg-cyan-100 text-cyan-800" : "bg-slate-100 text-slate-600"}`}>{p.status}</span>
                        </div>
                        <p className="text-sm text-slate-600">{p.email}{p.company ? ` · ${p.company}` : ""}</p>
                        <p className="mt-1 text-sm font-medium">{typeLabel}{p.budget ? ` · ${p.budget}` : ""}{p.timeline ? ` · ${p.timeline}` : ""}</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">{p.description}</p>
                        <p className="mt-2 text-xs text-slate-400">{formatDate(p.createdAt)}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(["reviewed", "contacted", "closed"] as const).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => handleProjectStatus(p.id, s)}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium capitalize hover:bg-slate-50"
                          >
                            Mark {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {tab === "contacts" && (
          <div className="mt-6 space-y-4">
            {contacts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                No contact messages yet.
              </div>
            ) : (
              contacts.map((c) => {
                const topicLabel = CONTACT_TOPICS.find((t) => t.value === c.topic)?.label || c.topic;
                return (
                  <div key={c.id} className={`rounded-2xl border p-5 ${c.status === "new" ? "border-amber-200 bg-amber-50/30" : "border-slate-200 bg-white"}`}>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-bold">{c.name}</p>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${c.status === "new" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"}`}>{c.status}</span>
                        </div>
                        <p className="text-sm text-slate-600">
                          <a href={`mailto:${c.email}`} className="hover:text-cyan-700">{c.email}</a>
                          {c.phone ? ` · ${c.phone}` : ""}
                        </p>
                        <p className="mt-1 text-sm font-medium">{topicLabel}{c.subject ? ` — ${c.subject}` : ""}</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">{c.message}</p>
                        <p className="mt-2 text-xs text-slate-400">{formatDate(c.createdAt)}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(["reviewed", "replied", "closed"] as const).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => handleContactStatus(c.id, s)}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium capitalize hover:bg-slate-50"
                          >
                            Mark {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {tab === "users" && (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">{u.name}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${u.role === "admin" ? "bg-amber-100 text-amber-800" : "bg-slate-100"}`}>{u.role}</span></td>
                    <td className="px-4 py-3">{formatDate(u.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
