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
  iconBgClassName = "bg-orange-100",
  iconColorClassName = "text-orange-500",
  className,
}: StatCardProps) {
  const isTrendUp = trend?.direction === "up";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl bg-base-white p-6 shadow-sm",
        "border border-neutral-200 transition-shadow duration-200 hover:shadow-md",
        className,
      )}
    >
      {/* Icon circle */}
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full shrink-0",
          iconBgClassName,
        )}
        aria-hidden="true"
      >
        <span className={cn("h-5 w-5", iconColorClassName)}>{icon}</span>
      </div>

      {/* Value + Label */}
      <div className="space-y-1">
        <p
          className="text-3xl font-bold tracking-tight text-ink font-latin"
          aria-label={`${label}: ${value}`}
        >
          {typeof value === "number" ? value.toLocaleString("ar-EG") : value}
        </p>
        <p className="text-sm text-neutral-600">{label}</p>
      </div>

      {/* Trend indicator */}
      {trend && (
        <div className="flex items-center gap-1.5">
          {isTrendUp ? (
            <TrendingUp
              className="h-3.5 w-3.5 text-success shrink-0"
              aria-hidden="true"
            />
          ) : (
            <TrendingDown
              className="h-3.5 w-3.5 text-danger shrink-0"
              aria-hidden="true"
            />
          )}
          <span
            className={cn(
              "text-xs font-semibold font-latin",
              isTrendUp ? "text-success" : "text-danger",
            )}
          >
            {trend.value}
          </span>
          <span className="text-xs text-neutral-400">
            {trend.label ?? "من الشهر اللي فات"}
          </span>
        </div>
      )}
    </div>
  );
}
