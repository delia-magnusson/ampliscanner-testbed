import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="page">
      <h1>Login Wall — Dashboard</h1>
      <p>
        Reachable only after submitting the fake login form; not linked from anywhere else in the
        site.
      </p>
      <Link href="/mechanics/login-wall/settings">Go to settings</Link>
    </main>
  );
}
