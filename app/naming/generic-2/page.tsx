"use client";

import { useEffect } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function NamingGenericTwoPage() {
  useEffect(() => {
    if (!API_KEY) return;

    const instance = createInstance();
    instance.init(API_KEY, { autocapture: false, defaultTracking: false });

    // Two generic, non-descriptive event names ("click" and "form submitted"); the rest specific.
    instance.track("click", { element_type: "link", element_label: "get_started" });
    instance.track("form submitted", { form_name: "signup", field_count: 3 });
    instance.track("workspace_renamed", { old_name: "team-alpha", new_name: "growth-team" });
    instance.track("api_key_generated", { key_scope: "read_only", key_owner_role: "admin" });
  }, []);

  return (
    <>
      <SectionNav section="naming" current="/naming/generic-2" />
      <main className="page">
        <h1>Naming — Generic Event Names (2+)</h1>
        <p>
          Fires events on load where two events are named something generic and non-descriptive
          (<code>click</code> and <code>form submitted</code>), to exercise the generic-names
          signal at MEDIUM severity.
        </p>
      </main>
    </>
  );
}
