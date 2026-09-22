"use client";

import Link from "next/link";
import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function PageViewsProliferationHighEntryPage() {
  useEffect(() => {
    if (!API_KEY) return;

    // Mints its own page-specific event name like every other page in this group - no page here
    // fires the standard page-view event at all, reproducing the holded.com pattern.
    const instance = createInstance();
    instance.init(API_KEY, { autocapture: false, defaultTracking: false });
    instance.track("home_viewed", { url: window.location.pathname });
  }, []);

  return (
    <main className="page">
      <h1>Page Views — Proliferation (High)</h1>
      <p>
        Entry page for a self-contained group of 6 pages. Every page, including this one, mints
        its own page-specific event name (&quot;home_viewed&quot;, &quot;pricing_viewed&quot;, &quot;features_viewed&quot;,
        &quot;about_viewed&quot;, &quot;contact_viewed&quot;, &quot;faq_viewed&quot;) instead of firing one standard page-view
        event - 6 distinct page-specific names, each on exactly one page, and zero pages firing
        the recognized standard event. Links only to its own 5 members, no link back to the Page
        Views section index or to the other groups, so a scan pointed at this page alone (Max
        pages 6) stays within this group.
      </p>
      <ul>
        <li>
          <Link href="/pageviews/proliferation-high/page-1">Page 1</Link>
        </li>
        <li>
          <Link href="/pageviews/proliferation-high/page-2">Page 2</Link>
        </li>
        <li>
          <Link href="/pageviews/proliferation-high/page-3">Page 3</Link>
        </li>
        <li>
          <Link href="/pageviews/proliferation-high/page-4">Page 4</Link>
        </li>
        <li>
          <Link href="/pageviews/proliferation-high/page-5">Page 5</Link>
        </li>
      </ul>
    </main>
  );
}
