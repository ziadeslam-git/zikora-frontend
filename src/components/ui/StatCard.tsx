import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * StatCard — Zikora Dashboard Design System
 *
 * Visual pattern from Donezo/Nexus dashboard references:
 *   - White (#F9F9F9) background, rounded-2xl, soft shadow-sm
 *   - Icon inside a rounded-full container: orange-50 bg, orange-500 icon
 *   - Value: large (text-2xl or text-3xl), ink-colored, bold
 *   - Trend: colored arrow + percentage + "من الشهر اللي فات"
 *
 * ✅ Dashboard usage: never highlighted (always white)
 * ✅ At most ONE StatCard per dashboard page can receive highlighted=true
 *    (see Card component) — this one is always plain white
 */

interface StatTrend {
  direction: "up" | "down";
  /** e.g. "+12.5%" or "−3.2%" */
  value: string;
  /** Optional context. Defaults to "من الشهر اللي فات" */
  label?: string;
}

export interface StatCardProps {
  /** Icon component (e.g., from lucide-react) — rendered at 20×20 */
  icon: React.ReactNode;
  /** Descriptive label below the value (e.g., "إجمالي الإيرادات") */
  label: string;
  /** Main value to display prominently (e.g., 24500 or "£ 24,500") */
  value: string | number;
  /** Optional trend indicator — direction + percentage change */
  trend?: StatTrend;
  /** Visual variant. Primary uses solid brand color. Default uses clean surface. */
  variant?: "default" | "primary";
  /** Optional background override for the icon circle */
  iconBgClassName?: string;
  /** Optional icon color override */
  iconColorClassName?: string;
  className?: string;
}

export function StatCard({
  icon,
  label,
  value,
  trend,
  variant = "default",
  iconBgClassName,
  iconColorClassName,
  className,
}: StatCardProps) {
  const isTrendUp = trend?.direction === "up";
  const isPrimary = variant === "primary";

  // Default colors if not overridden
  const finalIconBg = iconBgClassName || (isPrimary ? "bg-white/20" : "bg-orange-100");
  const finalIconColor = iconColorClassName || (isPrimary ? "text-white" : "text-orange-500");

  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-[2rem] p-6 shadow-sm transition-shadow duration-200 hover:shadow-md",
        isPrimary 
          ? "bg-accent-500 text-white border-transparent" 
          : "bg-bg-base border border-border-theme",
        className,
      )}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className={cn("text-sm font-medium", isPrimary ? "text-white/90" : "text-text-secondary")}>
            {label}
          </p>
          <p
            className={cn("text-3xl font-extrabold tracking-tight font-latin", isPrimary ? "text-white" : "text-ink")}
            aria-label={`${label}: ${value}`}
          >
            {typeof value === "number" ? value.toLocaleString("en-US") : value}
          </p>
        </div>
        
        {/* Icon circle */}
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl shrink-0",
            finalIconBg,
          )}
          aria-hidden="true"
        >
          <span className={cn("h-6 w-6", finalIconColor)}>{icon}</span>
        </div>
      </div>

      {/* Trend indicator */}
      {trend && (
        <div className="flex items-center gap-2 mt-auto">
          {isTrendUp ? (
            <TrendingUp
              className={cn("h-4 w-4 shrink-0", isPrimary ? "text-white" : "text-success")}
              aria-hidden="true"
            />
          ) : (
            <TrendingDown
              className={cn("h-4 w-4 shrink-0", isPrimary ? "text-white" : "text-danger-cta")}
              aria-hidden="true"
            />
          )}
          <span
            className={cn(
              "text-sm font-bold font-latin",
              isPrimary ? "text-white" : isTrendUp ? "text-success" : "text-danger-cta",
            )}
          >
            {trend.value}
          </span>
          <span className={cn("text-xs", isPrimary ? "text-white/80" : "text-text-secondary")}>
            {trend.label ?? "من الشهر اللي فات"}
          </span>
        </div>
      )}
    </div>
  );
}
