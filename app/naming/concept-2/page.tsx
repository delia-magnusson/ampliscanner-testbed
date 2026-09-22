"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function NamingConceptTwoPage() {
  useEffect(() => {
    if (!API_KEY) return;

    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
      instanceName: window.location.pathname,
      storageProvider: new MemoryStorage(),
    });

    // The same page-identifier concept sent under exactly 2 different property key names:
    // `page_url` on some events, `pageUrl` on others.
    instance.track("feature_spotlight_shown", { page_url: "/dashboard", spotlight_id: "new_export_button" });
    instance.track("help_article_opened", { page_url: "/settings/billing", article_id: "faq-refunds" });
    instance.track("inline_survey_shown", { pageUrl: "/dashboard", survey_id: "nps_q3" });
    instance.track("beta_banner_dismissed", { pageUrl: "/reports", banner_id: "beta_ai_summary" });
  }, []);

  return (
    <>
      <SectionNav section="naming" current="/naming/concept-2" />
      <main className="page">
        <h1>Naming — Concept Duplication (2)</h1>
        <p>
          Fires events on load where the same page-identifier concept is sent under exactly 2
          different property key names (<code>page_url</code> and <code>pageUrl</code>), to
          exercise the concept-drift signal at MEDIUM severity.
        </p>
      </main>
    </>
  );
}
