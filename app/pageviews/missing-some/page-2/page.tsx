"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import PageViewGroupNav from "../../../_components/PageViewGroupNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function Page() {
  useEffect(() => {
    if (!API_KEY) return;

    const instance = createInstance();
    instance.init(API_KEY, { autocapture: false, defaultTracking: false });
    instance.track("Page Viewed", { url: window.location.pathname });
  }, []);

  return (
    <>
      <PageViewGroupNav group="missing-some" currentPage={2} totalPages={4} />
      <main className="page">
        <h1>Page Views — Missing Some — Page 2</h1>
        <p>Fires the standard page-view event with this page&apos;s own path as the value.</p>
      </main>
    </>
  );
}
