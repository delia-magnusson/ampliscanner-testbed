import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AmpliScanner Testbed",
  description: "A deliberately-broken test fixture for validating an Amplitude analytics scanner tool.",
};

const NAV_LINKS = [
  { href: "/no-tracking", label: "No Tracking" },
  { href: "/pii", label: "PII" },
  { href: "/naming", label: "Naming" },
  { href: "/methods", label: "Methods" },
  { href: "/legacy-sdk", label: "Legacy SDK" },
  { href: "/untracked", label: "Untracked" },
  { href: "/pageviews", label: "Page Views" },
  { href: "/mechanics", label: "Mechanics" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="site-title">
            AmpliScanner Testbed
          </Link>
          <nav className="site-nav">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
