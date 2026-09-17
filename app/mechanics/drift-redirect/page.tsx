"use client";

export default function DriftRedirectPage() {
  function handleClick() {
    const partner = window.open("https://example.com", "_blank");
    if (!partner) return;
    setTimeout(() => {
      try {
        partner.location.href = `${window.location.origin}/mechanics/drift-redirect`;
      } catch {
        // Cross-origin window access can be restricted by the partner site; best effort only.
      }
    }, 2000);
  }

  return (
    <main className="page">
      <h1>Drift Redirect Mechanics Test</h1>
      <p>
        Clicking the button below opens a partner site on a different origin, then automatically
        redirects back to this page after a two-second delay, simulating an auth-subdomain
        redirect-and-return.
      </p>
      <button type="button" onClick={handleClick}>
        Continue to partner site
      </button>
    </main>
  );
}
