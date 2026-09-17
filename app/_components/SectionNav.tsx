import Link from "next/link";
import { SECTIONS, type SectionKey } from "./sections";

export default function SectionNav({ section, current }: { section: SectionKey; current?: string }) {
  const { title, href, children } = SECTIONS[section];

  return (
    <header className="section-nav">
      <Link href={href} className="section-nav-back">
        ← Back to {title}
      </Link>
      <nav className="section-nav-siblings">
        {children.map((link) =>
          link.href === current ? (
            <span key={link.href} className="section-nav-current">
              {link.label}
            </span>
          ) : (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ),
        )}
      </nav>
    </header>
  );
}
