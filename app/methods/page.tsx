import SectionIndex from "../_components/SectionIndex";

export default function Page() {
  return (
    <SectionIndex
      title="Methods"
      description="Pages that will later exercise tracking-method issues, from a clean baseline to duplicated and inconsistently split calls."
      links={[
        { href: "/methods/clean", label: "Clean" },
        { href: "/methods/duplicate-low", label: "Duplicate (Low)" },
        { href: "/methods/duplicate-high", label: "Duplicate (High)" },
        { href: "/methods/split-no-standard", label: "Split, No Standard" },
        { href: "/methods/combined-high", label: "Combined (High)" },
      ]}
    />
  );
}
