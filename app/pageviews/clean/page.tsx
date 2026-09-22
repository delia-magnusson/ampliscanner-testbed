"use client";

import Link from "next/link";
import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function PageViewsCleanEntryPage() {
  useEffect(() => {
    if (!API_KEY) return;

    // Entry page counts as one of the group's 5 pages, so it fires the same standard page-view
    // event as every member, with its own real path as the value - a clean baseline where all
    // PAGE_VIEW_COVERAGE, PAGE_VIEW_VALUE_REUSE and PAGE_VIEW_NAMING_PROLIFERATION sub-checks stay clear.
    const instance = createInstance();
    instance.init(API_KEY, { autocapture: false, defaultTracking: false });
    instance.track("Page Viewed", { url: window.location.pathname });
  }, []);

  return (
    <main className="page">
      <h1>Page Views — Clean</h1>
      <p>
        Entry page for a self-contained group of 5 pages, each firing one standard page-view
        event with a genuinely distinct URL/path value matching its own route. Links only to its
        own 4 members - no link back to the Page Views section index or to the other groups - so
        a scan pointed at this page alone (Max pages 5) stays within this group.
      </p>
      <ul>
        <li>
          <Link href="/pageviews/clean/page-1">Page 1</Link>
        </li>
        <li>
          <Link href="/pageviews/clean/page-2">Page 2</Link>
        </li>
        <li>
          <Link href="/pageviews/clean/page-3">Page 3</Link>
        </li>
        <li>
          <Link href="/pageviews/clean/page-4">Page 4</Link>
        </li>
      </ul>
    </main>
  );
}
