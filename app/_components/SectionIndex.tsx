import Link from "next/link";
import GlobalNav from "./GlobalNav";
import { SECTIONS } from "./sections";
import { SectionIcon } from "./CatIcons";

export default function SectionIndex({
  title,
  description,
  links,
}: {
  title: string;
  description: string;
  links: { href: string; label: string }[];
}) {
  const sectionEntry = Object.entries(SECTIONS).find(([, section]) => section.title === title);
  const [sectionKey, section] = sectionEntry ?? [];

  return (
    <>
      <GlobalNav />
      <main
        className="page"
        style={section ? ({ "--section-color": section.color } as React.CSSProperties) : undefined}
      >
        <div className="section-index-header">
          {sectionKey && <SectionIcon section={sectionKey as keyof typeof SECTIONS} />}
          <h1>{title}</h1>
        </div>
        {section && <p className="section-index-pun">{section.pun}</p>}
        <p>{description}</p>
        <ul className="section-index-grid">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="section-index-card">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
