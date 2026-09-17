import SectionIndex from "../_components/SectionIndex";
import { SECTIONS } from "../_components/sections";

export default function Page() {
  return (
    <SectionIndex
      title={SECTIONS.naming.title}
      description="Pages that will later exercise event and property naming convention issues, from clean baselines to combined high-severity cases."
      links={SECTIONS.naming.children}
    />
  );
}
