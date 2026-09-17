"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function AutocaptureOnlyPage() {
  useEffect(() => {
    if (!API_KEY) return;

    // Isolated instance so this page's config can never leak into the
    // no-autocapture page (or vice versa) if both load in the same session.
    const instance = createInstance();
    instance.init(API_KEY, {
      // Both options are set explicitly (rather than relying on SDK
      // defaults) so this page's behaviour doesn't drift if the org's
      // remote autocapture config changes: defaultTracking still governs
      // page view/session capture independently of autocapture in this
      // SDK version unless remote config overrides it.
      autocapture: true,
      defaultTracking: true,
    });

    // Deliberately no instance.track() calls anywhere on this page: only
    // Amplitude's default autocapture (page views, sessions, clicks) fires.
  }, []);

  return (
    <main className="page">
      <h1>No Tracking — Autocapture Only</h1>
      <p>
        This page initialises Amplitude with default autocapture (page views, sessions, and
        clicks) and fires zero custom <code>track()</code> calls anywhere on the page, exercising
        the scanner&apos;s AUTOCAPTURE_ONLY finding.
      </p>
    </main>
  );
}
