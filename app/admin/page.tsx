"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type PT = {
  id: string;
  full_name: string;
  email: string;
  city: string;
  experience: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [pendingPTs, setPendingPTs] = useState<PT[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  // ─────────────────────────────
  // LOAD DATA
  // ─────────────────────────────
  const loadData = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("pts")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Load PTs error:", error);
    }

    setPendingPTs(data || []);
    setLoading(false);
  };

  // ─────────────────────────────
  // APPROVE PT (SERVER-SIDE)
  // ─────────────────────────────
  const approvePT = async (pt: PT) => {
    setApprovingId(pt.id);

    try {
      const res = await fetch("/api/admin/approve-pt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ptId: pt.id,
          email: pt.email,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        console.error("Approve error:", json);
        alert(json.error || "Approve failed");
        setApprovingId(null);
        return;
      }

      // 🔥 Fjern PT fra UI med det samme
      setPendingPTs((prev) => prev.filter((p) => p.id !== pt.id));
    } catch (err) {
      console.error("Network error", err);
      alert("Network error");
    } finally {
      setApprovingId(null);
    }
  };

  // ─────────────────────────────
  // AUTH GUARD (ADMIN ONLY)
  // ─────────────────────────────
  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.replace("/admin/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.session.user.id)
        .single();

      if (profile?.role !== "admin") {
        router.replace("/");
        return;
      }

      await loadData();
    };

    checkAdmin();
  }, []);

  if (loading) {
    return <div className="p-10">Loading admin…</div>;
  }

  // ─────────────────────────────
  // UI
  // ─────────────────────────────
  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-3xl font-semibold">Admin – PT Applications</h1>

        {pendingPTs.length === 0 && (
          <p className="text-gray-500">No pending PTs 🎉</p>
        )}

        <div className="space-y-4">
          {pendingPTs.map((pt) => (
            <div
              key={pt.id}
              className="flex items-center justify-between rounded-lg border bg-white p-4"
            >
              <div>
                <div className="font-medium">{pt.full_name}</div>
                <div className="text-sm text-gray-600">
                  {pt.email} · {pt.city}
                </div>
                <div className="text-sm text-gray-500">
                  {pt.experience}
                </div>
              </div>

              <button
                type="button"
                disabled={approvingId === pt.id}
                onClick={() => approvePT(pt)}
                className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
              >
                {approvingId === pt.id ? "Approving…" : "Approve"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
