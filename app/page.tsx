import Link from "next/link";

const SECTIONS = [
  { href: "/no-tracking", label: "No Tracking" },
  { href: "/pii", label: "PII" },
  { href: "/naming", label: "Naming" },
  { href: "/methods", label: "Methods" },
  { href: "/legacy-sdk", label: "Legacy SDK" },
  { href: "/untracked", label: "Untracked" },
  { href: "/pageviews", label: "Page Views" },
  { href: "/mechanics", label: "Mechanics" },
];

export default function Home() {
  return (
    <main className="page">
      <h1>AmpliScanner Testbed</h1>
      <p>
        A deliberately-broken test fixture used to validate an Amplitude analytics scanner tool.
        Each section below exercises a different class of tracking or crawling issue.
      </p>
      <ul>
        {SECTIONS.map((section) => (
          <li key={section.href}>
            <Link href={section.href}>{section.label}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
