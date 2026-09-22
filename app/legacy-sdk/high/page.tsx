"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";
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

export default function LegacySdkHighPage() {
  useEffect(() => {
    if (!API_KEY) return;

    // Current SDK: 2 of 10 events.
    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
      instanceName: window.location.pathname,
      storageProvider: new MemoryStorage(),
    });
    instance.track("modern_settings_opened", { setting_section: "notifications" });
    instance.track("modern_theme_changed", { theme_mode: "dark" });

    // Legacy SDK: 8 of 10 events, 80% - at or above the 70% HIGH threshold.
    let cancelled = false;
    const script = document.createElement("script");
    script.src = LEGACY_SDK_URL;
    script.async = true;
    script.onload = () => {
      if (cancelled || !window.amplitude) return;
      const legacy = window.amplitude.getInstance();
      legacy.init(API_KEY);
      legacy.logEvent("legacy_dashboard_viewed", { dashboard_id: "main" });
      legacy.logEvent("legacy_widget_added", { widget_type: "funnel_chart" });
      legacy.logEvent("legacy_widget_removed", { widget_type: "table" });
      legacy.logEvent("legacy_export_started", { export_format: "pdf" });
      legacy.logEvent("legacy_export_completed", { export_format: "pdf" });
      legacy.logEvent("legacy_share_clicked", { share_method: "link" });
      legacy.logEvent("legacy_comment_added", { comment_id: "cmt_77" });
      legacy.logEvent("legacy_mention_sent", { mentioned_role: "member" });
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
      <SectionNav section="legacy-sdk" current="/legacy-sdk/high" />
      <main className="page">
        <h1>Legacy SDK — High</h1>
        <p>
          Fires 10 custom events on load; 8 of them (80%) come from the legacy amplitude-js SDK,
          the rest from the current SDK, at or above the 70% HIGH threshold.
        </p>
      </main>
    </>
  );
}
