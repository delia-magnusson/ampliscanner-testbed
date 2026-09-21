export type SectionLink = { href: string; label: string };

export type SectionKey =
  | "no-tracking"
  | "pii"
  | "naming"
  | "methods"
  | "legacy-sdk"
  | "untracked"
  | "pageviews"
  | "mechanics";

export const SECTIONS: Record<SectionKey, { title: string; href: string; children: SectionLink[] }> = {
  "no-tracking": {
    title: "No Tracking",
    href: "/no-tracking",
    children: [
      { href: "/no-tracking/page-2", label: "Page 2" },
      { href: "/no-tracking/autocapture-only", label: "Autocapture Only" },
      { href: "/no-tracking/no-autocapture", label: "No Autocapture" },
    ],
  },
  pii: {
    title: "PII",
    href: "/pii",
    children: [
      { href: "/pii/greeting", label: "Greeting" },
      { href: "/pii/form", label: "Form" },
      { href: "/pii/clean", label: "Clean" },
    ],
  },
  naming: {
    title: "Naming",
    href: "/naming",
    children: [
      { href: "/naming/clean", label: "Clean" },
      { href: "/naming/casing-low", label: "Casing (Low)" },
      { href: "/naming/casing-high", label: "Casing (High)" },
      { href: "/naming/concept-2", label: "Concept Duplication (2)" },
      { href: "/naming/concept-4", label: "Concept Duplication (4)" },
      { href: "/naming/generic-1", label: "Generic (1)" },
      { href: "/naming/generic-2", label: "Generic (2)" },
      { href: "/naming/combined-high", label: "Combined (High)" },
      { href: "/naming/unreadable", label: "Unreadable" },
    ],
  },
  methods: {
    title: "Methods",
    href: "/methods",
    children: [
      { href: "/methods/clean", label: "Clean" },
      { href: "/methods/duplicate-low", label: "Duplicate (Low)" },
      { href: "/methods/duplicate-high", label: "Duplicate (High)" },
      { href: "/methods/split-no-standard", label: "Split, No Standard" },
      { href: "/methods/combined-high", label: "Combined (High)" },
    ],
  },
  "legacy-sdk": {
    title: "Legacy SDK",
    href: "/legacy-sdk",
    children: [
      { href: "/legacy-sdk/current", label: "Current" },
      { href: "/legacy-sdk/low", label: "Low" },
      { href: "/legacy-sdk/medium", label: "Medium" },
      { href: "/legacy-sdk/high", label: "High" },
      { href: "/legacy-sdk/mixed-floor", label: "Mixed Floor" },
    ],
  },
  untracked: {
    title: "Untracked",
    href: "/untracked",
    children: [
      { href: "/untracked/ratio-10", label: "Ratio 10" },
      { href: "/untracked/ratio-30", label: "Ratio 30" },
      { href: "/untracked/ratio-60", label: "Ratio 60" },
    ],
  },
  pageviews: {
    title: "Page Views",
    href: "/pageviews",
    children: [
      { href: "/pageviews/clean", label: "Clean" },
      { href: "/pageviews/missing-some", label: "Missing Some" },
      { href: "/pageviews/reused-value", label: "Reused Value" },
      { href: "/pageviews/proliferation-low", label: "Proliferation (Low)" },
      { href: "/pageviews/proliferation-high", label: "Proliferation (High)" },
      { href: "/pageviews/no-pageview-anywhere", label: "No Page View Anywhere" },
    ],
  },
  mechanics: {
    title: "Mechanics",
    href: "/mechanics",
    children: [
      { href: "/mechanics/spa", label: "SPA" },
      { href: "/mechanics/cookie-banner", label: "Cookie Banner" },
      { href: "/mechanics/mega-menu", label: "Mega Menu" },
      { href: "/mechanics/dangerous-buttons", label: "Dangerous Buttons" },
      { href: "/mechanics/infinite-scroll", label: "Infinite Scroll" },
      { href: "/mechanics/tabs-dropdowns-video", label: "Tabs, Dropdowns & Video" },
      { href: "/mechanics/login-wall", label: "Login Wall" },
      { href: "/mechanics/drift-redirect", label: "Drift Redirect" },
    ],
  },
};
