"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function LegacySdkCurrentPage() {
  useEffect(() => {
    if (!API_KEY) return;

    // Isolated instance, autocapture off, all events fire once on mount. No legacy SDK loaded
    // anywhere on this page - 100% current SDK, the clean baseline for this section.
    const instance = createInstance();
    instance.init(API_KEY, { autocapture: false, defaultTracking: false });

    instance.track("workspace_opened", { workspace_id: "ws_1" });
    instance.track("project_switched", { project_id: "proj_2" });
    instance.track("task_completed", { task_id: "task_9" });
    instance.track("comment_edited", { comment_id: "cmt_4" });
    instance.track("file_downloaded", { file_type: "csv" });
    instance.track("integration_configured", { integration_name: "slack" });
    instance.track("notification_viewed", { notification_type: "mention" });
    instance.track("profile_viewed", { profile_type: "own" });
    instance.track("search_performed", { result_count: 12 });
    instance.track("filter_applied", { filter_field: "status" });
  }, []);

  return (
    <>
      <SectionNav section="legacy-sdk" current="/legacy-sdk/current" />
      <main className="page">
        <h1>Legacy SDK — Current</h1>
        <p>
          Fires 10 custom events on load, all through the current SDK (
          <code>@amplitude/analytics-browser</code>), with the legacy SDK never loaded on this
          page, as a baseline for the legacy-SDK signal.
        </p>
      </main>
    </>
  );
}
