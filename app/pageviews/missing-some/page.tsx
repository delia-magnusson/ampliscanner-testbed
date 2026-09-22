"use client";

import Link from "next/link";
import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function PageViewsMissingSomeEntryPage() {
  useEffect(() => {
    if (!API_KEY) return;

    // storageProvider: MemoryStorage() keeps the unsent-event retry queue in this instance's own
    // memory instead of the SDK's default localStorage-backed queue, whose key is derived from
    // the API key alone (see getStorageKey() in @amplitude/analytics-core) - NOT the instanceName
    // below. Under client-side <Link> navigation (no full reload), that shared localStorage queue
    // lets an undelivered event from the *previous* page's instance get picked up and re-flushed
    // by this page's instance, misattributing a stale event (and its stale url value) to a page
    // that never fired it. instanceName still isolates identity/session state per page.
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
      <h1>Page Views — Missing Some</h1>
      <p>
        Entry page for a self-contained group of 5 pages. The standard page-view event fires on
        4 of the 5 (this entry plus pages 1-3) and is completely absent on page 4, which fires an
        unrelated custom event instead - a 1-of-5 (20%) coverage gap, below the 50% threshold.
        Links only to its own 4 members, no link back to the Page Views section index or to the
        other groups, so a scan pointed at this page alone (Max pages 5) stays within this group.
      </p>
      <ul>
        <li>
          <Link href="/pageviews/missing-some/page-1">Page 1</Link>
        </li>
        <li>
          <Link href="/pageviews/missing-some/page-2">Page 2</Link>
        </li>
        <li>
          <Link href="/pageviews/missing-some/page-3">Page 3</Link>
        </li>
        <li>
          <Link href="/pageviews/missing-some/page-4">Page 4</Link>
        </li>
      </ul>
    </main>
  );
}
