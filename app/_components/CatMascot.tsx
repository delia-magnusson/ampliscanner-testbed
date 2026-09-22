"use client";

import { useEffect, useRef, useState } from "react";
import { MascotCatSVG } from "./CatIcons";

// Purely decorative, fixed-position mascot: no <a>/<button>/role=button anywhere in it, so it can
// never be picked up by the scanner's generic clickable-element selector or shift which element
// an EXHAUSTIVE/smart-action click targets on a given page.
export default function CatMascot() {
  const [scrolling, setScrolling] = useState<"up" | "down" | null>(null);
  const [greet, setGreet] = useState(false);
  const lastY = useRef(0);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const direction = y > lastY.current ? "down" : y < lastY.current ? "up" : null;
        lastY.current = y;
        if (direction) {
          setScrolling(direction);
          if (resetTimer.current) clearTimeout(resetTimer.current);
          resetTimer.current = setTimeout(() => setScrolling(null), 600);
        }
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  return (
    <div
      className="cat-mascot"
      data-scrolling={scrolling ?? undefined}
      data-greet={greet}
      onMouseEnter={() => setGreet(true)}
      onMouseLeave={() => setGreet(false)}
    >
      <span className="cat-mascot__bubble">Meow! Scanning...</span>
      <span className="cat-mascot__inner">
        <MascotCatSVG />
      </span>
    </div>
  );
}
