import SectionIndex from "../_components/SectionIndex";

export default function Page() {
  return (
    <SectionIndex
      title="No Tracking"
      description="Pages that fire no tracking at all, alongside two more precise variants used to validate a scanner banner-logic fix: autocapture-only versus no-autocapture."
      links={[
        { href: "/no-tracking/page-2", label: "Page 2" },
        { href: "/no-tracking/autocapture-only", label: "Autocapture Only" },
        { href: "/no-tracking/no-autocapture", label: "No Autocapture" },
      ]}
    />
  );
}
