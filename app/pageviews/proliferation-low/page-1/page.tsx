"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import PageViewGroupNav from "../../../_components/PageViewGroupNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function Page() {
  useEffect(() => {
    if (!API_KEY) return;

    // Mints its own page-specific event name instead of firing the standard page-view event.
    const instance = createInstance();
    instance.init(API_KEY, { autocapture: false, defaultTracking: false });
    instance.track("home_viewed", { url: window.location.pathname });
  }, []);

  return (
    <>
      <PageViewGroupNav group="proliferation-low" currentPage={1} totalPages={4} />
      <main className="page">
        <h1>Page Views — Proliferation (Low) — Page 1</h1>
        <p>Fires &quot;home_viewed&quot; instead of the standard page-view event.</p>
      </main>
    </>
  );
}
