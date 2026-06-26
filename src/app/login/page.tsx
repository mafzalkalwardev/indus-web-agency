import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata = {
  title: "Sign In — INDUS Web Agency",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-bold text-center">Welcome back</h1>
      <p className="mt-2 text-center text-sm text-slate-600">
        Sign in to manage subscriptions and downloads
      </p>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <AuthForm mode="login" />
      </div>
      <p className="mt-4 text-center text-sm text-slate-600">
        No account?{" "}
        <Link href="/signup" className="font-medium text-cyan-600 hover:text-cyan-800">
          Create one
        </Link>
      </p>
      <p className="mt-2 text-center text-xs text-slate-400">
        <Link href="/admin/login" className="hover:text-slate-600">Admin login</Link>
      </p>
    </div>
  );
}
