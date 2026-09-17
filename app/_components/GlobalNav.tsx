import Link from "next/link";
import { SECTIONS } from "./sections";

export default function GlobalNav() {
  return (
    <header className="site-header">
      <Link href="/" className="site-title">
        AmpliScanner Testbed
      </Link>
      <nav className="site-nav">
        {Object.values(SECTIONS).map((section) => (
          <Link key={section.href} href={section.href}>
            {section.title}
          </Link>
        ))}
      </nav>
    </header>
  );
}
