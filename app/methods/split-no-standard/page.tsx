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

export default function MethodsSplitNoStandardPage() {
  useEffect(() => {
    if (!API_KEY) return;

    const instance = createInstance();
    instance.init(API_KEY, { autocapture: false, defaultTracking: false });

    // 5 event names fire through the SDK only - never duplicated by the GTM-style path.
    instance.track("document_created", { document_type: "spec" });
    instance.track("document_shared", { share_method: "link" });
    instance.track("document_archived", { archive_reason: "completed" });
    instance.track("template_applied", { template_id: "tmpl_9" });
    instance.track("export_started", { export_format: "pdf" });

    // 5 different event names fire through the GTM-style path only - never through the SDK.
    // Zero overlap with the SDK-only names above: no single event name uses both methods, so
    // this exercises the "split, no single standard" signal in isolation from duplication.
    sendViaGtmDataLayer("newsletter_subscribed", { list_id: "product-updates" });
    sendViaGtmDataLayer("webinar_registered", { webinar_id: "wb_14" });
    sendViaGtmDataLayer("survey_completed", { survey_id: "nps_q3" });
    sendViaGtmDataLayer("feedback_submitted", { rating: 4 });
    sendViaGtmDataLayer("demo_requested", { company_size: "50-200" });
  }, []);

  return (
    <>
      <SectionNav section="methods" current="/methods/split-no-standard" />
      <main className="page">
        <h1>Methods — Split, No Standard</h1>
        <p>
          Fires 10 custom events on load with zero duplication - 5 event names only through the
          SDK, 5 different event names only through a GTM-style delivery path - to exercise the
          &quot;split across delivery methods with no single standard&quot; signal on its own.
        </p>
      </main>
    </>
  );
}
