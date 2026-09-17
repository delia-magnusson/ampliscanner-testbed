import SectionIndex from "../_components/SectionIndex";

export default function Page() {
  return (
    <SectionIndex
      title="Naming"
      description="Pages that will later exercise event and property naming convention issues, from clean baselines to combined high-severity cases."
      links={[
        { href: "/naming/clean", label: "Clean" },
        { href: "/naming/casing-low", label: "Casing (Low)" },
        { href: "/naming/casing-high", label: "Casing (High)" },
        { href: "/naming/concept-2", label: "Concept Duplication (2)" },
        { href: "/naming/concept-4", label: "Concept Duplication (4)" },
        { href: "/naming/generic-1", label: "Generic (1)" },
        { href: "/naming/generic-2", label: "Generic (2)" },
        { href: "/naming/combined-high", label: "Combined (High)" },
      ]}
    />
  );
}
