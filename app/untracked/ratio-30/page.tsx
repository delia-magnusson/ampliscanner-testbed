"use client";

import Link from "next/link";
import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function Ratio30EntryPage() {
  useEffect(() => {
    if (!API_KEY) return;

    // Fires its own event so this entry page counts as "tracked" for UNTRACKED_AREAS, not an
    // extra silent page - keeps the group's intended silent-page ratio exact when a scan visits
    // all 11 pages (this entry plus its 10 members).
    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
      instanceName: window.location.pathname,
      storageProvider: new MemoryStorage(),
    });
    instance.track("untracked_group_entry_viewed", { group: "ratio-30" });
  }, []);

  return (
    <main className="page">
      <h1>Untracked — Ratio 30</h1>
      <p>
        Entry page for a self-contained group of 10 pages (7 tracked, 3 silent)
        used to test UNTRACKED_AREAS at roughly a ~30% silent-page ratio. Links only to
        its own 10 members - no link back to the Untracked section index or to the other groups -
        so a scan pointed at this page alone (Max pages 11) stays within this group.
      </p>
      <ul>
        <li>
          <Link href="/untracked/ratio-30/page-1">Page 1</Link>
        </li>
        <li>
          <Link href="/untracked/ratio-30/page-2">Page 2</Link>
        </li>
        <li>
          <Link href="/untracked/ratio-30/page-3">Page 3</Link>
        </li>
        <li>
          <Link href="/untracked/ratio-30/page-4">Page 4</Link>
        </li>
        <li>
          <Link href="/untracked/ratio-30/page-5">Page 5</Link>
        </li>
        <li>
          <Link href="/untracked/ratio-30/page-6">Page 6</Link>
        </li>
        <li>
          <Link href="/untracked/ratio-30/page-7">Page 7</Link>
        </li>
        <li>
          <Link href="/untracked/ratio-30/page-8">Page 8</Link>
        </li>
        <li>
          <Link href="/untracked/ratio-30/page-9">Page 9</Link>
        </li>
        <li>
          <Link href="/untracked/ratio-30/page-10">Page 10</Link>
        </li>
      </ul>
    </main>
  );
}
