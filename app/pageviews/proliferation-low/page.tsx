"use client";

import Link from "next/link";
import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function PageViewsProliferationLowEntryPage() {
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
    instance.track("Page Viewed", { url: window.location.pathname });
  }, []);

  return (
    <main className="page">
      <h1>Page Views — Proliferation (Low)</h1>
      <p>
        Entry page for a self-contained group of 5 pages. Pages 1 and 2 mint their own
        page-specific event names (&quot;home_viewed&quot;, &quot;pricing_viewed&quot;) instead of firing the
        standard page-view event; this entry plus pages 3 and 4 use the standard event
        correctly. 2 distinct page-specific names, each on exactly one page. Links only to its
        own 4 members, no link back to the Page Views section index or to the other groups, so a
        scan pointed at this page alone (Max pages 5) stays within this group.
      </p>
      <ul>
        <li>
          <Link href="/pageviews/proliferation-low/page-1">Page 1</Link>
        </li>
        <li>
          <Link href="/pageviews/proliferation-low/page-2">Page 2</Link>
        </li>
        <li>
          <Link href="/pageviews/proliferation-low/page-3">Page 3</Link>
        </li>
        <li>
          <Link href="/pageviews/proliferation-low/page-4">Page 4</Link>
        </li>
      </ul>
    </main>
  );
}
