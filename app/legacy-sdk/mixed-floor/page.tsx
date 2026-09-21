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

export default function LegacySdkMixedFloorPage() {
  useEffect(() => {
    if (!API_KEY) return;

    // Current SDK: 19 of 20 events (95%) - deliberately a much larger current majority than
    // /legacy-sdk/low's 80/20 split, to isolate the dual-SDK floor from the ratio-based MEDIUM
    // band: at 5% legacy this is nowhere near the 30% threshold, so if this still comes back
    // MEDIUM (not LOW), that's the floor doing it, not the ratio.
    const instance = createInstance();
    instance.init(API_KEY, { autocapture: false, defaultTracking: false });
    instance.track("workspace_created", { workspace_id: "ws_1" });
    instance.track("project_created", { project_id: "proj_204" });
    instance.track("task_assigned", { task_id: "task_88" });
    instance.track("comment_posted", { comment_id: "cmt_12" });
    instance.track("file_uploaded", { file_type: "pdf" });
    instance.track("integration_enabled", { integration_name: "github" });
    instance.track("notification_dismissed", { notification_type: "reminder" });
    instance.track("settings_updated", { setting_name: "timezone" });
    instance.track("cart_viewed", { cart_id: "cart_501" });
    instance.track("product_favorited", { product_id: "sku_77" });
    instance.track("coupon_applied", { coupon_code: "SAVE10" });
    instance.track("shipping_selected", { shipping_method: "standard" });
    instance.track("invoice_downloaded", { invoice_id: "inv_501" });
    instance.track("subscription_paused", { pause_reason: "cost" });
    instance.track("referral_sent", { referral_channel: "email" });
    instance.track("profile_updated", { field_changed: "display_name" });
    instance.track("avatar_changed", { source: "upload" });
    instance.track("password_reset_requested", { via: "email" });
    instance.track("two_factor_enabled", { method: "totp" });

    // Legacy SDK: exactly 1 of 20 events (5%) - the smallest possible nonzero presence, to confirm
    // the floor genuinely has no minimum count or ratio gate.
    let cancelled = false;
    const script = document.createElement("script");
    script.src = LEGACY_SDK_URL;
    script.async = true;
    script.onload = () => {
      if (cancelled || !window.amplitude) return;
      const legacy = window.amplitude.getInstance();
      legacy.init(API_KEY);
      legacy.logEvent("legacy_onboarding_step_completed", { step_number: 1 });
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
      <SectionNav section="legacy-sdk" current="/legacy-sdk/mixed-floor" />
      <main className="page">
        <h1>Legacy SDK — Mixed Floor</h1>
        <p>
          Fires 20 custom events on load; just 1 of them (5%) comes from the legacy amplitude-js
          SDK, the rest from the current SDK. Isolates the dual-SDK floor specifically: at this
          ratio the finding should still floor to MEDIUM rather than LOW, since AmpliScanner&apos;s
          floor has no minimum ratio or count - any legacy presence alongside current-SDK traffic
          floors severity, however small.
        </p>
      </main>
    </>
  );
}
