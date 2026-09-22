import Link from "next/link";
import GlobalNav from "./_components/GlobalNav";
import { SECTIONS, type SectionKey } from "./_components/sections";
import { MascotCatSVG, SectionIcon } from "./_components/CatIcons";

export default function Home() {
  return (
    <>
      <GlobalNav />
      <main className="page page--wide">
        <div className="home-hero">
          <span className="home-hero__cat">
            <MascotCatSVG />
          </span>
          <div>
            <h1>AmpliScanner Testbed</h1>
            <p className="section-index-pun">Welcome to the cat control room 🐾</p>
          </div>
        </div>
        <p>
          A deliberately-broken test fixture used to validate an Amplitude analytics scanner tool.
          Each section below exercises a different class of tracking or crawling issue.
        </p>
        <ul className="section-index-grid">
          {(Object.entries(SECTIONS) as [SectionKey, (typeof SECTIONS)[SectionKey]][]).map(
            ([key, section]) => (
              <li key={section.href}>
                <Link
                  href={section.href}
                  className="section-index-card"
                  style={{ "--section-color": section.color } as React.CSSProperties}
                >
                  <SectionIcon section={key} />
                  {section.title}
                </Link>
              </li>
            ),
          )}
        </ul>
      </main>
    </>
  );
}
