import SectionIndex from "../_components/SectionIndex";
import { SECTIONS } from "../_components/sections";

export default function Page() {
  return (
    <SectionIndex
      title={SECTIONS.pageviews.title}
      description="Pages that will later exercise page view tracking issues, from a clean baseline to missing, reused, and proliferating page view events."
      links={SECTIONS.pageviews.children}
    />
  );
}
