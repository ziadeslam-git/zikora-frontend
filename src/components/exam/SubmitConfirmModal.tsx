import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface SubmitConfirmModalProps {
  isOpen: boolean;
  unansweredCount: number;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * SubmitConfirmModal — Confirmation dialog when submitting with unanswered questions.
 */
export function SubmitConfirmModal({
  isOpen,
  unansweredCount,
  onCancel,
  onConfirm,
}: SubmitConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-bg-surface border border-border-theme rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-start">
        {/* Header Icon */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 shrink-0">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-ink">تأكيد إنهاء الامتحان</h3>
            <p className="text-xs text-text-secondary">أسئلة غير مجابة</p>
          </div>
        </div>

        {/* Warning Body */}
        <p className="text-sm text-text-secondary leading-relaxed">
          يوجد{" "}
          <span className="font-bold text-amber-500 font-latin text-base">
            {unansweredCount}
          </span>{" "}
          أسئلة لم تقم بالإجابة عليها بعد. هل أنت متأكد من تسليم الامتحان في الوقت الحالي؟
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            size="md"
            className="w-1/2"
            onClick={onCancel}
          >
            العودة للامتحان
          </Button>

          <Button
            type="button"
            variant="danger"
            size="md"
            className="w-1/2 font-bold"
            onClick={onConfirm}
          >
            تأكيد الإنهاء
          </Button>
        </div>
      </div>
    </div>
  );
}
