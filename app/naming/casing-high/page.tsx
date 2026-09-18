"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function NamingCasingHighPage() {
  useEffect(() => {
    if (!API_KEY) return;

    const instance = createInstance();
    instance.init(API_KEY, { autocapture: false, defaultTracking: false });

    // 4 events using snake_case, with enough properties each that snake_case still carries the
    // most distinct keys overall (and so stays the "dominant" style) despite being outnumbered
    // by events below.
    instance.track("subscription_upgraded", {
      previous_plan_id: "starter",
      new_plan_id: "growth",
      upgrade_reason: "seat_limit",
      monthly_price_usd: 129,
    });
    instance.track("invoice_paid", {
      invoice_id: "inv_3391",
      payment_method_type: "card",
      amount_paid_usd: 129,
      paid_at_iso: "2026-09-01",
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

    // 6 events using camelCase (over 50% of the 10 events), each with fewer properties -
    // fewer keys per event, but a numeric majority of the events themselves.
    instance.track("bannerDismissed", { bannerId: "beta_ai", dismissReason: "not_interested" });
    instance.track("tooltipViewed", { tooltipId: "export_hint", tooltipContext: "dashboard" });
    instance.track("surveyAnswered", { surveyId: "nps_q3", answerValue: 9 });
    instance.track("themeToggled", { themeMode: "dark", toggledFrom: "settings" });
    instance.track("shortcutUsed", { shortcutKey: "cmd_k", shortcutAction: "search" });
    instance.track("filterApplied", { filterField: "status", filterValue: "active" });
  }, []);

  return (
    <>
      <SectionNav section="naming" current="/naming/casing-high" />
      <main className="page">
        <h1>Naming — Casing (High)</h1>
        <p>
          Fires 10 custom events on load; 6 of them (over 50%) use camelCase property keys
          against a snake_case majority, to exercise the key-casing signal at HIGH severity.
        </p>
      </main>
    </>
  );
}
