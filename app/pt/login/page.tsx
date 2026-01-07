"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function PTLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendMagicLink = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    // 1. Send magic link
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/pt/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage(
      "Check your email for a login link. You can close this page."
    );
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-lg border bg-white p-6 space-y-4">
        <h1 className="text-xl font-semibold text-center">
          PT Login
        </h1>

        <p className="text-sm text-gray-600 text-center">
          We’ll email you a secure login link.
        </p>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">
            {message}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
        />

        <button
          onClick={sendMagicLink}
          disabled={!email || loading}
          className="w-full rounded-md bg-black py-3 text-white font-medium disabled:opacity-50"
        >
          {loading ? "Sending link…" : "Send login link"}
        </button>
      </div>
    </main>
  );
}
