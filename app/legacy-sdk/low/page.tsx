"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
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

export default function LegacySdkLowPage() {
  useEffect(() => {
    if (!API_KEY) return;

    // Current SDK: 8 of 10 events (isolated instance, autocapture off).
    const instance = createInstance();
    instance.init(API_KEY, { autocapture: false, defaultTracking: false });
    instance.track("cart_reviewed", { item_count: 3 });
    instance.track("checkout_initiated", { cart_id: "cart_11" });
    instance.track("address_confirmed", { country: "US" });
    instance.track("payment_selected", { payment_type: "card" });
    instance.track("order_placed", { order_id: "ord_11" });
    instance.track("receipt_viewed", { order_id: "ord_11" });
    instance.track("support_contacted", { channel: "chat" });
    instance.track("survey_opened", { survey_id: "csat_1" });

    // Legacy SDK: 2 of 10 events, ~20% - below the 30% MEDIUM threshold on the ratio alone, but
    // still expected to floor to MEDIUM since both SDKs are present at all (see /legacy-sdk/low's
    // page copy below). Loaded via a dynamically-injected <script> tag, isolated to just this
    // page - removed on unmount so it can never leak into a client-side navigation to a sibling
    // page, the same isolation guarantee createInstance() gives the current-SDK pages.
    let cancelled = false;
    const script = document.createElement("script");
    script.src = LEGACY_SDK_URL;
    script.async = true;
    script.onload = () => {
      if (cancelled || !window.amplitude) return;
      const legacy = window.amplitude.getInstance();
      legacy.init(API_KEY);
      legacy.logEvent("legacy_pageview_tracked", { page: "low" });
      legacy.logEvent("legacy_button_clicked", { button_id: "legacy_cta" });
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
      <SectionNav section="legacy-sdk" current="/legacy-sdk/low" />
      <main className="page">
        <h1>Legacy SDK — Low</h1>
        <p>
          Fires 10 custom events on load; 2 of them (20%) come from the legacy amplitude-js SDK,
          the rest from the current SDK. Below the 30% threshold on the ratio alone, but expect
          MEDIUM rather than LOW - AmpliScanner floors severity to MEDIUM whenever both the legacy
          and current SDK are observed sending events at all, with no minimum ratio or count.
        </p>
      </main>
    </>
  );
}
