"use client";

import { cn } from "@/lib/utils";

export type PricingMode = "subscription" | "per_lecture";

export interface PricingToggleProps {
  mode: PricingMode;
  onChange: (mode: PricingMode) => void;
}

/**
 * PricingToggle — Two-option switch component ("اشتراك شهري/ترم" vs "بالمحاضرة الواحدة").
 * Manages lifting state up to parent PricingSection wrapper.
 */
export function PricingToggle({ mode, onChange }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex p-1.5 rounded-2xl bg-bg-surface-2 border border-border-theme select-none shadow-xs">
        <button
          type="button"
          onClick={() => onChange("subscription")}
          className={cn(
            "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer",
            mode === "subscription"
              ? "bg-accent-500 text-white shadow-glow-accent"
              : "text-text-secondary hover:text-ink",
          )}
        >
          اشتراك شهري / ترم
        </button>

        <button
          type="button"
          onClick={() => onChange("per_lecture")}
          className={cn(
            "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer",
            mode === "per_lecture"
              ? "bg-accent-500 text-white shadow-glow-accent"
              : "text-text-secondary hover:text-ink",
          )}
        >
          بالمحاضرة الواحدة
        </button>
      </div>
    </div>
  );
}
