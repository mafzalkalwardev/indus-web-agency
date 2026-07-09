import { AuthForm } from "@/components/auth/AuthForm";
import Link from "next/link";
import { href } from "@/lib/paths";

export const metadata = {
  title: "Admin Login — INDUS Web Agency",
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-bold text-center">Admin Portal</h1>
      <p className="mt-2 text-center text-sm text-slate-600">
        Manage users and subscriptions
      </p>
      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/50 p-6 shadow-sm">
        <AuthForm mode="admin-login" />
      </div>
      <p className="mt-4 text-center text-sm text-slate-600">
        <Link href={href("/login")} className="hover:text-cyan-600">Customer login</Link>
      </p>
    </div>
  );
}
