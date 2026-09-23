"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function NamingConceptDomainHrefPage() {
  useEffect(() => {
    if (!API_KEY) return;

    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
      instanceName: window.location.pathname,
      storageProvider: new MemoryStorage(),
    });

    // Real page-identifier concept, sent under 2 different property key names (same pattern as
    // /naming/concept-2): url and page_location.
    instance.track("pricing_hero_viewed", { url: "/pricing", plan_tier: "pro" });
    instance.track("onboarding_tour_completed", { page_location: "/onboarding", step_count: 4 });

    // domain and href are related to "the current page's URL" in spirit, but deliberately hold
    // different data: domain is just the host (not the full path), and href is the target of
    // whatever link was clicked, not the current page. This should NOT be folded into the same
    // concept-duplication group as the events above - it's testing that the exclusion holds even
    // when both kinds of event are present in the same scan.
    instance.track("outbound_link_clicked", { href: "https://docs.example.test/api", link_text: "API docs" });
    instance.track("referrer_domain_logged", { domain: "example.test", session_count: 2 });
  }, []);

  return (
    <>
      <SectionNav section="naming" current="/naming/concept-domain-href" />
      <main className="page">
        <h1>Naming — Concept (Domain/Href Excluded)</h1>
        <p>
          Fires the same 2-variant page-identifier drift as Concept Duplication (2) (
          <code>url</code> and <code>page_location</code>), plus two unrelated events using{" "}
          <code>href</code> and <code>domain</code> - properties that describe a URL-ish concept
          but hold different data (a link target, and just a host) and so should stay out of the
          concept-duplication grouping entirely, even sitting alongside real page-identifier
          drift in the same scan.
        </p>
      </main>
    </>
  );
}
