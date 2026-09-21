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

export default function MethodsCombinedHighPage() {
  useEffect(() => {
    if (!API_KEY) return;

    const instance = createInstance();
    instance.init(API_KEY, { autocapture: false, defaultTracking: false });

    // 6 of 10 event names fire through BOTH delivery paths (over 50% duplication).
    const duplicated: [string, Record<string, unknown>][] = [
      ["invoice_paid", { invoice_id: "inv_901" }],
      ["subscription_renewed", { plan_id: "scale" }],
      ["plan_downgraded", { new_plan_id: "growth" }],
      ["team_invited", { invitee_role: "member" }],
      ["workspace_archived", { workspace_id: "ws_9" }],
      ["billing_updated", { payment_method: "card" }],
    ];
    duplicated.forEach(([name, props]) => {
      instance.track(name, props);
      sendViaGtmDataLayer(name, props);
    });

    // 2 event names fire through the SDK only.
    instance.track("dashboard_customized", { widget_count: 4 });
    instance.track("widget_removed", { widget_type: "funnel_chart" });

    // 2 different event names fire through the GTM-style path only.
    sendViaGtmDataLayer("pricing_page_viewed_custom", { plan_focus: "scale" });
    sendViaGtmDataLayer("contact_sales_clicked", { source: "pricing_page" });
  }, []);

  return (
    <>
      <SectionNav section="methods" current="/methods/combined-high" />
      <main className="page">
        <h1>Methods — Combined (High)</h1>
        <p>
          Fires 10 custom events on load that stack both tracking-method problems at once - over
          50% duplicated across both delivery paths, plus additional event names that only ever
          use one path or the other - to confirm the combined tracking-method score reaches HIGH.
        </p>
      </main>
    </>
  );
}
