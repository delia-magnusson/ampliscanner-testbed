"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function NamingCombinedHighPage() {
  useEffect(() => {
    if (!API_KEY) return;

    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
      instanceName: window.location.pathname,
      storageProvider: new MemoryStorage(),
    });

    // Dominant snake_case group (4 events), each carrying enough properties to remain the
    // majority style by key count despite being outnumbered by events below. Two of these also
    // carry a page-identifier concept key.
    instance.track("subscription_upgraded", {
      previous_plan_id: "starter",
      new_plan_id: "growth",
      upgrade_reason: "seat_limit",
      page_url: "/billing/upgrade",
    });
    instance.track("invoice_paid", {
      invoice_id: "inv_3391",
      payment_method_type: "card",
      amount_paid_usd: 129,
      page_location: "/billing/invoices",
    });
    instance.track("seat_added_to_team", {
      team_id: "team_88",
      seat_count: 12,
      added_by_role: "admin",
      billing_cycle: "monthly",
    });
    instance.track("trial_extended", {
      trial_id: "trial_204",
      extended_days: 14,
      extension_reason: "evaluation",
      requested_by_role: "owner",
    });

    // Deviating camelCase group (6 events, over 50%). Two of these use generic event names
    // ("click", "cta clicked") and also carry two more page-identifier concept key variants
    // (pageUrl, url), bringing the total concept-drift variant count to 4.
    instance.track("click", { pageUrl: "/dashboard", elementId: "cta-hero" });
    instance.track("cta clicked", { url: "/pricing", ctaLabel: "start_trial" });
    instance.track("bannerDismissed", { bannerId: "beta_ai", dismissReason: "not_interested" });
    instance.track("tooltipViewed", { tooltipId: "export_hint", tooltipContext: "dashboard" });
    instance.track("surveyAnswered", { surveyId: "nps_q3", answerValue: 9 });
    instance.track("themeToggled", { themeMode: "dark", toggledFrom: "settings" });
  }, []);

  return (
    <>
      <SectionNav section="naming" current="/naming/combined-high" />
      <main className="page">
        <h1>Naming — Combined (High)</h1>
        <p>
          Fires events on load that stack all three naming problems at once - over 50% mixed
          casing, 4 key variants for one concept, and 2 generic event names - to confirm the
          combined naming-hygiene score reaches HIGH.
        </p>
      </main>
    </>
  );
}
