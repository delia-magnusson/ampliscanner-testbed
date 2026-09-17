import SectionIndex from "../_components/SectionIndex";

export default function Page() {
  return (
    <SectionIndex
      title="Mechanics"
      description="Pages with real working behaviour used to test a scanner's crawling and interaction mechanics, rather than its tracking-quality checks."
      links={[
        { href: "/mechanics/spa", label: "SPA" },
        { href: "/mechanics/cookie-banner", label: "Cookie Banner" },
        { href: "/mechanics/mega-menu", label: "Mega Menu" },
        { href: "/mechanics/dangerous-buttons", label: "Dangerous Buttons" },
        { href: "/mechanics/infinite-scroll", label: "Infinite Scroll" },
        { href: "/mechanics/tabs-dropdowns-video", label: "Tabs, Dropdowns & Video" },
        { href: "/mechanics/login-wall", label: "Login Wall" },
        { href: "/mechanics/drift-redirect", label: "Drift Redirect" },
      ]}
    />
  );
}
