"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

// Sends an event the way Amplitude's own GTM tag template actually would: a direct httpapi call
// carrying its own `library` identifier, not a call through the browser SDK. This - not
// window.dataLayer - is what the scanner's classifyTrackingMethod() keys off (a "gtm" substring
// in the request's `library` field), so the dataLayer.push() below is cosmetic realism only.
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

export default function MethodsDuplicateLowPage() {
  useEffect(() => {
    if (!API_KEY) return;

    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
      instanceName: window.location.pathname,
      storageProvider: new MemoryStorage(),
    });

    // 3 of 10 event names fire through BOTH the SDK and the GTM-style delivery path (under 50%).
    const duplicated: [string, Record<string, unknown>][] = [
      ["checkout_started", { cart_id: "cart_501" }],
      ["payment_submitted", { payment_type: "card" }],
      ["order_completed", { order_id: "ord_501" }],
    ];
    duplicated.forEach(([name, props]) => {
      instance.track(name, props);
      sendViaGtmDataLayer(name, props);
    });

    // 7 of 10 event names fire through the SDK only.
    instance.track("cart_viewed", { cart_id: "cart_501" });
    instance.track("product_favorited", { product_id: "sku_77" });
    instance.track("coupon_applied", { coupon_code: "SAVE10" });
    instance.track("shipping_selected", { shipping_method: "standard" });
    instance.track("invoice_downloaded", { invoice_id: "inv_501" });
    instance.track("subscription_paused", { pause_reason: "cost" });
    instance.track("referral_sent", { referral_channel: "email" });
  }, []);

  return (
    <>
      <SectionNav section="methods" current="/methods/duplicate-low" />
      <main className="page">
        <h1>Methods — Duplicate (Low)</h1>
        <p>
          Fires 10 custom events on load; 3 of them (under 50%) fire through both the SDK and a
          GTM-style delivery path under the same event name, to exercise the duplicate-tracking
          signal below the 50% threshold.
        </p>
      </main>
    </>
  );
}
