import { Play, Lock, CheckCircle2, ChevronDown, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export interface LectureItem {
  id: string;
  orderNumber: number;
  title: string;
  duration: string;
  description?: string;
  isFreePreview?: boolean;
  isCompleted?: boolean;
  isAvailable?: boolean;
}

export interface LecturesTabProps {
  lectures: LectureItem[];
}

/**
 * LecturesTab — Lectures & Curriculum Tab (Server Component).
 * Renders accordion list using native HTML <details>/<summary> styled with Tailwind.
 */
export function LecturesTab({ lectures }: LecturesTabProps) {
  return (
    <div className="space-y-4 text-start">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-ink">منهج المحاضرات ({lectures.length})</h3>
        <span className="text-xs text-text-secondary">انقر على المحاضرة لعرض التفاصيل</span>
      </div>

      <div className="space-y-3">
        {lectures.map((lecture) => (
          <details
            key={lecture.id}
            className="group rounded-2xl border border-border-theme bg-bg-surface overflow-hidden transition-colors"
          >
            <summary className="flex items-center justify-between p-4 cursor-pointer select-none list-none hover:bg-bg-surface-2 transition-colors">
              <div className="flex items-center gap-3">
                {/* Order Circle or Completed Checkmark */}
                {lecture.isCompleted ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-surface-2 font-latin text-xs font-bold text-ink shrink-0 border border-border-theme">
                    {lecture.orderNumber}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-base font-bold text-ink group-hover:text-accent-500 transition-colors">
                    {lecture.title}
                  </span>
                  {lecture.isFreePreview && (
                    <Badge variant="brand" className="w-fit text-[10px]">
                      معاينة مجانية 🍿
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-text-secondary">
                <div className="flex items-center gap-1.5 font-latin">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{lecture.duration}</span>
                </div>

                {/* Lock or Play Icon */}
                {lecture.isAvailable || lecture.isFreePreview ? (
                  <Play className="h-4 w-4 text-accent-500 fill-accent-500" />
                ) : (
                  <Lock className="h-4 w-4 text-text-secondary" />
                )}

                <ChevronDown className="h-4 w-4 text-text-secondary transition-transform duration-200 group-open:rotate-180" />
              </div>
            </summary>

            {/* Accordion Content */}
            <div className="px-4 pb-4 pt-2 border-t border-border-theme/60 text-sm text-text-secondary leading-relaxed bg-bg-base/40">
              <p>{lecture.description ?? "تشمل هذه المحاضرة الشرح التفصيلي للدرس مع التطبيقات العملية وبنك الأسئلة التفاعلي."}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
