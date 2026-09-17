import SectionIndex from "../_components/SectionIndex";

export default function Page() {
  return (
    <SectionIndex
      title="Page Views"
      description="Pages that will later exercise page view tracking issues, from a clean baseline to missing, reused, and proliferating page view events."
      links={[
        { href: "/pageviews/clean", label: "Clean" },
        { href: "/pageviews/missing-some", label: "Missing Some" },
        { href: "/pageviews/reused-value", label: "Reused Value" },
        { href: "/pageviews/proliferation-low", label: "Proliferation (Low)" },
        { href: "/pageviews/proliferation-high", label: "Proliferation (High)" },
        { href: "/pageviews/no-pageview-anywhere", label: "No Page View Anywhere" },
      ]}
    />
  );
}
