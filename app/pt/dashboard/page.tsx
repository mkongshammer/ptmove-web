"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Booking = {
  id: string;
  address: string;
  reason: string;
  status: string;
  requested_date?: string;
  created_at: string;
};

type Availability = {
  id: string;
  date: string;
};

export default function PTDashboard() {
  const router = useRouter();

  const [ptId, setPtId] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [newDate, setNewDate] = useState("");
  const [loading, setLoading] = useState(true);

  // ─────────────────────────────────────────────
  // LOAD ALL DATA
  // ─────────────────────────────────────────────
  const loadData = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      router.replace("/pt/login");
      return;
    }

    const { data: pt } = await supabase
      .from("pts")
      .select("id")
      .eq("user_id", session.user.id)
      .single();

    if (!pt) {
      alert("No PT profile found");
      return;
    }

    setPtId(pt.id);

    const { data: bookingsData } = await supabase
      .from("bookings")
      .select("*")
      .eq("pt_id", pt.id)
      .order("created_at", { ascending: false });

    const { data: availabilityData } = await supabase
      .from("pt_availability")
      .select("*")
      .eq("pt_id", pt.id)
      .order("date", { ascending: true });

    setBookings(bookingsData || []);
    setAvailability(availabilityData || []);
    setLoading(false);
  };

  // ─────────────────────────────────────────────
  // BOOKING ACTIONS
  // ─────────────────────────────────────────────
  const acceptBooking = async (id: string) => {
    await supabase
      .from("bookings")
      .update({ status: "confirmed" })
      .eq("id", id);

    loadData();
  };

  const declineBooking = async (id: string) => {
    await supabase
      .from("bookings")
      .update({
        status: "declined",
        pt_id: null,
      })
      .eq("id", id);

    loadData();
  };

  // ─────────────────────────────────────────────
  // AVAILABILITY ACTIONS
  // ─────────────────────────────────────────────
  const addAvailability = async () => {
    if (!newDate || !ptId) return;

    await supabase.from("pt_availability").insert({
      pt_id: ptId,
      date: newDate,
    });

    setNewDate("");
    loadData();
  };

  const removeAvailability = async (id: string) => {
    await supabase.from("pt_availability").delete().eq("id", id);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <div className="p-10">Loading PT dashboard…</div>;
  }

  // ─────────────────────────────────────────────
  // UI
  // ─────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="mx-auto max-w-4xl space-y-10">
        <h1 className="text-3xl font-semibold">PT Dashboard</h1>

        {/* AVAILABILITY */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">My Availability</h2>

          <div className="flex gap-3">
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="rounded-md border px-3 py-2"
            />
            <button
              onClick={addAvailability}
              className="rounded-md bg-black px-4 py-2 text-white"
            >
              Add date
            </button>
          </div>

          {availability.length === 0 && (
            <p className="text-sm text-gray-500">
              No availability added yet
            </p>
          )}

          <ul className="space-y-2">
            {availability.map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between rounded-md border bg-white px-4 py-2"
              >
                <span>
                  {new Date(a.date).toLocaleDateString()}
                </span>
                <button
                  onClick={() => removeAvailability(a.id)}
                  className="text-sm text-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* BOOKINGS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">My Bookings</h2>

          {bookings.length === 0 && (
            <p className="text-gray-500">No bookings yet</p>
          )}

          {bookings.map((b) => (
            <div
              key={b.id}
              className="rounded-lg border bg-white p-4 space-y-3"
            >
              <div><strong>Address:</strong> {b.address}</div>
              <div><strong>Reason:</strong> {b.reason}</div>

              {b.requested_date && (
                <div>
                  <strong>Requested date:</strong>{" "}
                  {new Date(b.requested_date).toLocaleDateString()}
                </div>
              )}

              <div><strong>Status:</strong> {b.status}</div>

              {b.status === "matched" && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => acceptBooking(b.id)}
                    className="flex-1 rounded-md bg-black py-2 text-white"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => declineBooking(b.id)}
                    className="flex-1 rounded-md border py-2"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
