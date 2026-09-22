"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";
import PageViewGroupNav from "../../../_components/PageViewGroupNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function Page() {
  useEffect(() => {
    if (!API_KEY) return;

    // Mints its own page-specific event name instead of firing the standard page-view event.
    // MemoryStorage + unique instanceName per page - see /pageviews/missing-some entry page for why.
    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
      instanceName: window.location.pathname,
      storageProvider: new MemoryStorage(),
    });
    instance.track("pricing_viewed", { url: window.location.pathname });
  }, []);

  return (
    <>
      <PageViewGroupNav group="proliferation-low" currentPage={2} totalPages={4} />
      <main className="page">
        <h1>Page Views — Proliferation (Low) — Page 2</h1>
        <p>Fires &quot;pricing_viewed&quot; instead of the standard page-view event.</p>
      </main>
    </>
  );
}
