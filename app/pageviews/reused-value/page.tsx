"use client";

import Link from "next/link";
import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function PageViewsReusedValueEntryPage() {
  useEffect(() => {
    if (!API_KEY) return;

    const instance = createInstance();
    instance.init(API_KEY, { autocapture: false, defaultTracking: false });
    instance.track("Page Viewed", { url: window.location.pathname });
  }, []);

  return (
    <main className="page">
      <h1>Page Views — Reused Value</h1>
      <p>
        Entry page for a self-contained group of 5 pages. The standard page-view event fires on
        every page, but pages 1 and 2 carry the identical, copy-pasted URL/path value instead of
        each reflecting its own route - a single reused value across 2 pages. Links only to its
        own 4 members, no link back to the Page Views section index or to the other groups, so a
        scan pointed at this page alone (Max pages 5) stays within this group.
      </p>
      <ul>
        <li>
          <Link href="/pageviews/reused-value/page-1">Page 1</Link>
        </li>
        <li>
          <Link href="/pageviews/reused-value/page-2">Page 2</Link>
        </li>
        <li>
          <Link href="/pageviews/reused-value/page-3">Page 3</Link>
        </li>
        <li>
          <Link href="/pageviews/reused-value/page-4">Page 4</Link>
        </li>
      </ul>
    </main>
  );
}
