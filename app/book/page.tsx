"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Step = 1 | 2 | 3;

export default function BookPage() {
  const [step, setStep] = useState<Step>(1);
  const [address, setAddress] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createBooking = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("bookings").insert({
      address,
      reason,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold">Book a Physical Therapist</h1>
        <p className="mt-2 text-gray-600">
          Request an in-home physical therapy session.
        </p>

        <div className="mt-8 rounded-lg border bg-white p-6">
          {/* Success */}
          {success && (
            <div className="rounded-md bg-green-50 p-4 text-green-700">
              Booking created successfully. We’ll match you with a PT shortly.
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {!success && (
            <>
              {/* Step indicator */}
              <div className="mb-6 text-sm text-gray-500">
                Step {step} of 3
              </div>

              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium">
                    Address
                  </label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    className="w-full rounded-md border px-3 py-2"
                  />
                  <button
                    disabled={!address}
                    onClick={() => setStep(2)}
                    className="mt-4 w-full rounded-md bg-black py-3 text-white font-medium disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium">
                    Reason for visit
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Describe your injury or goal"
                    rows={4}
                    className="w-full rounded-md border px-3 py-2"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="w-1/2 rounded-md border py-3 font-medium"
                    >
                      Back
                    </button>
                    <button
                      disabled={!reason}
                      onClick={() => setStep(3)}
                      className="w-1/2 rounded-md bg-black py-3 text-white font-medium disabled:opacity-50"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Confirm request</h2>
                  <p className="text-sm text-gray-600">
                    <strong>Address:</strong> {address}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Reason:</strong> {reason}
                  </p>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="w-1/2 rounded-md border py-3 font-medium"
                    >
                      Back
                    </button>
                    <button
                      onClick={createBooking}
                      disabled={loading}
                      className="w-1/2 rounded-md bg-black py-3 text-white font-medium disabled:opacity-50"
                    >
                      {loading ? "Creating…" : "Find a PT"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
