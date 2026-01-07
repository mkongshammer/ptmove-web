export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-32 text-center">
          <span className="inline-block rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-600">
            On-demand • In-home • Professional
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight text-gray-900">
            Physical therapy.
            <br />
            <span className="text-gray-500">Delivered to your door.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            PTmove connects you with licensed physical therapists who come to you.
            High-quality rehab, recovery, and performance care — on your schedule.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/book"
              className="rounded-md bg-black px-8 py-4 text-white font-medium hover:bg-gray-800 transition"
            >
              Book a PT
            </a>

            <a
              href="/pt/join"
              className="rounded-md border px-8 py-4 font-medium text-gray-900 hover:bg-gray-100 transition"
            >
              Join as a PT
            </a>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Available in select cities • No subscriptions • Transparent pricing
          </p>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="border-t bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 md:grid-cols-3 text-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                In-home convenience
              </h3>
              <p className="mt-2 text-gray-600">
                Skip the clinic. Get expert treatment in the comfort of your own home,
                gym, or office.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Licensed professionals
              </h3>
              <p className="mt-2 text-gray-600">
                Every PT on PTmove is licensed, vetted, and experienced in modern,
                evidence-based care.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Book in minutes
              </h3>
              <p className="mt-2 text-gray-600">
                Choose your time, location, and focus area. No phone calls.
                No waiting rooms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOR PTS */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-24 grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
              Built for physical therapists
            </h2>

            <p className="mt-4 text-gray-600">
              PTmove gives you control over your schedule, earnings, and career.
              Focus on patient care — we handle bookings and payments.
            </p>

            <ul className="mt-6 space-y-3 text-gray-600">
              <li>• Set your own availability</li>
              <li>• Competitive per-session pay</li>
              <li>• No clinic overhead</li>
              <li>• Work independently or alongside a full-time job</li>
            </ul>

            <div className="mt-8 flex gap-4">
              <a
                href="/pt/join"
                className="rounded-md bg-black px-6 py-3 text-white font-medium hover:bg-gray-800 transition"
              >
                Apply as PT
              </a>

              <a
                href="/pt/login"
                className="rounded-md border px-6 py-3 font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                PT Login
              </a>
            </div>
          </div>

          <div className="rounded-2xl border bg-gray-50 p-8 text-center">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Why PTs choose PTmove
            </p>

            <p className="mt-4 text-lg font-medium text-gray-900">
              “I earn more per session, choose my hours,
              and spend more time actually helping patients.”
            </p>

            <p className="mt-2 text-sm text-gray-500">
              — Licensed Physical Therapist
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} PTmove. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="/terms" className="hover:text-gray-900">Terms</a>
            <a href="/privacy" className="hover:text-gray-900">Privacy</a>
            <a href="/contact" className="hover:text-gray-900">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

