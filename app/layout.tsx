import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AmpliScanner Testbed",
  description: "A deliberately-broken test fixture for validating an Amplitude analytics scanner tool.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
