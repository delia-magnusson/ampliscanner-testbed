"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function NamingGenericOnePage() {
  useEffect(() => {
    if (!API_KEY) return;

    const instance = createInstance();
    instance.init(API_KEY, { autocapture: false, defaultTracking: false });

    // Exactly one generic, non-descriptive event name ("click"); the rest are specific.
    instance.track("click", { element_type: "button", element_label: "learn_more" });
    instance.track("pricing_tier_compared", { tier_a: "starter", tier_b: "growth" });
    instance.track("demo_video_played", { video_id: "product-tour", video_duration_sec: 92 });
    instance.track("changelog_entry_expanded", { entry_id: "v2-4-0", entry_category: "features" });
    instance.track("integration_connected", { integration_name: "slack", connected_workspace_count: 1 });
  }, []);

  return (
    <>
      <SectionNav section="naming" current="/naming/generic-1" />
      <main className="page">
        <h1>Naming — Generic Event Names (1)</h1>
        <p>
          Fires events on load where exactly one event is named something generic and
          non-descriptive (<code>click</code>), to exercise the generic-names signal at LOW
          severity.
        </p>
      </main>
    </>
  );
}
