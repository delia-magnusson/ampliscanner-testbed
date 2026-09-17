"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

export default function FormPage() {
  const instanceRef = useRef<ReturnType<typeof createInstance> | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!API_KEY) return;

    // Isolated instance, autocapture off: the leak here comes entirely from
    // the custom track() call below, not from Amplitude's own autocapture.
    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
    });
    instanceRef.current = instance;
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Sends the raw value exactly as typed, simulating the input-field
    // autocapture leak mechanism via an explicit (and insecure) track() call.
    instanceRef.current?.track("Signup Form Submitted", { email });
  }

  return (
    <>
      <SectionNav section="pii" current="/pii/form" />
      <main className="page">
        <h1>PII — Form</h1>
        <p>
          Submitting this form sends a custom event with the email address exactly as typed,
          unhashed, under the property key <code>email</code>. Use a fake address only.
        </p>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Email
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="jane.doe@example.test"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}
