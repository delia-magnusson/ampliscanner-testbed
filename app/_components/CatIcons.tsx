import { SECTIONS, type SectionKey } from "./sections";

// All purely decorative (paired everywhere with existing visible link/heading text), so every
// icon here is rendered aria-hidden - the accessible name already comes from that text, and a
// screen reader announcing "cat wearing sunglasses PII" on every link would just be noise.
const DECORATIVE = { "aria-hidden": true as const, focusable: false as const };

const HEAD = "#F6C98A";
const HEAD_DARK = "#E0A85E";
const INK = "#262A43";

function Ears() {
  return (
    <>
      <path d="M10 16 L14 4 L20 14 Z" fill={HEAD} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M38 16 L34 4 L28 14 Z" fill={HEAD} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
    </>
  );
}

function Face({ children }: { children?: React.ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" width="28" height="28" {...DECORATIVE}>
      <Ears />
      <circle cx="24" cy="26" r="16" fill={HEAD} stroke={INK} strokeWidth="1.5" />
      {children}
    </svg>
  );
}

export function NoTrackingIcon() {
  // Cat hiding in a box: only ears and eyes peek over the rim.
  return (
    <svg viewBox="0 0 48 48" width="28" height="28" {...DECORATIVE}>
      <path d="M10 16 L14 6 L19 15 Z" fill={HEAD} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M38 16 L34 6 L29 15 Z" fill={HEAD} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="20" cy="20" r="2" fill={INK} />
      <circle cx="28" cy="20" r="2" fill={INK} />
      <rect x="6" y="22" width="36" height="18" rx="2" fill="none" stroke={INK} strokeWidth="2" />
      <path d="M24 22 V40" stroke="currentColor" strokeWidth="3" opacity="0.85" />
      <path d="M6 28 H42" stroke={INK} strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
}

export function PiiIcon() {
  // Incognito cat: sunglasses bar across the eyes.
  return (
    <Face>
      <rect x="13" y="23" width="9" height="6" rx="2" fill="currentColor" stroke={INK} strokeWidth="1.2" />
      <rect x="26" y="23" width="9" height="6" rx="2" fill="currentColor" stroke={INK} strokeWidth="1.2" />
      <path d="M22 26 H26" stroke={INK} strokeWidth="1.2" />
      <path d="M31 30 Q32 33 30 34" stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </Face>
  );
}

export function NamingIcon() {
  // A cat with a little "???" nametag - it can't settle on what to call itself.
  return (
    <Face>
      <circle cx="19" cy="24" r="1.6" fill={INK} />
      <circle cx="29" cy="24" r="1.6" fill={INK} />
      <path d="M22 29 Q24 31 26 29" stroke={INK} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <rect x="17" y="37" width="14" height="7" rx="2" fill="currentColor" stroke={INK} strokeWidth="1.2" />
      <text x="24" y="42.5" fontSize="6" textAnchor="middle" fill={INK} fontWeight="700">
        ?
      </text>
    </Face>
  );
}

export function MethodsIcon() {
  // Cat scientist peering through a magnifying glass.
  return (
    <Face>
      <circle cx="19" cy="25" r="1.6" fill={INK} />
      <circle cx="29" cy="25" r="1.6" fill={INK} />
      <circle cx="30" cy="27" r="7" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M35 32 L40 37" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </Face>
  );
}

export function LegacySdkIcon() {
  // Old, sleepy cat: closed crescent eyes, little glasses, drifting Zzz.
  return (
    <Face>
      <path d="M15 25 Q19 22 23 25" stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M25 25 Q29 22 33 25" stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M22 31 Q24 33 26 31" stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <text x="35" y="12" fontSize="7" fill={HEAD_DARK} fontWeight="700">
        z
      </text>
      <text x="40" y="7" fontSize="5" fill={HEAD_DARK} fontWeight="700">
        z
      </text>
    </Face>
  );
}

export function UntrackedIcon() {
  // Cat mid-escape, tiptoeing off with little motion lines trailing behind.
  return (
    <svg viewBox="0 0 48 48" width="28" height="28" {...DECORATIVE}>
      <g transform="rotate(-8 24 26)">
        <Ears />
        <circle cx="24" cy="26" r="16" fill={HEAD} stroke={INK} strokeWidth="1.5" />
        <circle cx="20" cy="24" r="1.6" fill={INK} />
        <circle cx="29" cy="23" r="1.6" fill={INK} />
        <path d="M22 30 Q24 32 27 30" stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>
      <path d="M2 34 H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <path d="M2 40 H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function PageviewsIcon() {
  // Cat peering through a pair of binoculars.
  return (
    <Face>
      <circle cx="18" cy="27" r="5" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="30" cy="27" r="5" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M23 27 H25" stroke="currentColor" strokeWidth="2.2" />
    </Face>
  );
}

export function MechanicsIcon() {
  // Cat mechanic with a little wrench.
  return (
    <Face>
      <circle cx="19" cy="24" r="1.6" fill={INK} />
      <circle cx="29" cy="24" r="1.6" fill={INK} />
      <path d="M22 29 Q24 31 26 29" stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <g transform="rotate(35 30 33)">
        <rect x="28" y="26" width="4" height="16" rx="1.5" fill="currentColor" stroke={INK} strokeWidth="1" />
        <circle cx="30" cy="25" r="4" fill="none" stroke="currentColor" strokeWidth="2.4" />
      </g>
    </Face>
  );
}

export const SECTION_ICONS: Record<SectionKey, () => React.ReactElement> = {
  "no-tracking": NoTrackingIcon,
  pii: PiiIcon,
  naming: NamingIcon,
  methods: MethodsIcon,
  "legacy-sdk": LegacySdkIcon,
  untracked: UntrackedIcon,
  pageviews: PageviewsIcon,
  mechanics: MechanicsIcon,
};

export function SectionIcon({ section }: { section: SectionKey }) {
  const Icon = SECTION_ICONS[section];
  const color = SECTIONS[section].color;
  return (
    <span
      className="cat-icon-badge"
      style={{ "--badge-color": color, color } as React.CSSProperties}
    >
      <Icon />
    </span>
  );
}

// The floating mascot: a slightly bigger, friendlier cat face used nowhere else, so it reads as
// "the site's cat," not a repeat of a section icon.
export function MascotCatSVG() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" {...DECORATIVE}>
      <path d="M12 20 L18 4 L26 18 Z" fill={HEAD} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M52 20 L46 4 L38 18 Z" fill={HEAD} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="34" r="22" fill={HEAD} stroke={INK} strokeWidth="2" />
      <circle cx="24" cy="32" r="2.4" fill={INK} />
      <circle cx="40" cy="32" r="2.4" fill={INK} />
      <path d="M29 39 Q32 42 35 39" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M8 30 Q2 30 4 26" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M8 36 Q1 37 3 33" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M56 30 Q62 30 60 26" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M56 36 Q63 37 61 33" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <circle cx="20" cy="40" r="3" fill="var(--accent)" opacity="0.55" />
      <circle cx="44" cy="40" r="3" fill="var(--accent)" opacity="0.55" />
      <path d="M14 46 Q32 54 50 46 L46 58 Q32 52 18 58 Z" fill="var(--accent-2)" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="32" cy="53" r="2.2" fill={HEAD} stroke={INK} strokeWidth="1.2" />
    </svg>
  );
}

// A single paw print, used both for the click trail and the confetti burst.
export function PawPrintSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" width="20" height="20" className={className} {...DECORATIVE}>
      <ellipse cx="16" cy="21" rx="8" ry="7" fill="currentColor" />
      <ellipse cx="6" cy="12" rx="3.4" ry="4.2" fill="currentColor" transform="rotate(-20 6 12)" />
      <ellipse cx="14" cy="7" rx="3.4" ry="4.4" fill="currentColor" transform="rotate(-6 14 7)" />
      <ellipse cx="22" cy="8" rx="3.4" ry="4.4" fill="currentColor" transform="rotate(10 22 8)" />
      <ellipse cx="27" cy="15" rx="3.2" ry="4" fill="currentColor" transform="rotate(24 27 15)" />
    </svg>
  );
}
