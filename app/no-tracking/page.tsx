import SectionIndex from "../_components/SectionIndex";
import { SECTIONS } from "../_components/sections";

export default function Page() {
  return (
    <SectionIndex
      title={SECTIONS["no-tracking"].title}
      description="Pages that fire no tracking at all, alongside two more precise variants used to validate a scanner banner-logic fix: autocapture-only versus no-autocapture."
      links={SECTIONS["no-tracking"].children}
    />
  );
}
