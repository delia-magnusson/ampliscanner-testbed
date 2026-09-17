import SectionIndex from "../_components/SectionIndex";
import { SECTIONS } from "../_components/sections";

export default function Page() {
  return (
    <SectionIndex
      title={SECTIONS.mechanics.title}
      description="Pages with real working behaviour used to test a scanner's crawling and interaction mechanics, rather than its tracking-quality checks."
      links={SECTIONS.mechanics.children}
    />
  );
}
