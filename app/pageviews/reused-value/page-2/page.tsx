"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";
import PageViewGroupNav from "../../../_components/PageViewGroupNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function Page() {
  useEffect(() => {
    if (!API_KEY) return;

    // Copy-paste bug: hardcodes page-1's path instead of its own "/pageviews/reused-value/page-2".
    // MemoryStorage + unique instanceName per page - see /pageviews/missing-some entry page for why.
    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
      instanceName: window.location.pathname,
      storageProvider: new MemoryStorage(),
    });
    instance.track("Page Viewed", { url: "/pageviews/reused-value/page-1" });
  }, []);

  return (
    <>
      <PageViewGroupNav group="reused-value" currentPage={2} totalPages={4} />
      <main className="page">
        <h1>Page Views — Reused Value — Page 2</h1>
        <p>
          Fires the standard page-view event, but the URL/path value is stale - a copy-pasted
          value from page 1 rather than its own path.
        </p>
      </main>
    </>
  );
}
