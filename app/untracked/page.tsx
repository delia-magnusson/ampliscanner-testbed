import SectionIndex from "../_components/SectionIndex";
import { SECTIONS } from "../_components/sections";

export default function Page() {
  return (
    <SectionIndex
      title={SECTIONS.untracked.title}
      description="Three self-contained 11-page groups (an entry page plus 10 members each), used to test UNTRACKED_AREAS at roughly 10%, 30%, and 60% silent-page ratios. Each group's own entry page links only to its own 10 members, so a scan pointed at one entry page stays within that group."
      links={SECTIONS.untracked.children}
    />
  );
}
