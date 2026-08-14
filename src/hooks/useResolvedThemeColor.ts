"use client";

import { useEffect, useState } from "react";

/**
 * A hook to read a resolved CSS variable from the document root.
 * Necessary for libraries like Recharts that don't understand `var(--color-name)` natively
 * and require an explicit hex/rgba string.
 *
 * @param cssVarName The CSS variable name (e.g., "--accent-500")
 * @param fallback A sensible default to avoid hydration mismatches before mounting
 */
export function useResolvedThemeColor(cssVarName: string, fallback = "#5B4FE0") {
  const [color, setColor] = useState(fallback);

  useEffect(() => {
    // Read the value from the root element
    const root = document.documentElement;
    const computedColor = getComputedStyle(root)
      .getPropertyValue(cssVarName)
      .trim();

    if (computedColor) {
      setColor(computedColor);
    }
  }, [cssVarName]);

  return color;
}
