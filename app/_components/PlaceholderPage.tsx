import SectionNav from "./SectionNav";
import type { SectionKey } from "./sections";

export default function PlaceholderPage({
  title,
  description,
  section,
  current,
}: {
  title: string;
  description: string;
  section: SectionKey;
  current: string;
}) {
  return (
    <>
      <SectionNav section={section} current={current} />
      <main className="page">
        <h1>{title}</h1>
        <p>{description}</p>
      </main>
    </>
  );
}
