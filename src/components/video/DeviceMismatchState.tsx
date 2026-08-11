import { Smartphone, Headphones } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * DeviceMismatchState — Device Binding Mismatch Presenter Component.
 * Displayed when backend API returns a 403 DeviceMismatch response code.
 */
export function DeviceMismatchState() {
  return (
    <div className="aspect-video w-full rounded-2xl bg-bg-surface-2 flex flex-col items-center justify-center gap-4 p-6 text-center border border-danger-cta/30 relative overflow-hidden shadow-md select-none">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-danger-cta/10 text-danger-cta border border-danger-cta/20 shadow-xs">
        <Smartphone className="h-8 w-8" />
      </div>

      <div className="space-y-1.5 max-w-sm mx-auto">
        <h3 className="text-lg font-bold text-ink">
          الفيديو متابَع من جهاز مختلف
        </h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          تم ربط حسابك بجهاز آخر سابقاً لحماية المحتوى. لا يمكن تشغيل الفيديو من هذا الجهاز بدون فك الربط المعتمد.
        </p>
      </div>

      <div className="pt-2">
        <a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="md" className="gap-2 font-bold text-ink border-border-theme hover:bg-bg-surface">
            <Headphones className="h-4 w-4 text-accent-500" />
            <span>تواصل مع الدعم لفك الربط</span>
          </Button>
        </a>
      </div>
    </div>
  );
}
