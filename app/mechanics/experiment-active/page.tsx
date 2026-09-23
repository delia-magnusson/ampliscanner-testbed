"use client";

import { useEffect, useState } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import { MemoryStorage } from "@amplitude/analytics-core";
import { Experiment } from "@amplitude/experiment-js-client";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
const EXPERIMENT_DEPLOYMENT_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_EXPERIMENT_DEPLOYMENT_KEY;
const FLAG_KEY = "mechanics_experiment_test_flag";

export default function ExperimentActivePage() {
  const [variantValue, setVariantValue] = useState<string | null>(null);

  useEffect(() => {
    if (!API_KEY || !EXPERIMENT_DEPLOYMENT_KEY) return;

    // Same instanceName on both the analytics instance and the Experiment client - that's what
    // links them to the same named AnalyticsConnector (getAnalyticsConnector(instanceName) in
    // @amplitude/analytics-core; confirmed in both SDKs' actual bundled source), so Experiment's
    // $exposure events forward into THIS page's isolated analytics instance instead of colliding
    // with any other page's, the same isolation guarantee instanceName gives everywhere else on
    // this site.
    const instanceName = window.location.pathname;
    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
      instanceName,
      storageProvider: new MemoryStorage(),
    });

    let cancelled = false;
    // initializeWithAmplitudeAnalytics (not plain initialize()) is what actually wires an
    // AmplitudeIntegrationPlugin through AnalyticsConnector.getInstance(instanceName) - confirmed
    // in the SDK's own source - so $exposure events forward into the connected analytics
    // instance. Plain initialize() does not set this up by default.
    const experiment = Experiment.initializeWithAmplitudeAnalytics(EXPERIMENT_DEPLOYMENT_KEY, {
      instanceName,
    });

    experiment
      .start()
      // start() fetches flag configs for local evaluation (flag.lab.amplitude.com) AND fetches
      // remote-evaluation variants for the current user (api.lab.amplitude.com) - both real
      // network calls to Amplitude's actual Experiment evaluation servers under this project's
      // real deployment key, not simulated.
      .then(() => {
        if (cancelled) return;
        const variant = experiment.variant(FLAG_KEY);
        // As of this page's last check, project 864562 has no flags/experiments configured yet
        // (flag.lab.amplitude.com returned [] and api.lab.amplitude.com returned {} - a valid,
        // working deployment key with nothing to evaluate), so this reliably comes back empty
        // for any flag key. The request itself is still real. Once a real flag exists in this
        // project, exposure() below will start actually forwarding a $exposure event with real
        // variant data - no code change needed here.
        setVariantValue(variant.value ?? "(no flags configured in this project yet)");
        experiment.exposure(FLAG_KEY);
      })
      .catch((err) => {
        if (!cancelled) console.error("Experiment start() failed:", err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <SectionNav section="mechanics" current="/mechanics/experiment-active" />
      <main className="page">
        <h1>Mechanics — Experiment Active</h1>
        <p>
          Initializes the real <code>@amplitude/experiment-js-client</code> SDK against this
          project&apos;s actual deployment key on load, calls <code>start()</code> (fetching flag
          configs and remote-evaluation variants for real from Amplitude&apos;s Experiment
          servers), then evaluates and tracks exposure for a flag key. Unlike every other page in
          this section, nothing here is simulated - this is genuine Experiment SDK usage, meant to
          confirm AMPLITUDE_EXPERIMENT reports &quot;Observed&quot; when Experiment is actually in
          play. Project 864562 has no flags configured yet, so the <code>$exposure</code> event
          won&apos;t carry real variant data until one exists - but the evaluation requests
          themselves are real, already-confirmed hits against Amplitude&apos;s Experiment servers.
        </p>
        {variantValue && (
          <p>
            Evaluated variant for <code>{FLAG_KEY}</code>: <code>{variantValue}</code>
          </p>
        )}
      </main>
    </>
  );
}
