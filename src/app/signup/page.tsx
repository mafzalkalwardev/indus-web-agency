import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata = {
  title: "Sign Up — INDUS Web Agency",
};

export default function SignupPage() {
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
