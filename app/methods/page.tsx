import SectionIndex from "../_components/SectionIndex";
import { SECTIONS } from "../_components/sections";

export default function Page() {
  return (
    <SectionIndex
      title={SECTIONS.methods.title}
      description="Pages that will later exercise tracking-method issues, from a clean baseline to duplicated and inconsistently split calls."
      links={SECTIONS.methods.children}
    />
  );
}
