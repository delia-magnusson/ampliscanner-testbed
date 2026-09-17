// Deliberately has no nav of any kind (not even a "back to section" link),
// for pages that must stay true islands: reachable only via sitemap.xml,
// with zero incoming AND zero outgoing nav links.
export default function BarePage({ title, description }: { title: string; description: string }) {
  return (
    <main className="page">
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
  );
}
