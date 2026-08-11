import { CheckCircle2, Lock, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type StudyPlanStatus = "completed" | "current" | "locked";

export interface StudyPlanItem {
  id: string;
  orderNumber: number;
  title: string;
  duration: string;
  status: StudyPlanStatus;
}

export interface StudyPlanTabProps {
  completedCount?: number;
  totalCount?: number;
  items?: StudyPlanItem[];
}

const defaultStudyPlanItems: StudyPlanItem[] = [
  { id: "1", orderNumber: 1, title: "مقدمة ومفاهيم أساسية في الكيمياء الكهربية", duration: "45 دقيقة", status: "completed" },
  { id: "2", orderNumber: 2, title: "الخلايا الجلفانية وجلفنة المعادن", duration: "50 دقيقة", status: "completed" },
  { id: "3", orderNumber: 3, title: "جهود الأقطاب ومجموعات متسلسلة الجهود", duration: "60 دقيقة", status: "current" },
  { id: "4", orderNumber: 4, title: "الخلايا التحليلية والتحليل الكهربي", duration: "55 دقيقة", status: "locked" },
  { id: "5", orderNumber: 5, title: "قوانين فاراداي للتحليل الكهربي — الجزء الأول", duration: "65 دقيقة", status: "locked" },
  { id: "6", orderNumber: 6, title: "تطبيقات قوانين فاراداي وحل التمارين", duration: "70 دقيقة", status: "locked" },
  { id: "7", orderNumber: 7, title: "تآكل المعادن والصدأ وطرق الحماية", duration: "40 دقيقة", status: "locked" },
  { id: "8", orderNumber: 8, title: "امتحان شامل وتصحيح تفاعلي على الباب الرابع", duration: "90 دقيقة", status: "locked" },
];

/**
 * StudyPlanTab — Interactive Study Plan & Progress Timeline (Server Component).
 * Features progress header, 3-state vertical timeline (completed/current/locked),
 * and dynamic pacing calculation.
 */
export function StudyPlanTab({
  completedCount = 2,
  totalCount = 8,
  items = defaultStudyPlanItems,
}: StudyPlanTabProps) {
  const percentage = Math.round((completedCount / totalCount) * 100);
  const remainingLectures = totalCount - completedCount;

  return (
    <div className="space-y-8 text-start">
      {/* Progress Header Card */}
      <div className="bg-bg-surface border border-border-theme rounded-2xl p-6 space-y-3 shadow-xs">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-ink">تقدمك في الكورس</span>
          <span className="font-semibold text-accent-500 font-latin">
            أنجزت {completedCount} من {totalCount} محاضرة ({percentage}%)
          </span>
        </div>

        {/* Outer Bar */}
        <div className="w-full bg-bg-surface-2 rounded-full h-2.5 overflow-hidden">
          {/* Inner Active Bar */}
          <div
            className="bg-accent-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative max-w-3xl mx-auto space-y-6">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const isCompleted = item.status === "completed";
          const isCurrent = item.status === "current";
          const isLocked = item.status === "locked";

          return (
            <div key={item.id} className="relative flex gap-6 items-start">
              {/* Timeline Indicator Column */}
              <div className="flex flex-col items-center shrink-0">
                {/* Status Marker */}
                {isCompleted && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500 text-white shadow-glow-accent z-10">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                )}

                {isCurrent && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500 text-white ring-4 ring-accent-500/25 shadow-glow-accent z-10">
                    <span className="font-latin text-xs font-bold">{item.orderNumber}</span>
                  </div>
                )}

                {isLocked && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border-theme bg-bg-surface-2 text-text-secondary z-10 font-latin text-xs font-bold">
                    {item.orderNumber}
                  </div>
                )}

                {/* Connecting Vertical Line */}
                {!isLast && (
                  <div
                    className={cn(
                      "w-0.5 h-16 my-1 transition-colors",
                      isCompleted ? "bg-accent-500" : "bg-border-theme",
                    )}
                  />
                )}
              </div>

              {/* Lecture Item Card */}
              <div
                className={cn(
                  "flex-1 rounded-2xl p-5 border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
                  isCompleted && "bg-bg-surface/70 border-border-theme opacity-75",
                  isCurrent && "bg-bg-surface border-2 border-accent-500 shadow-md",
                  isLocked && "bg-bg-surface-2/60 border-border-theme opacity-50 select-none cursor-not-allowed",
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4
                      className={cn(
                        "text-base font-bold",
                        isCurrent ? "text-accent-500" : "text-ink",
                      )}
                    >
                      {item.title}
                    </h4>
                    {isLocked && <Lock className="h-4 w-4 text-text-secondary shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="font-latin">{item.duration}</span>
                    {isCurrent && (
                      <span className="font-semibold text-accent-500 bg-accent-blob/40 px-2 py-0.5 rounded-full">
                        المحاضرة التالية المستهدفة 🎯
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  {isCompleted && (
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
                      مكتملة ✓
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-xs font-bold text-accent-500 bg-accent-500/15 px-3.5 py-1.5 rounded-full shadow-xs">
                      ابدأ الآن ▶
                    </span>
                  )}
                  {isLocked && (
                    <span className="text-xs font-medium text-text-secondary bg-bg-surface px-3 py-1 rounded-full border border-border-theme">
                      مقفولة
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Pacing Advice Callout Card */}
      <div className="flex items-center gap-4 bg-accent-blob/20 border border-accent-500/25 rounded-2xl p-5 text-ink">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500 text-white shrink-0 shadow-glow-accent">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="space-y-0.5">
          <h4 className="text-sm font-bold text-ink">نصيحة المذاكرة اليومية</h4>
          <p className="text-xs text-text-secondary leading-relaxed">
            لو ذاكرت محاضرة واحدة يوميًا، هتخلّص المنهج بالكامل خلال{" "}
            <span className="font-bold text-accent-500 font-latin text-sm">{remainingLectures}</span>{" "}
            يوم.
          </p>
        </div>
      </div>
    </div>
  );
}
