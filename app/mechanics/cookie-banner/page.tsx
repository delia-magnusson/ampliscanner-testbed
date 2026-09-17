"use client";

import { useState } from "react";

export default function CookieBannerPage() {
  const [accepted, setAccepted] = useState(false);

  return (
    <main className="page">
      <h1>Cookie Banner Mechanics Test</h1>
      <p>
        A OneTrust-style consent banner covers this page until the visitor clicks Accept. No
        tracking is actually blocked by it yet, this is only the banner behaviour.
      </p>

      {!accepted && (
        <div className="cookie-banner-overlay">
          <div className="cookie-banner-panel">
            <p>
              We use cookies to improve your experience. By continuing to browse, you agree to our
              use of cookies.
            </p>
            <button type="button" onClick={() => setAccepted(true)}>
              Accept
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
