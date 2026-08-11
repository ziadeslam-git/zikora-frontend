import { AlertTriangle, Headphones } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface LimitReachedStateProps {
  viewsUsed: number;
  viewsMax: number;
}

/**
 * LimitReachedState — Video Player View Limit Exceeded Presenter Component.
 * Displayed when user has consumed all allowed views for the lecture.
 */
export function LimitReachedState({ viewsUsed, viewsMax }: LimitReachedStateProps) {
  return (
    <div className="aspect-video w-full rounded-2xl bg-bg-surface-2 flex flex-col items-center justify-center gap-4 p-6 text-center border border-danger-cta/30 relative overflow-hidden shadow-md select-none">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-danger-cta/10 text-danger-cta border border-danger-cta/20 shadow-xs">
        <AlertTriangle className="h-8 w-8" />
      </div>

      <div className="space-y-1.5 max-w-sm mx-auto">
        <h3 className="text-lg font-bold text-ink">
          استنفذت عدد المشاهدات المتاحة
        </h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          شاهدت هذا الفيديو{" "}
          <span className="font-bold text-danger-cta font-latin">{viewsUsed}</span> من أصل{" "}
          <span className="font-bold text-ink font-latin">{viewsMax}</span> مرات مسموحة. تواصل مع الدعم الفني إذا كنت بحاجة لمشاهدة إضافية.
        </p>
      </div>

      <div className="pt-2">
        <a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="md" className="gap-2 font-bold text-ink border-border-theme hover:bg-bg-surface">
            <Headphones className="h-4 w-4 text-accent-500" />
            <span>تواصل مع الدعم الفني</span>
          </Button>
        </a>
      </div>
    </div>
  );
}
