"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";
import UntrackedGroupNav from "../../../_components/UntrackedGroupNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function Page() {
  useEffect(() => {
    if (!API_KEY) return;

    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
      instanceName: window.location.pathname,
      storageProvider: new MemoryStorage(),
    });
    instance.track("untracked_group_page_viewed", { group: "ratio-60", page: 10 });
  }, []);

  return (
    <>
      <UntrackedGroupNav group="ratio-60" currentPage={10} totalPages={10} />
      <main className="page">
        <h1>Ratio 60 — Page 10</h1>
        <p>One of 10 pages in this group; this one fires a tracking event on load.</p>
      </main>
    </>
  );
}
