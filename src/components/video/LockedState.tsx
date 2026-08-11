import Link from "next/link";
import { Lock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface LockedStateProps {
  lockReason?: "not_enrolled" | "sequential_lock";
}

/**
 * LockedState — Video Player Locked Presenter Component.
 * Displayed when user is not enrolled or sequential lecture completion requirement applies.
 */
export function LockedState({ lockReason = "not_enrolled" }: LockedStateProps) {
  const isSequential = lockReason === "sequential_lock";

  return (
    <div className="aspect-video w-full rounded-2xl bg-bg-surface-2 flex flex-col items-center justify-center gap-4 p-6 text-center border border-border-theme relative overflow-hidden shadow-md select-none">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-bg-surface text-accent-500 border border-border-theme shadow-xs">
        <Lock className="h-8 w-8" />
      </div>

      <div className="space-y-1.5 max-w-sm mx-auto">
        <h3 className="text-lg font-bold text-ink">
          {isSequential
            ? "يجب إكمال المحاضرة السابقة أولاً"
            : "محتوى حصري للمشتركين"}
        </h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          {isSequential
            ? "الكورس يتبع نظام القفل التسلسلي لضمان الفهم التراكمي للمنهج. أتمم المحاضرة السابقة لفتح هذا الفيديو."
            : "اشترك في الكورس للحصول على إمكانية الوصول الكامل لجميع الفيديوهات والامتحانات المحمية."}
        </p>
      </div>

      <div className="pt-2">
        {isSequential ? (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-surface border border-border-theme text-xs font-semibold text-text-secondary">
            <ShieldAlert className="h-4 w-4 text-amber-500" />
            <span>خاصية القفل التسلسلي مفعلة</span>
          </div>
        ) : (
          <Link href="/checkout?plan=term">
            <Button variant="gradient" size="md" className="font-bold shadow-glow-accent">
              اشترك في الكورس الآن
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
