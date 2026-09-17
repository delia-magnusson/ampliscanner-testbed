"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createInstance } from "@amplitude/analytics-browser";
import SectionNav from "../../_components/SectionNav";

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default function CleanFormPage() {
  const instanceRef = useRef<ReturnType<typeof createInstance> | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!API_KEY) return;

    // Isolated instance, autocapture off: only the explicit track() call
    // below fires, and it never carries a raw value.
    const instance = createInstance();
    instance.init(API_KEY, {
      autocapture: false,
      defaultTracking: false,
    });
    instanceRef.current = instance;
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const emailHash = await sha256Hex(email);
    instanceRef.current?.track("Signup Form Submitted", { email_hash: emailHash });
  }

  return (
    <>
      <SectionNav section="pii" current="/pii/clean" />
      <main className="page">
        <h1>PII — Clean</h1>
        <p>
          The same form as PII — Form, but the email is hashed with SHA-256 in the browser before
          it ever leaves the page, so the event only ever carries a property named{" "}
          <code>email_hash</code>, never the raw address. Use a fake address only.
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
