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
    instance.track("testimonial_carousel_advanced", { slide_index: 2 });
  }, []);

  return (
    <>
      <PageViewGroupNav group="no-pageview-anywhere" currentPage={4} totalPages={4} />
      <main className="page">
        <h1>Page Views — No Page View Anywhere — Page 4</h1>
        <p>Fires an unrelated custom event; no page-view event of any kind.</p>
      </main>
    </>
  );
}
