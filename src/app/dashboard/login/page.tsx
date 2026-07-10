"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function DashboardLoginPage() {
  const router = useRouter();
  const callbackUrl =
    typeof window === "undefined"
      ? "/dashboard"
      : new URLSearchParams(window.location.search).get("next") ?? "/dashboard";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (response?.error) {
      setError("Invalid credentials or unauthorized account.");
      return;
    }

    router.push(callbackUrl);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6 py-20 text-white">
      <form onSubmit={onSubmit} className="w-full rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <p className="mt-1 text-sm text-white/70">Sign in with your Supabase account.</p>
        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm">Email</span>
            <input required name="email" type="email" className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm">Password</span>
            <input required name="password" type="password" className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2" />
          </label>
        </div>
        {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}
        <button disabled={loading} className="mt-6 w-full rounded-lg bg-electric-blue px-4 py-2 font-medium text-black disabled:opacity-60" type="submit">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
