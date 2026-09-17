"use client";

import { useState } from "react";
import SectionNav from "../../_components/SectionNav";

const SECTIONS = [
  {
    id: "overview",
    label: "Overview",
    path: "/mechanics/spa/overview",
    content: "This is the overview panel of the client-routed mini app.",
  },
  {
    id: "details",
    label: "Details",
    path: "/mechanics/spa/details",
    content: "This is the details panel, rendered without any page reload.",
  },
  {
    id: "settings",
    label: "Settings",
    path: "/mechanics/spa/settings",
    content: "This is the settings panel, still on the same document.",
  },
  {
    id: "help",
    label: "Help",
    path: "/mechanics/spa/help",
    content: "This is the help panel, reached only through history.pushState.",
  },
];

export default function SpaPage() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const active = SECTIONS.find((section) => section.id === activeId) ?? SECTIONS[0];

  function goTo(section: (typeof SECTIONS)[number]) {
    setActiveId(section.id);
    window.history.pushState({}, "", section.path);
  }

  return (
    <>
      <SectionNav section="mechanics" current="/mechanics/spa" />
      <main className="page">
        <h1>SPA Mechanics Test</h1>
        <p>
          A small client-side routed mini app. Each button below swaps the visible content via
          React state and pushes a new URL with <code>history.pushState</code>, with no real{" "}
          <code>&lt;a href&gt;</code> anywhere and no full page reload.
        </p>
        <nav className="button-row">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => goTo(section)}
              aria-current={section.id === activeId}
            >
              {section.label}
            </button>
          ))}
        </nav>
        <section>
          <h2>{active.label}</h2>
          <p>{active.content}</p>
        </section>
      </main>
    </>
  );
}
