import SectionIndex from "../_components/SectionIndex";
import { SECTIONS } from "../_components/sections";

export default function Page() {
  return (
    <SectionIndex
      title={SECTIONS.untracked.title}
      description="A section that will eventually hold around twenty untracked sub-pages; for now it holds three as a starter set."
      links={SECTIONS.untracked.children}
    />
  );
}
