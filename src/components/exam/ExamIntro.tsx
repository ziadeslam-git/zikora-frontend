import { HelpCircle, Clock, Award, RotateCcw, AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface ExamIntroProps {
  title: string;
  totalQuestions: number;
  durationMinutes: number;
  totalMarks: number;
  attemptsRemaining: number;
  onStartExam: () => void;
}

/**
 * ExamIntro — Exam Introduction Screen.
 * Dual-theme compliant: bg-bg-surface, border-border-theme, warning alert, gradient CTA button.
 */
export function ExamIntro({
  title,
  totalQuestions,
  durationMinutes,
  totalMarks,
  attemptsRemaining,
  onStartExam,
}: ExamIntroProps) {
  const isAttemptsExhausted = attemptsRemaining <= 0;

  return (
    <div className="bg-bg-surface border border-border-theme rounded-3xl p-8 lg:p-12 max-w-2xl mx-auto text-center space-y-8 shadow-md text-start sm:text-center">
      {/* Exam Header */}
      <div className="space-y-3">
        <span className="inline-block rounded-full bg-accent-blob/40 px-3.5 py-1 text-xs font-semibold text-accent-text">
          اختبار تقييمي شامل
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-text-secondary">
          يرجى قراءة تعليمات الامتحان بدقة قبل البدء. التقييم فوري ومصحح تلقائياً.
        </p>
      </div>

      {/* 4 Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-bg-surface-2 p-4 rounded-2xl border border-border-theme space-y-1">
          <HelpCircle className="h-5 w-5 text-accent-500 mx-auto" />
          <span className="block text-lg font-bold text-ink font-latin">{totalQuestions}</span>
          <span className="block text-xs text-text-secondary">عدد الأسئلة</span>
        </div>

        <div className="bg-bg-surface-2 p-4 rounded-2xl border border-border-theme space-y-1">
          <Clock className="h-5 w-5 text-accent-500 mx-auto" />
          <span className="block text-lg font-bold text-ink font-latin">{durationMinutes} دقيقة</span>
          <span className="block text-xs text-text-secondary">مدة الامتحان</span>
        </div>

        <div className="bg-bg-surface-2 p-4 rounded-2xl border border-border-theme space-y-1">
          <Award className="h-5 w-5 text-accent-500 mx-auto" />
          <span className="block text-lg font-bold text-ink font-latin">{totalMarks} درجة</span>
          <span className="block text-xs text-text-secondary">الدرجة الكلية</span>
        </div>

        <div className="bg-bg-surface-2 p-4 rounded-2xl border border-border-theme space-y-1">
          <RotateCcw className="h-5 w-5 text-accent-500 mx-auto" />
          <span className="block text-lg font-bold text-ink font-latin">{attemptsRemaining} محاولات</span>
          <span className="block text-xs text-text-secondary">المحاولات المتاحة</span>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold rounded-2xl p-4 flex items-center gap-3 text-start">
        <AlertTriangle className="h-5 w-5 shrink-0" />
        <p className="leading-relaxed">
          التايمر سيبدأ تلقائياً من لحظة الضغط على "ابدأ الامتحان"، ولن يتوقف التنازل إذا قمت بإغلاق الصفحة.
        </p>
      </div>

      {/* Start Button */}
      <div className="pt-2">
        <Button
          variant="gradient"
          size="lg"
          className="w-full font-bold shadow-glow-accent"
          disabled={isAttemptsExhausted}
          onClick={onStartExam}
        >
          <span>{isAttemptsExhausted ? "استنفذت عدد المحاولات" : "ابدأ الامتحان الآن"}</span>
          {!isAttemptsExhausted && <ArrowLeft className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />}
        </Button>
      </div>
    </div>
  );
}
