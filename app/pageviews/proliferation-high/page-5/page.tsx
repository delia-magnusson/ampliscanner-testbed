"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";
import PageViewGroupNav from "../../../_components/PageViewGroupNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function Page() {
  useEffect(() => {
    if (!API_KEY) return;

    // MemoryStorage + unique instanceName per page - see /pageviews/missing-some entry page for why.
    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
      instanceName: window.location.pathname,
      storageProvider: new MemoryStorage(),
    });
    instance.track("faq_viewed", { url: window.location.pathname });
  }, []);

  return (
    <>
      <PageViewGroupNav group="proliferation-high" currentPage={5} totalPages={5} />
      <main className="page">
        <h1>Page Views — Proliferation (High) — Page 5</h1>
        <p>Fires &quot;faq_viewed&quot; instead of the standard page-view event.</p>
      </main>
    </>
  );
}
