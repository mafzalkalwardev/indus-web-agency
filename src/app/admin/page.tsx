"use client";

import { useEffect, useState } from "react";
import { Users, CreditCard, PlusCircle, Hourglass, CheckCircle2, XCircle } from "lucide-react";
import { formatDate, isExpired } from "@/lib/utils";
import { getProduct, PRODUCTS } from "@/lib/products";
import { periodLabel, type BillingPeriod } from "@/lib/billing";
import { href } from "@/lib/paths";

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
}

export default function AdminPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [subs, setSubs] = useState<SubRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"pending" | "subscriptions" | "users" | "grant">("pending");
  const [storage, setStorage] = useState("");
  const [grantEmail, setGrantEmail] = useState("");
  const [grantProduct, setGrantProduct] = useState(PRODUCTS[0]?.slug || "");
  const [grantPlan, setGrantPlan] = useState(PRODUCTS[0]?.plans[0]?.id || "");
  const [grantMsg, setGrantMsg] = useState("");

  function loadData() {
    return Promise.all([
      fetch(href("/api/admin/users"), { credentials: "include" }).then((r) => r.json()),
      fetch(href("/api/admin/subscriptions"), { credentials: "include" }).then((r) => r.json()),
      fetch(href("/api/health")).then((r) => r.json()),
    ]).then(([userData, subData, health]) => {
      setUsers(userData.users || []);
      setSubs(subData.subscriptions || []);
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

  async function handleGrant(e: React.FormEvent) {
    e.preventDefault();
    setGrantMsg("");
    const res = await fetch(href("/api/admin/grant"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userEmail: grantEmail, productSlug: grantProduct, planId: grantPlan }),
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

  const pendingSubs = subs.filter((s) => s.status === "pending" && !isExpired(s.expiresAt));
  const selectedProduct = getProduct(grantProduct);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-slate-600">Approve subscriptions and manage users</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${storage === "redis" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
          Storage: {storage}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {[
          { id: "pending" as const, label: `Pending (${pendingSubs.length})`, icon: Hourglass },
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
            {grantMsg && <p className={`text-sm ${grantMsg.includes("granted") ? "text-emerald-600" : "text-red-600"}`}>{grantMsg}</p>}
            <button type="submit" className="rounded-lg bg-[#0c2340] px-4 py-2 text-sm font-medium text-white">Grant & Approve</button>
          </div>
        </form>
      )}

      {tab === "subscriptions" && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
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
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => {
                const product = getProduct(s.productSlug);
                return (
                  <tr key={s.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">{s.userEmail}</td>
                    <td className="px-4 py-3">{product?.name}</td>
                    <td className="px-4 py-3">{s.planName}</td>
                    <td className="px-4 py-3 capitalize">{s.period || "month"}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                        s.status === "approved" ? "bg-emerald-100 text-emerald-700" :
                        s.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                      }`}>{s.status || "approved"}</span>
                    </td>
                    <td className="px-4 py-3 text-right">${s.price}</td>
                    <td className="px-4 py-3">{formatDate(s.expiresAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
  );
}
