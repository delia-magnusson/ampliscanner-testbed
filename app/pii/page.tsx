import SectionIndex from "../_components/SectionIndex";

export default function Page() {
  return (
    <SectionIndex
      title="PII"
      description="Pages that will later exercise personally identifiable information leaking into tracking events."
      links={[
        { href: "/pii/greeting", label: "Greeting" },
        { href: "/pii/form", label: "Form" },
        { href: "/pii/clean", label: "Clean" },
      ]}
    />
  );
}
