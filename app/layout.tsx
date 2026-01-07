import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "PTmove",
  description: "In-home physical therapy. On demand.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold">
              PTmove
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                href="/book"
                className="text-sm font-medium hover:text-gray-600"
              >
                Book a PT
              </Link>
              <Link
                href="/pt/join"
                className="text-sm font-medium hover:text-gray-600"
              >
                Join as PT
              </Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}

