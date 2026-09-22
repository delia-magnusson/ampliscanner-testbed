import Link from "next/link";
import { SECTIONS, type SectionKey } from "./sections";
import { SectionIcon } from "./CatIcons";

export default function GlobalNav() {
  return (
    <header className="site-header">
      <Link href="/" className="site-title">
        <span className="site-title__badge" aria-hidden="true">
          🐾
        </span>
        AmpliScanner Testbed
      </Link>
      <nav className="site-nav">
        {(Object.entries(SECTIONS) as [SectionKey, (typeof SECTIONS)[SectionKey]][]).map(
          ([key, section]) => (
            <Link
              key={section.href}
              href={section.href}
              style={{ "--section-color": section.color } as React.CSSProperties}
            >
              <SectionIcon section={key} />
              {section.title}
            </Link>
          ),
        )}
      </nav>
    </header>
  );
}
