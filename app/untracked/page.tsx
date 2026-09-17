import SectionIndex from "../_components/SectionIndex";

export default function Page() {
  return (
    <SectionIndex
      title="Untracked"
      description="A section that will eventually hold around twenty untracked sub-pages; for now it holds three as a starter set."
      links={[
        { href: "/untracked/page-1", label: "Page 1" },
        { href: "/untracked/page-2", label: "Page 2" },
        { href: "/untracked/page-3", label: "Page 3" },
      ]}
    />
  );
}
