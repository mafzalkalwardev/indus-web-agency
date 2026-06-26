import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Sign In — INDUS Web Agency",
};

const FULL_APP = "https://indus-web-agency.vercel.app";

export default function LoginPage() {
  const isStatic = process.env.NEXT_PUBLIC_BASE_PATH;

  if (isStatic) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="mt-4 text-slate-600">
          Account login and subscriptions are available on our full application.
        </p>
        <a
          href={`${FULL_APP}/login`}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0c2340] px-6 py-3 font-medium text-white hover:bg-[#1a3a5c]"
        >
          Continue to App <ExternalLink className="h-4 w-4" />
        </a>
        <p className="mt-4 text-sm text-slate-500">
          <Link href="/" className="text-cyan-600 hover:underline">Back to home</Link>
        </p>
      </div>
    );
  }

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
