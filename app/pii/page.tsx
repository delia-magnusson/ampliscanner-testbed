import SectionIndex from "../_components/SectionIndex";
import { SECTIONS } from "../_components/sections";

export default function Page() {
  return (
    <SectionIndex
      title={SECTIONS.pii.title}
      description="Pages that will later exercise personally identifiable information leaking into tracking events."
      links={SECTIONS.pii.children}
    />
  );
}
