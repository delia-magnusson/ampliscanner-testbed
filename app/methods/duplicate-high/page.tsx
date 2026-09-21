"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

// See /methods/duplicate-low for why this - not window.dataLayer - is what actually drives the
// scanner's DATALAYER_GTM classification (the request's own `library` field).
function sendViaGtmDataLayer(eventType: string, eventProperties: Record<string, unknown>) {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: eventType, ...eventProperties });

  if (!API_KEY) return;
  fetch("https://api2.amplitude.com/2/httpapi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: API_KEY,
      events: [{ event_type: eventType, event_properties: eventProperties, library: "amplitude-gtm/1.0.0" }],
    }),
  }).catch(() => {});
}

export default function MethodsDuplicateHighPage() {
  useEffect(() => {
    if (!API_KEY) return;

    const instance = createInstance();
    instance.init(API_KEY, { autocapture: false, defaultTracking: false });

    // 6 of 10 event names fire through BOTH the SDK and the GTM-style delivery path (over 50%).
    const duplicated: [string, Record<string, unknown>][] = [
      ["signup_started", { plan_id: "growth" }],
      ["signup_completed", { plan_id: "growth" }],
      ["trial_started", { trial_days: 14 }],
      ["trial_converted", { plan_id: "growth" }],
      ["plan_upgraded", { new_plan_id: "scale" }],
      ["seat_added", { seat_count: 5 }],
    ];
    duplicated.forEach(([name, props]) => {
      instance.track(name, props);
      sendViaGtmDataLayer(name, props);
    });

    // 4 of 10 event names fire through the SDK only.
    instance.track("profile_updated", { field_changed: "display_name" });
    instance.track("avatar_changed", { source: "upload" });
    instance.track("password_reset_requested", { via: "email" });
    instance.track("two_factor_enabled", { method: "totp" });
  }, []);

  return (
    <>
      <SectionNav section="methods" current="/methods/duplicate-high" />
      <main className="page">
        <h1>Methods — Duplicate (High)</h1>
        <p>
          Fires 10 custom events on load; 6 of them (over 50%) fire through both the SDK and a
          GTM-style delivery path under the same event name, to exercise the duplicate-tracking
          signal at or above the 50% threshold.
        </p>
      </main>
    </>
  );
}
