import SectionIndex from "../_components/SectionIndex";

export default function Page() {
  return (
    <SectionIndex
      title="Legacy SDK"
      description="Pages that will later exercise varying amounts of deprecated Amplitude SDK usage, from none to heavy."
      links={[
        { href: "/legacy-sdk/current", label: "Current" },
        { href: "/legacy-sdk/low", label: "Low" },
        { href: "/legacy-sdk/medium", label: "Medium" },
        { href: "/legacy-sdk/high", label: "High" },
      ]}
    />
  );
}
