"use client";

import { useEffect, useState } from "react";
import { Users, CreditCard } from "lucide-react";
import { formatDate, isExpired } from "@/lib/utils";
import { getProduct } from "@/lib/products";

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
  const [tab, setTab] = useState<"users" | "subscriptions">("subscriptions");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((me) => {
        if (!me.user || me.user.role !== "admin") {
          window.location.href = "/admin/login";
          return;
        }
        return Promise.all([
          fetch("/api/admin/users").then((r) => r.json()),
          fetch("/api/admin/subscriptions").then((r) => r.json()),
        ]);
      })
      .then((data) => {
        if (!data) return;
        const [userData, subData] = data;
        setUsers(userData.users || []);
        setSubs(subData.subscriptions || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-sm text-slate-600">Manage users and subscriptions</p>

      <div className="mt-6 flex gap-2">
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
      </div>

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
