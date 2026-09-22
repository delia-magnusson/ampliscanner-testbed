"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function NamingConceptFourPage() {
  useEffect(() => {
    if (!API_KEY) return;

    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
      instanceName: window.location.pathname,
      storageProvider: new MemoryStorage(),
    });

    // The same page-identifier concept sent under 5 different property key names: url, pageUrl,
    // page_url, page_location, plus page_URL - a deliberate pair with page_url that differs only
    // by acronym casing, to confirm that still counts as its own distinct variant.
    instance.track("checkout_step_viewed", { url: "/checkout/step-1", step_index: 1 });
    instance.track("cart_updated", { pageUrl: "/cart", item_count: 3 });
    instance.track("wishlist_viewed", { page_url: "/wishlist", item_count: 5 });
    instance.track("recommendation_shown", { page_location: "/product/123", recommendation_type: "similar_items" });
    instance.track("recommendation_clicked", { page_URL: "/product/123", recommendation_type: "similar_items" });
  }, []);

  return (
    <>
      <SectionNav section="naming" current="/naming/concept-4" />
      <main className="page">
        <h1>Naming — Concept Duplication (4+)</h1>
        <p>
          Fires events on load where the same page-identifier concept is sent under 5 different
          property key names, including a pair (<code>page_url</code> vs <code>page_URL</code>)
          that differs only by acronym casing, to exercise the concept-drift signal at HIGH
          severity.
        </p>
      </main>
    </>
  );
}
