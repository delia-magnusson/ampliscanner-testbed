"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function MethodsCleanPage() {
  useEffect(() => {
    if (!API_KEY) return;

    // Isolated instance, autocapture off, all events fire once on mount. No window.dataLayer
    // usage at all on this page - every custom event goes through exactly one delivery path,
    // the SDK, matching the clean baseline for tracking-method hygiene.
    const instance = createInstance();
    instance.init(API_KEY, { autocapture: false, defaultTracking: false });

    instance.track("workspace_created", { workspace_id: "ws_1" });
    instance.track("project_created", { project_id: "proj_204" });
    instance.track("task_assigned", { task_id: "task_88", assignee_role: "member" });
    instance.track("comment_posted", { comment_id: "cmt_12" });
    instance.track("file_uploaded", { file_type: "pdf", file_size_kb: 240 });
    instance.track("integration_enabled", { integration_name: "github" });
    instance.track("notification_dismissed", { notification_type: "reminder" });
    instance.track("settings_updated", { setting_name: "timezone" });
  }, []);

  return (
    <>
      <SectionNav section="methods" current="/methods/clean" />
      <main className="page">
        <h1>Methods — Clean</h1>
        <p>
          Fires 8 custom events on load, all through the SDK only, with no <code>window.dataLayer</code>{" "}
          usage anywhere on the page, as a tracking-method-hygiene baseline.
        </p>
      </main>
    </>
  );
}
