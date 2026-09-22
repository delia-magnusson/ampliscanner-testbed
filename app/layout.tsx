import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import CatMascot from "./_components/CatMascot";
import PawTrail from "./_components/PawTrail";
import PageTransition from "./_components/PageTransition";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AmpliScanner Testbed",
  description: "A deliberately-broken test fixture for validating an Amplitude analytics scanner tool.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body>
        <PageTransition>{children}</PageTransition>
        <CatMascot />
        <PawTrail />
      </body>
    </html>
  );
}
