"use client";

import { useEffect, useRef } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function NoAutocapturePage() {
  const instanceRef = useRef<ReturnType<typeof createInstance> | null>(null);

  useEffect(() => {
    if (!API_KEY) return;

    // Isolated instance so this page's "autocapture off" config can never
    // leak into the autocapture-only page (or vice versa).
    const instance = createInstance();
    instance.init(API_KEY, {
      // Both options are set explicitly (rather than relying on SDK
      // defaults) so this page's behaviour doesn't drift if the org's
      // remote autocapture config changes: defaultTracking still governs
      // page view/session capture independently of autocapture in this
      // SDK version unless remote config overrides it.
      autocapture: false,
      defaultTracking: false,
    });
    instanceRef.current = instance;

    instance.track("Page Viewed", { page: "no-tracking/no-autocapture" });
  }, []);

  function handleAddToCart() {
    instanceRef.current?.track("Product Added To Cart", { productId: "sku-123", price: 42 });
  }

  function handleNewsletterSignup() {
    instanceRef.current?.track("Newsletter Signup Submitted", { source: "no-autocapture-page" });
  }

  return (
    <>
      <SectionNav section="no-tracking" current="/no-tracking/no-autocapture" />
      <main className="page">
        <h1>No Tracking — No Autocapture</h1>
        <p>
          This page fires real custom <code>track()</code> calls (a page-viewed event on load,
          plus two interaction events below) but explicitly disables Amplitude&apos;s autocapture,
          exercising the scanner&apos;s milder NO_AUTOCAPTURE finding rather than AUTOCAPTURE_ONLY.
        </p>
        <div className="button-row">
          <button type="button" onClick={handleAddToCart}>
            Add to cart
          </button>
          <button type="button" onClick={handleNewsletterSignup}>
            Sign up for newsletter
          </button>
        </div>
      </main>
    </>
  );
}
