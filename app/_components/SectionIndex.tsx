import Link from "next/link";
import GlobalNav from "./GlobalNav";

export default function SectionIndex({
  title,
  description,
  links,
}: {
  title: string;
  description: string;
  links: { href: string; label: string }[];
}) {
  return (
    <>
      <GlobalNav />
      <main className="page">
        <h1>{title}</h1>
        <p>{description}</p>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
