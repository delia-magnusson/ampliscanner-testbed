import SectionIndex from "../_components/SectionIndex";
import { SECTIONS } from "../_components/sections";

export default function Page() {
  return (
    <SectionIndex
      title={SECTIONS["legacy-sdk"].title}
      description="Pages that will later exercise varying amounts of deprecated Amplitude SDK usage, from none to heavy."
      links={SECTIONS["legacy-sdk"].children}
    />
  );
}
