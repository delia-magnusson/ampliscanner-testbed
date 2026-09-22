"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function NamingUnreadablePage() {
  useEffect(() => {
    if (!API_KEY) return;

    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
      instanceName: window.location.pathname,
      storageProvider: new MemoryStorage(),
    });

    // Isolates the readability signal: every event name is specific (no generic names), every
    // property key is snake_case or a single bare lowercase word (no camelCase, so casing stays
    // clean), and none of the concept-drift page-identifier keys are used. The only problems here
    // are banned acronym terms and unlabeled placeholder-style keys standing in for real names.
    instance.track("support_ticket_created", { cta_type: "contact_sales", ticket_priority: "high" });
    instance.track("onboarding_checklist_viewed", { prop: "checklist_v2", completion_percent: 40 });
    instance.track("pricing_calculator_used", { roi_estimate: 1200, value: "enterprise" });
    instance.track("compliance_form_viewed", { dob_required: true, data: "kyc_form_v3" });
    instance.track("documentation_topic_expanded", { faq_topic: "billing", attr: "expanded" });
  }, []);

  return (
    <>
      <SectionNav section="naming" current="/naming/unreadable" />
      <main className="page">
        <h1>Naming — Unreadable</h1>
        <p>
          Fires events on load using banned acronym terms and unlabeled placeholder-style property
          keys (<code>prop</code>, <code>value</code>, <code>data</code>, <code>attr</code>)
          instead of descriptive names, to exercise the readability signal in isolation from the
          other naming checks.
        </p>
      </main>
    </>
  );
}
