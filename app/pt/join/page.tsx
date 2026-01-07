"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function PTJoinPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitApplication = async () => {
    setLoading(true);
    setError(null);

    // 🔐 Hent auth-user
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      setError("You must be logged in to apply as a PT.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("pts").insert({
      user_id: session.user.id,     // 🔑 KRITISK
      full_name: fullName,
      email,
      city,
      experience,
      status: "pending",            // 👈 admin approval
      is_active: false,              // 👈 aktiveres ved approve
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      // Optional redirect senere:
      // router.push("/pt/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-semibold">Join PTmove as a PT</h1>
        <p className="mt-2 text-gray-600">
          Apply to offer in-home physical therapy through PTmove.
        </p>

        <div className="mt-8 rounded-lg border bg-white p-6">
          {success ? (
            <div className="rounded-md bg-green-50 p-4 text-green-700">
              Application submitted. We’ll review it shortly.
            </div>
          ) : (
            <div className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-50 p-3 text-red-700">
                  {error}
                </div>
              )}

              <input
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-md border px-3 py-2"
              />

              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border px-3 py-2"
              />

              <input
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-md border px-3 py-2"
              />

              <textarea
                placeholder="Experience"
                rows={4}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-md border px-3 py-2"
              />

              <button
                onClick={submitApplication}
                disabled={!fullName || !email || !city || loading}
                className="w-full rounded-md bg-black py-3 text-white font-medium disabled:opacity-50"
              >
                {loading ? "Submitting…" : "Apply as PT"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
