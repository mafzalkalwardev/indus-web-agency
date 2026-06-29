"use client";

import { useEffect, useState } from "react";
import { Users, CreditCard, PlusCircle } from "lucide-react";
import { formatDate, isExpired } from "@/lib/utils";
import { getProduct, PRODUCTS } from "@/lib/products";

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
  expiresAt: string;
  active: boolean;
}

export default function AdminPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [subs, setSubs] = useState<SubRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"subscriptions" | "users" | "grant">("subscriptions");
  const [storage, setStorage] = useState<string>("");
  const [grantEmail, setGrantEmail] = useState("");
  const [grantProduct, setGrantProduct] = useState(PRODUCTS[0]?.slug || "");
  const [grantPlan, setGrantPlan] = useState(PRODUCTS[0]?.plans[0]?.id || "");
  const [grantMsg, setGrantMsg] = useState("");

  function loadData() {
    return Promise.all([
      fetch("/api/admin/users").then((r) => r.json()),
      fetch("/api/admin/subscriptions").then((r) => r.json()),
      fetch("/api/health").then((r) => r.json()),
    ]).then(([userData, subData, health]) => {
      setUsers(userData.users || []);
      setSubs(subData.subscriptions || []);
      setStorage(health.storage || "file");
      setLoading(false);
    });
  }

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((me) => {
        if (!me.user || me.user.role !== "admin") {
          window.location.href = "/admin/login";
          return;
        }
        return loadData();
      });
  }, []);

  async function handleGrant(e: React.FormEvent) {
    e.preventDefault();
    setGrantMsg("");
    const res = await fetch("/api/admin/grant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: grantEmail, productSlug: grantProduct, planId: grantPlan }),
    });
    const data = await res.json();
    if (!res.ok) {
      setGrantMsg(data.error || "Failed");
      return;
    }
    setGrantMsg("Subscription granted successfully!");
    setGrantEmail("");
    await loadData();
    setTab("subscriptions");
  }

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
          <p className="text-sm text-slate-600">Manage users and subscriptions</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
          storage === "redis" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
        }`}>
          Storage: {storage === "redis" ? "Redis (persistent)" : "File (ephemeral on Vercel)"}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setTab("subscriptions")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
            tab === "subscriptions" ? "bg-[#0c2340] text-white" : "bg-slate-100 text-slate-700"
          }`}
        >
          <CreditCard className="h-4 w-4" /> Subscriptions ({subs.length})
        </button>
        <button
          onClick={() => setTab("users")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
            tab === "users" ? "bg-[#0c2340] text-white" : "bg-slate-100 text-slate-700"
          }`}
        >
          <Users className="h-4 w-4" /> Users ({users.length})
        </button>
        <button
          onClick={() => setTab("grant")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
            tab === "grant" ? "bg-cyan-600 text-white" : "bg-slate-100 text-slate-700"
          }`}
        >
          <PlusCircle className="h-4 w-4" /> Grant Subscription
        </button>
      </div>

      {tab === "grant" && (
        <form onSubmit={handleGrant} className="mt-6 max-w-lg rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold">Grant subscription to customer</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium">Customer email</label>
              <input
                type="email"
                required
                value={grantEmail}
                onChange={(e) => setGrantEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="client@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Product</label>
              <select
                value={grantProduct}
                onChange={(e) => {
                  setGrantProduct(e.target.value);
                  const p = getProduct(e.target.value);
                  setGrantPlan(p?.plans[0]?.id || "");
                }}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                {PRODUCTS.map((p) => (
                  <option key={p.slug} value={p.slug}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Plan</label>
              <select
                value={grantPlan}
                onChange={(e) => setGrantPlan(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                {selectedProduct?.plans.map((pl) => (
                  <option key={pl.id} value={pl.id}>{pl.name} — ${pl.price}/mo</option>
                ))}
              </select>
            </div>
            {grantMsg && (
              <p className={`text-sm ${grantMsg.includes("success") ? "text-emerald-600" : "text-red-600"}`}>
                {grantMsg}
              </p>
            )}
            <button type="submit" className="rounded-lg bg-[#0c2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3a5c]">
              Grant Subscription
            </button>
          </div>
        </form>
      )}

      {tab === "subscriptions" && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Plan</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-left">Expires</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => {
                const product = getProduct(s.productSlug);
                const expired = isExpired(s.expiresAt);
                return (
                  <tr key={s.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">{s.userEmail}</td>
                    <td className="px-4 py-3">{product?.name || s.productSlug}</td>
                    <td className="px-4 py-3">{s.planName}</td>
                    <td className="px-4 py-3 text-right">${s.price}</td>
                    <td className="px-4 py-3">{formatDate(s.expiresAt)}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        expired ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {expired ? "Expired" : "Active"}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {subs.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">No subscriptions yet</td></tr>
              )}
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
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      u.role === "admin" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"
                    }`}>
                      {u.role}
                    </span>
                  </td>
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
