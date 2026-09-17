"use client";

import { useEffect, useRef, useState } from "react";

function makeCards(count: number) {
  return Array.from({ length: count }, (_, i) => i + 1);
}

export default function InfiniteScrollPage() {
  const [cards, setCards] = useState<number[]>(() => makeCards(30));
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setCards((prev) => makeCards(prev.length + 20));
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="page">
      <h1>Infinite Scroll Mechanics Test</h1>
      <p>
        Starts with 30 placeholder cards and lazy-loads 20 more each time the sentinel near the
        bottom enters the viewport.
      </p>
      <div className="card-grid">
        {cards.map((n) => (
          <div key={n} className="card">
            Card {n}
          </div>
        ))}
      </div>
      <div ref={sentinelRef} className="scroll-sentinel" />
    </main>
  );
}
