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
      getInstance: (instanceName?: string) => {
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

    // Two legacy amplitude-js builds loaded sequentially: amplitude-js is a single global
    // (window.amplitude), so the second script to load would otherwise replace the first's module
    // state before it could fire anything. Loading A, capturing its instance, and firing its
    // events BEFORE injecting B avoids that specific race.
    //
    // That alone isn't enough, though - confirmed by debugging directly against the deployed
    // page: even with correct sequencing, B's events were intermittently silently lost (no error
    // anywhere; getInstance()/init()/logEvent() all completed normally every single time, but the
    // network request never went out on some runs). Root cause, found by decompressing the actual
    // CDN bundle: getInstance() with no argument always resolves to the SAME default-named
    // instance, and amplitude-js derives its localStorage key for the unsent-event queue and
    // device/session cookie purely from `"_" + apiKey + instanceNameSuffix`
    // (`this._storageSuffix = "_" + apiKey + (instanceName === default ? "" : "_" + instanceName)`
    // in the bundle). With no instance name, A and B - same apiKey - write to the exact same
    // storage key, so B's init() can race A's own flush/clear of that key and lose events that
    // were logged correctly but never got a chance to be persisted before being wiped.
    // getInstance(instanceName) is real, supported API (confirmed in the bundle) that gives each
    // version its own storage key, the same isolation guarantee instanceName gives the modern SDK
    // elsewhere on this site - passing distinct names below is what actually fixes the race, not
    // just the load ordering.
    let cancelledA = false;
    let cancelledB = false;
    const scriptA = document.createElement("script");
    const scriptB = document.createElement("script");

    scriptA.src = LEGACY_SDK_URL_A;
    scriptA.async = true;
    scriptA.onload = () => {
      if (cancelledA || !window.amplitude) return;
      const legacyA = window.amplitude.getInstance("legacy_a_8_19_0");
      legacyA.init(API_KEY);
      legacyA.logEvent("legacy_report_generated", { report_type: "cohort" });
      legacyA.logEvent("legacy_report_shared", { share_method: "email" });

      // Only load B once A's instance has already fired, so A never gets clobbered mid-flight.
      scriptB.src = LEGACY_SDK_URL_B;
      scriptB.async = true;
      scriptB.onload = () => {
        if (cancelledB || !window.amplitude) return;
        const legacyB = window.amplitude.getInstance("legacy_b_8_21_9");
        legacyB.init(API_KEY);
        legacyB.logEvent("legacy_dashboard_pinned", { dashboard_id: "growth" });
        legacyB.logEvent("legacy_alert_configured", { alert_metric: "signup_rate" });
      };
      document.head.appendChild(scriptB);
    };
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
