"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type PT = {
  id: string;
  full_name: string;
  city: string;
  experience: string;
};

export default function ChoosePTPage() {
  const router = useRouter();
  const [pts, setPts] = useState<PT[]>([]);

  useEffect(() => {
    const loadPTs = async () => {
      const { data } = await supabase
        .from("pts")
        .select("id, full_name, city, experience")
        .eq("is_active", true);

      setPts(data || []);
    };

    loadPTs();
  }, []);

  const bookPT = async (pt: PT) => {
    await supabase.from("bookings").insert({
      pt_id: pt.id,
      status: "matched",
      address: "Provided later",
      reason: "Client-selected PT",
      matched_at: new Date().toISOString(),
    });

    router.push("/thank-you");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-semibold">Choose your PT</h1>

        {pts.map((pt) => (
          <div
            key={pt.id}
            className="rounded-lg border bg-white p-4 flex justify-between"
          >
            <div>
              <div className="font-semibold">{pt.full_name}</div>
              <div className="text-sm text-gray-600">{pt.city}</div>
              <div className="text-sm">{pt.experience}</div>
            </div>

            <button
              onClick={() => bookPT(pt)}
              className="rounded-md bg-black px-4 py-2 text-white"
            >
              Book this PT
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
