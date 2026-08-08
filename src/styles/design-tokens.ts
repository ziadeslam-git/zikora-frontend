/**
 * Zikora Design Tokens — Single Source of Truth
 *
 * Built from the official Zikora color palette (August 2026 references).
 * Every color here is either taken verbatim from the palette file or
 * explicitly interpolated from the anchored hex values.
 *
 * DO NOT invent new colors — extend this file if needed and document why.
 */

// ─── Colors ──────────────────────────────────────────────────────────────────

/**
 * Orange Tonal Scale — anchored at:
 *   500: #FC5A05 (Branding Orange, from palette file)
 *   900: #491900 (Gradient end,    from palette file)
 * All other steps interpolated linearly in RGB space.
 */
export const orange = {
  50:  "#FFF5EF",  // Very light warm white (nearly white with orange warmth)
  100: "#FFE0CC",  // Light peach
  200: "#FFC09A",  // Medium-light peach
  300: "#FF9864",  // Light orange
  400: "#FD7633",  // Medium orange
  500: "#FC5A05",  // ★ BRAND ORANGE — Official hex from palette file
  600: "#CF4804",  // Darker orange
  700: "#A23803",  // Dark orange
  800: "#752801",  // Very dark orange
  900: "#491900",  // ★ GRADIENT END  — Official hex from palette file
} as const;

/** Core brand palette — exact hex values from the official Zikora palette file */
export const brand = {
  orange:          orange[500],    // #FC5A05 — Primary brand / CTA / Active states
  gradient:        `linear-gradient(135deg, ${orange[500]} 0%, ${orange[900]} 100%)`,
  ink:             "#141414",      // Primary text & dark section backgrounds (NOT pure #000)
  baseWhite:       "#F9F9F9",      // Page backgrounds & card fill (NOT pure #fff)
} as const;

/**
 * Neutral Scale — derived from the 3 gray values in the palette file:
 *   Light Gray : #989795 → neutral-400
 *   Grey       : #646464 → neutral-600
 *   Dark Gray  : #333333 → neutral-800
 * Steps 50/100/200 and 900 filled to complete the functional scale.
 */
export const neutral = {
  50:  "#F9F9F9",  // = baseWhite — page background
  100: "#EFEFEF",  // Subtle hover backgrounds / secondary card fills
  200: "#DCDCDC",  // Borders (default)
  300: "#C0BFBD",  // Borders (strong) / disabled elements
  400: "#989795",  // ★ Light Gray  — placeholder text / inactive icons
  500: "#7F7D7B",  // Between Light Gray and Grey
  600: "#646464",  // ★ Grey        — secondary text
  700: "#494949",  // Between Grey and Dark Gray
  800: "#333333",  // ★ Dark Gray   — primary text on light backgrounds
  900: "#141414",  // = Ink         — headings / dark backgrounds
} as const;

/** Semantic colors — UX standards, not in palette file (used functionally only) */
export const semantic = {
  success: "#22C55E",
  danger:  "#EF4444",
  /**
   * ⚠️  Warning is visually close to brandOrange (#FC5A05).
   * ALWAYS pair with an icon (⚠️) — never rely on color alone to convey warning state.
   */
  warning: "#F59E0B",
} as const;

/** Complete colors object for convenient consumption */
export const colors = {
  brand,
  orange,
  neutral,
  semantic,
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: {
    /** Cairo — Arabic content (400/500/600/700/800 weights) */
    arabic: "Cairo",
    /** Inter — Latin text, numbers, prices, grades */
    latin:  "Inter",
  },
  /**
   * Type scale — { fontSize, lineHeight } pairs (px values, no units)
   * Matches Tailwind's default scale exactly for predictability.
   */
  scale: {
    xs:   { fontSize: 12, lineHeight: 16 },  // Labels, Captions, Timestamps
    sm:   { fontSize: 14, lineHeight: 20 },  // Secondary text, Form hints
    base: { fontSize: 16, lineHeight: 24 },  // Body text
    lg:   { fontSize: 18, lineHeight: 28 },  // Card titles, featured text
    xl:   { fontSize: 20, lineHeight: 28 },  // Section subtitles
    "2xl":{ fontSize: 24, lineHeight: 32 },  // Dashboard page titles
    "3xl":{ fontSize: 30, lineHeight: 36 },  // Marketing section headings
    "4xl":{ fontSize: 36, lineHeight: 40 },  // Hero subheadings
    "5xl":{ fontSize: 48, lineHeight: 1   },  // Hero headings (desktop)
    "6xl":{ fontSize: 60, lineHeight: 1   },  // Max hero (home page only)
  },
} as const;

// ─── Spacing ─────────────────────────────────────────────────────────────────

/** Standard Tailwind spacing scale — documented here for team reference */
export const spacing = {
  1:  4,  2:  8,  3:  12, 4:  16,
  6:  24, 8:  32, 12: 48, 16: 64, 24: 96,
} as const;

// ─── Border Radius ───────────────────────────────────────────────────────────

/**
 * Maps to Tailwind's built-in utilities (no custom config needed).
 * Note: sm=8px=Tailwind rounded-lg, md=12px=rounded-xl, lg=16px=rounded-2xl
 */
export const radius = {
  sm:   "8px",    // Inputs, Badges, Small elements  → rounded-lg
  md:   "12px",   // Buttons                         → rounded-xl
  lg:   "16px",   // Cards, Stat Widgets             → rounded-2xl
  full: "9999px", // Avatars, Pills, Icon circles    → rounded-full
} as const;

// ─── Shadows ─────────────────────────────────────────────────────────────────

/**
 * Soft elevation system — intentionally lighter than Material Design.
 * Matches the subtle shadow style in Donezo/Nexus dashboard references.
 */
export const shadows = {
  sm: "0 1px 2px rgba(20, 20, 20, 0.04)",
  md: "0 4px 12px rgba(20, 20, 20, 0.06)",
  lg: "0 12px 32px rgba(20, 20, 20, 0.10)",
} as const;

// ─── Animation ───────────────────────────────────────────────────────────────

/**
 * Animation guidelines — for use with motion (formerly framer-motion).
 * Max duration = 600ms (except infinite floating decorative elements).
 */
export const animation = {
  duration: {
    fast:   0.2,
    normal: 0.3,
    slow:   0.6,
    float:  3.0,  // Decorative only — home page hero elements
  },
  ease: {
    enter: "easeOut",
    exit:  "easeIn",
  },
  /** Hero entrance — opacity + slide up */
  heroEntrance: {
    initial:   { opacity: 0, y: 24 },
    animate:   { opacity: 1, y: 0  },
    transition:{ duration: 0.6, ease: "easeOut" },
  },
  /** Dashboard card entrance — subtle, fast */
  cardEntrance: {
    initial:   { opacity: 0, y: 8 },
    animate:   { opacity: 1, y: 0 },
    transition:{ duration: 0.2, ease: "easeOut" },
  },
  /** Stagger delay between feature cards on home page */
  staggerDelay: 0.1,
  /** Floating decoration (home hero elements only — ≤2-3 elements) */
  float: {
    animate:   { y: [0, -8, 0] },
    transition:{ duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
} as const;

// ─── Consolidated token export ────────────────────────────────────────────────

const tokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  animation,
} as const;

export default tokens;
