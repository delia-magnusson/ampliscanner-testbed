"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function NamingCleanPage() {
  useEffect(() => {
    if (!API_KEY) return;

    // Isolated instance, autocapture off, all 5 events fire once on mount so
    // this page's naming-hygiene signals are deterministic regardless of any
    // crawler click/interaction behaviour.
    const instance = createInstance();
    instance.init(API_KEY, { autocapture: false, defaultTracking: false });

    instance.track("pricing_plan_selected", { plan_id: "pro_monthly", plan_price_usd: 49 });
    instance.track("onboarding_step_completed", { step_name: "connect_data_source", step_number: 2 });
    instance.track("invite_teammate_sent", { invite_email_domain: "example.test", team_size: 4 });
    instance.track("dashboard_widget_added", { widget_type: "funnel_chart", dashboard_id: "main" });
    instance.track("export_report_requested", { report_format: "csv", report_range_days: 30 });
  }, []);

  return (
    <>
      <SectionNav section="naming" current="/naming/clean" />
      <main className="page">
        <h1>Naming — Clean</h1>
        <p>
          Fires 5 distinct, specifically-named custom events on load, all using snake_case
          property keys consistently, as a naming-hygiene baseline.
        </p>
      </main>
    </>
  );
}
