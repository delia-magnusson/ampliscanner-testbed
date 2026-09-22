"use client";

import { useEffect, useRef, useState } from "react";
import { PawPrintSVG } from "./CatIcons";
import { SECTIONS } from "./sections";

type Paw = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
  confetti?: { dx: number; dy: number; spin: number };
};

const CONFETTI_EVERY = 6;
const PAW_COLORS = Object.values(SECTIONS).map((section) => section.color);

function randomColor() {
  return PAW_COLORS[Math.floor(Math.random() * PAW_COLORS.length)];
}

// A single document-level click listener, added passively and never calling preventDefault() or
// stopPropagation() - it only ever observes clicks to spawn a decorative paw print, it never
// intercepts them, so every real link/button/tracked click on the site behaves exactly as before.
export default function PawTrail() {
  const [paws, setPaws] = useState<Paw[]>([]);
  const nextId = useRef(0);
  const clickCount = useRef(0);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      clickCount.current += 1;
      const id = nextId.current++;
      const base: Paw = {
        id,
        x: event.clientX,
        y: event.clientY,
        rotate: Math.round(Math.random() * 60 - 30),
        color: randomColor(),
      };
      setPaws((prev) => [...prev, base]);
      window.setTimeout(() => {
        setPaws((prev) => prev.filter((p) => p.id !== id));
      }, 1100);

      // Every few clicks, a little burst of paw-print confetti as a small surprise.
      if (clickCount.current % CONFETTI_EVERY === 0) {
        const burst: Paw[] = Array.from({ length: 8 }, () => {
          const angle = Math.random() * Math.PI * 2;
          const distance = 60 + Math.random() * 60;
          const burstId = nextId.current++;
          return {
            id: burstId,
            x: event.clientX,
            y: event.clientY,
            rotate: Math.round(Math.random() * 360),
            color: randomColor(),
            confetti: {
              dx: Math.round(Math.cos(angle) * distance),
              dy: Math.round(Math.sin(angle) * distance - 40),
              spin: Math.round(Math.random() * 360 - 180),
            },
          };
        });
        setPaws((prev) => [...prev, ...burst]);
        const burstIds = new Set(burst.map((p) => p.id));
        window.setTimeout(() => {
          setPaws((prev) => prev.filter((p) => !burstIds.has(p.id)));
        }, 1400);
      }
    }

    document.addEventListener("click", onClick, { passive: true });
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="paw-trail-layer">
      {paws.map((paw) => (
        <span
          key={paw.id}
          className={paw.confetti ? "paw-print paw-confetti" : "paw-print"}
          style={
            {
              left: paw.x,
              top: paw.y,
              "--paw-rotate": `${paw.rotate}deg`,
              "--paw-color": paw.color,
              ...(paw.confetti
                ? {
                    "--confetti-x": `${paw.confetti.dx}px`,
                    "--confetti-y": `${paw.confetti.dy}px`,
                    "--confetti-spin": `${paw.confetti.spin}deg`,
                  }
                : {}),
            } as React.CSSProperties
          }
        >
          <PawPrintSVG />
        </span>
      ))}
    </div>
  );
}
