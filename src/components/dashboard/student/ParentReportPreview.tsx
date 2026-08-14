import { Smartphone, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ParentReportPreviewProps {
  lecturesWatchedCount: number;
  averageScore: number;
  attendancePercentage: number;
  nextReportDay: string;
}

export function ParentReportPreview({
  lecturesWatchedCount,
  averageScore,
  attendancePercentage,
  nextReportDay,
}: ParentReportPreviewProps) {
  return (
    <div className="bg-bg-surface border border-border-theme rounded-2xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-ink text-lg">كده هيوصل لولي أمرك الأسبوع ده 📱</h3>
          </div>
          <p className="text-sm text-text-secondary">
            تقرير ملخص بيتبعت تلقائياً على واتساب الخاص بولي الأمر لضمان المتابعة.
          </p>
        </div>
        <Badge variant="default" className="w-fit text-accent-text border border-accent-500/30 bg-accent-blob/10">
          معاينة التقرير
        </Badge>
      </div>

      <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl p-5">
        <div className="space-y-4">
          <p className="text-sm font-bold text-ink">
            مساء الخير، تقرير الطالب الأسبوعي من منصة Zikora:
          </p>
          
          <ul className="space-y-3 text-sm text-ink">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>عدد المحاضرات المكتملة: <strong className="font-latin">{lecturesWatchedCount}</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>متوسط درجات الامتحانات: <strong className="font-latin">{averageScore}%</strong></span>
            </li>
            <li className="flex items-center gap-2">
              {attendancePercentage >= 80 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-500" />
              )}
              <span>نسبة الحضور والالتزام: <strong className="font-latin">{attendancePercentage}%</strong></span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-xs text-text-secondary text-center sm:text-start">
        التقرير ده بيتبعت تلقائياً كل {nextReportDay}، مفيش حاجة تعملها من طرفك. الأرقام بتتحدث تلقائياً.
      </div>
    </div>
  );
}
