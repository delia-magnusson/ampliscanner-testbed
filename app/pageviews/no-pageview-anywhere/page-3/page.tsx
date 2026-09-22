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
    instance.track("video_played", { video_id: "product-tour" });
  }, []);

  return (
    <>
      <PageViewGroupNav group="no-pageview-anywhere" currentPage={3} totalPages={4} />
      <main className="page">
        <h1>Page Views — No Page View Anywhere — Page 3</h1>
        <p>Fires an unrelated custom event; no page-view event of any kind.</p>
      </main>
    </>
  );
}
