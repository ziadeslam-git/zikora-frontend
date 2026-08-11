"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  className?: string;
}

/**
 * ThemeToggle — Client Component button for switching between Light and Dark themes.
 * Prevents hydration mismatch by rendering fallback UI until mounted.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl border border-border-theme bg-bg-surface text-ink transition-colors",
          className,
        )}
        aria-label="تبديل المظهر"
      >
        <Sun className="h-4 w-4 opacity-50" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-xl border border-border-theme bg-bg-surface text-ink transition-all hover:bg-bg-surface-2 active:scale-95",
        className,
      )}
      aria-label={isDark ? "التحويل للوضع الفاتح" : "التحويل للوضع الداكن"}
      title={isDark ? "التحويل للوضع الفاتح (Light Mode)" : "التحويل للوضع الداكن (Dark Mode)"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400" />
      ) : (
        <Moon className="h-4 w-4 text-ink" />
      )}
    </button>
  );
}
