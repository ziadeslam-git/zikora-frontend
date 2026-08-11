/**
 * ZIKORA DESIGN SYSTEM TOKENS — DUAL THEME (LIGHT & DARK)
 *
 * Source of Truth:
 * - Light Mode: Techsara Reference palette (#5B4FE0 indigo/violet accent, #14162B ink, #F7F7FC surface)
 * - Dark Mode: Official Zikora Thumbnail Skill palette (#0A0A0A base, #111111 surface, #7C3AED accent)
 */

export const designTokens = {
  light: {
    bgBase: "#FFFFFF",
    bgSurface: "#F7F7FC",
    accent500: "#5B4FE0",
    accentBlob: "#C7CDFF",
    ink: "#14162B",
    textSecondary: "#5B5D77",
    border: "#E5E5F0",
    brandGradient: "linear-gradient(135deg, #4C6FFF 0%, #5B4FE0 45%, #7B5CF0 100%)",
    shadowSm: "0 1px 2px rgba(20, 22, 43, 0.04)",
    shadowMd: "0 4px 12px rgba(20, 22, 43, 0.06)",
    shadowLg: "0 12px 32px rgba(20, 22, 43, 0.10)",
  },
  dark: {
    bgBase: "#0A0A0A",
    bgSurface: "#111111",
    bgSurface2: "#1A1A1A",
    accent500: "#7C3AED",
    accentGlow: "#9B30FF",
    accentText: "#A855F7",
    dangerCta: "#CC1010",
    textPrimary: "#F0F0F0",
    textSecondary: "#CCCCCC",
    border: "rgba(255, 255, 255, 0.08)",
    brandGradient: "linear-gradient(135deg, #6B21D4 0%, #7C3AED 50%, #9B30FF 100%)",
    accentGlowShadow: "0 0 24px rgba(155, 48, 255, 0.25)",
  },
  shared: {
    fonts: {
      arabic: "Cairo",
      latin: "Inter",
    },
    radii: {
      sm: "8px",    // rounded-lg
      md: "12px",   // rounded-xl
      lg: "16px",   // rounded-2xl
      full: "9999px",
    },
  },
} as const;

export type DesignTokens = typeof designTokens;
