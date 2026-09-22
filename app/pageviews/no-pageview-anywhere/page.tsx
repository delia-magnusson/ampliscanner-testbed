"use client";

import Link from "next/link";
import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function PageViewsNoPageviewAnywhereEntryPage() {
  useEffect(() => {
    if (!API_KEY) return;

    // Fires an unrelated custom event so this page isn't confused with UNTRACKED_AREAS - it's
    // "tracked", just never with anything matching the recognized page-view pattern, and never
    // with a name shaped like the naming-proliferation pattern (no "_viewed"/"_page" suffix).
    const instance = createInstance();
    instance.init(API_KEY, { autocapture: false, defaultTracking: false });
    instance.track("hero_cta_clicked", { cta_label: "Get started" });
  }, []);

  return (
    <main className="page">
      <h1>Page Views — No Page View Anywhere</h1>
      <p>
        Entry page for a self-contained group of 5 pages. Every page, including this one, fires
        some other custom event on load, but none of them fire anything matching the recognized
        page-view pattern - the extreme case where PAGE_VIEW_COVERAGE has zero pages to work with.
        Links only to its own 4 members, no link back to the Page Views section index or to the
        other groups, so a scan pointed at this page alone (Max pages 5) stays within this group.
      </p>
      <ul>
        <li>
          <Link href="/pageviews/no-pageview-anywhere/page-1">Page 1</Link>
        </li>
        <li>
          <Link href="/pageviews/no-pageview-anywhere/page-2">Page 2</Link>
        </li>
        <li>
          <Link href="/pageviews/no-pageview-anywhere/page-3">Page 3</Link>
        </li>
        <li>
          <Link href="/pageviews/no-pageview-anywhere/page-4">Page 4</Link>
        </li>
      </ul>
    </main>
  );
}
