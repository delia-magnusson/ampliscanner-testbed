import Link from "next/link";

// Deliberately does NOT link back to /pageviews or to the other groups - same isolation pattern
// as UntrackedGroupNav, so a scan targeting one group's entry page stays inside that group and
// never wanders into a sibling group's page-view signals.
const GROUP_LABELS: Record<string, string> = {
  clean: "Clean",
  "missing-some": "Missing Some",
  "reused-value": "Reused Value",
  "proliferation-low": "Proliferation (Low)",
  "proliferation-high": "Proliferation (High)",
  "no-pageview-anywhere": "No Page View Anywhere",
};

export default function PageViewGroupNav({
  group,
  currentPage,
  totalPages,
}: {
  group: string;
  currentPage: number;
  totalPages: number;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <header className="section-nav">
      <Link href={`/pageviews/${group}`} className="section-nav-back">
        ← Back to {GROUP_LABELS[group] ?? group}
      </Link>
      <nav className="section-nav-siblings">
        {pages.map((n) =>
          n === currentPage ? (
            <span key={n} className="section-nav-current">
              Page {n}
            </span>
          ) : (
            <Link key={n} href={`/pageviews/${group}/page-${n}`}>
              Page {n}
            </Link>
          ),
        )}
      </nav>
    </header>
  );
}
