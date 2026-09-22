"use client";

import { useEffect, useState } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function GreetingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!API_KEY) return;

    // Isolated instance, real autocapture, no custom track() calls anywhere
    // on this page: the leak below comes entirely from Amplitude's default
    // element-text capture, not from any code we wrote to send the name.
    // MemoryStorage + unique instanceName per page - see /pageviews/missing-some entry page for why.
    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: true,
      defaultTracking: true,
      instanceName: window.location.pathname,
      storageProvider: new MemoryStorage(),
    });
  }, []);

  return (
    <>
      <SectionNav section="pii" current="/pii/greeting" />
      <main className="page">
        <h1>PII — Greeting</h1>
        <p>
          The account menu button below renders the visitor&apos;s name as its own visible label.
          Clicking it (a <code>&lt;button&gt;</code>, one of the elements autocapture instruments
          by default) makes Amplitude&apos;s element-text capture read that label straight off the
          DOM and attach it to the click event, leaking the name with no custom{" "}
          <code>track()</code> call involved. &quot;Jane Doe&quot; is a fake placeholder identity,
          not a real person.
        </p>
        <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen}>
          Welcome back, Jane Doe
        </button>
        {menuOpen && (
          <ul className="dropdown-menu">
            <li>Account settings</li>
            <li>Log out</li>
          </ul>
        )}
      </main>
    </>
  );
}
