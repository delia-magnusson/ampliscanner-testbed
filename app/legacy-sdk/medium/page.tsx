"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
const LEGACY_SDK_URL = "https://cdn.amplitude.com/libs/amplitude-8.21.9-min.gz.js";

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

export default function LegacySdkMediumPage() {
  useEffect(() => {
    if (!API_KEY) return;

    // Current SDK: 6 of 10 events.
    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
      instanceName: window.location.pathname,
      storageProvider: new MemoryStorage(),
    });
    instance.track("plan_compared", { plans_compared: 2 });
    instance.track("billing_updated_view", { billing_section: "payment_method" });
    instance.track("seat_management_opened", { seat_count: 8 });
    instance.track("usage_report_viewed", { report_range_days: 30 });
    instance.track("api_key_created", { key_scope: "read_only" });
    instance.track("webhook_configured", { webhook_event: "user.created" });

    // Legacy SDK: 4 of 10 events, 40% - squarely in the 30-69% MEDIUM band on the ratio itself
    // (not relying on the dual-SDK floor to explain the severity, unlike /legacy-sdk/low).
    let cancelled = false;
    const script = document.createElement("script");
    script.src = LEGACY_SDK_URL;
    script.async = true;
    script.onload = () => {
      if (cancelled || !window.amplitude) return;
      const legacy = window.amplitude.getInstance();
      legacy.init(API_KEY);
      legacy.logEvent("legacy_signup_started", { plan_id: "growth" });
      legacy.logEvent("legacy_signup_completed", { plan_id: "growth" });
      legacy.logEvent("legacy_trial_activated", { trial_days: 14 });
      legacy.logEvent("legacy_upgrade_clicked", { new_plan_id: "scale" });
    };
    document.head.appendChild(script);

    return () => {
      cancelled = true;
      document.head.removeChild(script);
      delete window.amplitude;
    };
  }, []);

  return (
    <>
      <SectionNav section="legacy-sdk" current="/legacy-sdk/medium" />
      <main className="page">
        <h1>Legacy SDK — Medium</h1>
        <p>
          Fires 10 custom events on load; 4 of them (40%) come from the legacy amplitude-js SDK,
          the rest from the current SDK - in the 30-69% band, so MEDIUM here is driven by the
          ratio itself, not just the dual-SDK floor.
        </p>
      </main>
    </>
  );
}
