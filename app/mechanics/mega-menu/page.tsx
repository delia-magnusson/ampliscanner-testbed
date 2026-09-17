"use client";

import Link from "next/link";
import { useState } from "react";

export default function MegaMenuPage() {
  const [hovered, setHovered] = useState(false);

  return (
    <main className="page">
      <h1>Mega Menu Mechanics Test</h1>
      <p>
        The submenu links below are only added to the DOM when the parent nav item is hovered,
        not on initial page load.
      </p>
      <nav>
        <div
          className="mega-menu-item"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Products
          {hovered && (
            <div className="mega-menu-submenu">
              <Link href="/mechanics/mega-menu/product-a">Product A</Link>
              <Link href="/mechanics/mega-menu/product-b">Product B</Link>
              <Link href="/mechanics/mega-menu/product-c">Product C</Link>
            </div>
          )}
        </div>
      </nav>
    </main>
  );
}
