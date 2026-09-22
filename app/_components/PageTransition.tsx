"use client";

import { usePathname } from "next/navigation";

// Re-keying on the pathname just restarts the CSS fade-up defined on .page-transition in
// globals.css for every navigation - it doesn't gate or delay mounting of the page underneath, so
// a page's own on-mount tracking still fires exactly when it always did.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
