import Link from "next/link";

// Deliberately does NOT link back to /untracked or to the other two groups - this is what keeps
// each group a self-contained, crawlable island: a scan targeting one group's entry page should
// never be able to wander into a sibling group or the rest of the site from here.
const GROUP_LABELS: Record<string, string> = {
  "ratio-10": "Ratio 10",
  "ratio-30": "Ratio 30",
  "ratio-60": "Ratio 60",
};

export default function UntrackedGroupNav({
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
      <Link href={`/untracked/${group}`} className="section-nav-back">
        ← Back to {GROUP_LABELS[group] ?? group}
      </Link>
      <nav className="section-nav-siblings">
        {pages.map((n) =>
          n === currentPage ? (
            <span key={n} className="section-nav-current">
              Page {n}
            </span>
          ) : (
            <Link key={n} href={`/untracked/${group}/page-${n}`}>
              Page {n}
            </Link>
          ),
        )}
      </nav>
    </header>
  );
}
