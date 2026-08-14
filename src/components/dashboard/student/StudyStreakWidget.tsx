import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudyStreakWidgetProps {
  streakDays: number;
  last7DaysActivity: boolean[]; // Array of 7 booleans (true = studied, false = missed)
}

export function StudyStreakWidget({ streakDays, last7DaysActivity }: StudyStreakWidgetProps) {
  // Ensure we always have exactly 7 days
  const days = last7DaysActivity.slice(0, 7);
  while (days.length < 7) days.push(false);

  return (
    <div className="bg-bg-surface border border-border-theme rounded-2xl p-5 text-center space-y-4">
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2 text-orange-500">
          <Flame className="w-8 h-8 fill-current" />
          <span className="text-4xl font-extrabold font-latin tracking-tight">{streakDays}</span>
        </div>
        <span className="text-sm font-bold text-ink">يوم متتالي</span>
        <p className="text-xs text-text-secondary mt-1">
          استمر في المذاكرة كل يوم لزيادة الحماس!
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 pt-2" dir="ltr">
        {days.map((studied, idx) => (
          <div
            key={idx}
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all",
              studied
                ? "bg-orange-500 text-white shadow-sm"
                : "bg-bg-surface-2 border border-border-theme text-text-secondary"
            )}
          >
            {/* Using arbitrary letters for days to represent the week visually */}
            {["S", "M", "T", "W", "T", "F", "S"][idx]}
          </div>
        ))}
      </div>
    </div>
  );
}
