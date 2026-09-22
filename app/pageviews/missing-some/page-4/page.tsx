"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";
import PageViewGroupNav from "../../../_components/PageViewGroupNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function Page() {
  useEffect(() => {
    if (!API_KEY) return;

    // Deliberately fires no page-view event at all, only an unrelated custom event - this is the
    // one gap in the group's 5-page coverage (1 of 5 = 20%, below the 50% MEDIUM threshold).
    // MemoryStorage + unique instanceName per page - see /pageviews/missing-some entry page for why.
    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
      instanceName: window.location.pathname,
      storageProvider: new MemoryStorage(),
    });
    instance.track("newsletter_signup_clicked", { placement: "footer" });
  }, []);

  return (
    <>
      <PageViewGroupNav group="missing-some" currentPage={4} totalPages={4} />
      <main className="page">
        <h1>Page Views — Missing Some — Page 4</h1>
        <p>
          Fires an unrelated custom event on load, but no page-view event of any kind - the
          coverage gap this group exists to test.
        </p>
      </main>
    </>
  );
}
