import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Sign Up — INDUS Web Agency",
};

const FULL_APP = "https://indus-web-agency.vercel.app";

export default function SignupPage() {
  const isStatic = process.env.NEXT_PUBLIC_BASE_PATH;

  if (isStatic) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="mt-4 text-slate-600">
          Sign up and subscribe to products on our full application.
        </p>
        <a
          href={`${FULL_APP}/signup`}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-medium text-white hover:bg-cyan-700"
        >
          Create Account on App <ExternalLink className="h-4 w-4" />
        </a>
        <p className="mt-4 text-sm text-slate-500">
          <Link href="/" className="text-cyan-600 hover:underline">Back to home</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-bold text-center">Create your account</h1>
      <p className="mt-2 text-center text-sm text-slate-600">
        Subscribe to products and download software for your plan period
      </p>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <AuthForm mode="signup" />
      </div>
      <p className="mt-4 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-cyan-600 hover:text-cyan-800">
          Sign in
        </Link>
      </p>
    </div>
  );
}
