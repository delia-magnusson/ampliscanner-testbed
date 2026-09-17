import Link from "next/link";
import GlobalNav from "./_components/GlobalNav";
import { SECTIONS } from "./_components/sections";

export default function Home() {
  return (
    <>
      <GlobalNav />
      <main className="page">
        <h1>AmpliScanner Testbed</h1>
        <p>
          A deliberately-broken test fixture used to validate an Amplitude analytics scanner tool.
          Each section below exercises a different class of tracking or crawling issue.
        </p>
        <ul>
          {Object.values(SECTIONS).map((section) => (
            <li key={section.href}>
              <Link href={section.href}>{section.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
