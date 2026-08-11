import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExamTimerProps {
  secondsRemaining: number;
}

/**
 * ExamTimer — Presentational countdown timer component.
 * Converts remaining seconds to mm:ss format and turns danger-cta when under 60 seconds.
 */
export function ExamTimer({ secondsRemaining }: ExamTimerProps) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isUrgent = secondsRemaining < 60;

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors font-latin select-none",
        isUrgent
          ? "border-danger-cta/40 bg-danger-cta/10 text-danger-cta animate-pulse font-extrabold"
          : "border-border-theme bg-bg-surface-2 text-ink font-bold",
      )}
    >
      <Clock className={cn("h-4 w-4", isUrgent ? "text-danger-cta" : "text-accent-500")} />
      <span className="text-base tracking-wider">{formattedTime}</span>
    </div>
  );
}
