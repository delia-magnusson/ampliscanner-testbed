"use client";

const LABELS = ["Delete account", "Buy now", "Checkout", "Unsubscribe", "Logout"];

export default function DangerousButtonsPage() {
  return (
    <main className="page">
      <h1>Dangerous Buttons Mechanics Test</h1>
      <p>
        Each button below only shows an alert naming itself; none of them perform any real
        destructive action.
      </p>
      <div className="button-column">
        {LABELS.map((label) => (
          <button key={label} type="button" onClick={() => alert(label)}>
            {label}
          </button>
        ))}
      </div>
    </main>
  );
}
