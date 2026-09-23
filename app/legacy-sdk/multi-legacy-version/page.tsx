"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
const LEGACY_SDK_URL_A = "https://cdn.amplitude.com/libs/amplitude-8.19.0-min.gz.js";
const LEGACY_SDK_URL_B = "https://cdn.amplitude.com/libs/amplitude-8.21.9-min.gz.js";

declare global {
  interface Window {
    amplitude?: {
      getInstance: () => {
        init: (apiKey: string) => void;
        logEvent: (eventType: string, eventProperties?: Record<string, unknown>) => void;
      };
    };
  }
}

export default function LegacySdkMultiVersionPage() {
  useEffect(() => {
    if (!API_KEY) return;

    // Current SDK: 6 of 10 events (isolated instance, autocapture off) - same 40% legacy ratio as
    // /legacy-sdk/medium, but that legacy share is now split across two distinct pinned versions
    // instead of one.
    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
      instanceName: window.location.pathname,
      storageProvider: new MemoryStorage(),
    });
    instance.track("analytics_dashboard_opened", { dashboard_id: "growth" });
    instance.track("chart_type_changed", { chart_type: "funnel" });
    instance.track("date_range_changed", { range_days: 7 });
    instance.track("insight_bookmarked", { insight_id: "ins_44" });
    instance.track("team_member_invited", { role: "analyst" });
    instance.track("export_scheduled", { cadence: "weekly" });

    // Two legacy amplitude-js builds loaded sequentially, not in parallel: amplitude-js is a
    // single global (window.amplitude), so the second script to load would silently clobber the
    // first before its instance could fire anything. Loading A, capturing its instance reference,
    // and firing its events BEFORE injecting B guarantees both versions' events actually go out
    // under their own version - each script still self-reports its own real, compiled-in version
    // string in every event's "library" field (verified against the actual CDN builds: 8.19.0 and
    // 8.21.9), so nothing about the version label is faked here, only the load order is managed.
    let cancelledA = false;
    let cancelledB = false;
    const scriptA = document.createElement("script");
    const scriptB = document.createElement("script");

    scriptA.src = LEGACY_SDK_URL_A;
    scriptA.async = true;
    scriptA.onload = () => {
      console.log("[debug] A onload fired", { cancelledA, hasAmplitude: !!window.amplitude });
      if (cancelledA || !window.amplitude) return;
      const legacyA = window.amplitude.getInstance();
      legacyA.init(API_KEY);
      legacyA.logEvent("legacy_report_generated", { report_type: "cohort" });
      legacyA.logEvent("legacy_report_shared", { share_method: "email" });
      console.log("[debug] A init + logEvent calls made");

      // Only load B once A's instance has already fired, so A never gets clobbered mid-flight.
      scriptB.src = LEGACY_SDK_URL_B;
      scriptB.async = true;
      scriptB.onload = () => {
        console.log("[debug] B onload fired", { cancelledB, hasAmplitude: !!window.amplitude });
        if (cancelledB || !window.amplitude) return;
        const legacyB = window.amplitude.getInstance();
        console.log("[debug] B getInstance() returned", legacyB);
        legacyB.init(API_KEY);
        console.log("[debug] B init() called");
        legacyB.logEvent("legacy_dashboard_pinned", { dashboard_id: "growth" });
        legacyB.logEvent("legacy_alert_configured", { alert_metric: "signup_rate" });
        console.log("[debug] B logEvent calls made");
      };
      scriptB.onerror = (e) => console.log("[debug] B script onerror", e);
      document.head.appendChild(scriptB);
      console.log("[debug] B script tag appended", scriptB.src);
    };
    scriptA.onerror = (e) => console.log("[debug] A script onerror", e);
    document.head.appendChild(scriptA);

    return () => {
      cancelledA = true;
      cancelledB = true;
      if (scriptA.parentNode) document.head.removeChild(scriptA);
      if (scriptB.parentNode) document.head.removeChild(scriptB);
      delete window.amplitude;
    };
  }, []);

  return (
    <>
      <SectionNav section="legacy-sdk" current="/legacy-sdk/multi-legacy-version" />
      <main className="page">
        <h1>Legacy SDK — Multi Legacy Version</h1>
        <p>
          Fires 10 custom events on load: 6 through the current SDK, 2 through legacy amplitude-js{" "}
          <code>8.19.0</code>, and 2 through legacy amplitude-js <code>8.21.9</code> - the same 40%
          legacy ratio as Medium, but split across two distinct pinned legacy versions loaded on
          the same page instead of one, to exercise the &quot;multiple legacy SDK versions&quot;
          signal alongside the ratio-based severity.
        </p>
      </main>
    </>
  );
}
