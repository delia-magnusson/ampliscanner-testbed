"use client";

import { useState } from "react";
import SectionNav from "../../_components/SectionNav";

const TABS = [
  { id: "tab-1", label: "Tab One", content: "Content for tab one." },
  { id: "tab-2", label: "Tab Two", content: "Content for tab two." },
  { id: "tab-3", label: "Tab Three", content: "Content for tab three." },
];

export default function TabsDropdownsVideoPage() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const current = TABS.find((tab) => tab.id === activeTab) ?? TABS[0];

  return (
    <>
      <SectionNav section="mechanics" current="/mechanics/tabs-dropdowns-video" />
      <main className="page">
        <h1>Tabs, Dropdown &amp; Video Mechanics Test</h1>
        <p>
          Combines a tab strip, a dropdown menu, and an embedded HTML5 video with controls, all on
          one page.
        </p>

        <section className="block">
          <div role="tablist" aria-label="Demo tabs" className="button-row">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={tab.id === activeTab}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div role="tabpanel">{current.content}</div>
        </section>

        <section className="block dropdown">
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            Options
          </button>
          {menuOpen && (
            <ul className="dropdown-menu">
              <li>Setting A</li>
              <li>Setting B</li>
              <li>Setting C</li>
            </ul>
          )}
        </section>

        <section className="block">
          <video
            controls
            width={480}
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
          >
            Your browser does not support the video tag.
          </video>
        </section>
      </main>
    </>
  );
}
