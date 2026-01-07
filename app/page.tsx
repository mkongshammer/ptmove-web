export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4 max-w-xl">
        <h1 className="text-4xl font-semibold tracking-tight">
          PTmove
        </h1>

        <p className="text-lg text-gray-600">
          In-home physical therapy. On demand.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <a
            href="/book"
            className="rounded-md bg-black px-6 py-3 text-white font-medium hover:bg-gray-800"
          >
            Book a PT
          </a>

          <a
            href="/pt/join"
            className="rounded-md border px-6 py-3 font-medium hover:bg-gray-100"
          >
            Join as PT
          </a>

          {/* 👇 NY: PT LOGIN */}
          <a
            href="/pt/login"
            className="rounded-md border px-6 py-3 font-medium text-gray-700 hover:bg-gray-100"
          >
            PT Login
          </a>
        </div>
      </div>
    </main>
  );
}
