import Link from "next/link";
import { CheckCircle2, XCircle, Award, BookOpen, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface ExamResultQuestionItem {
  id: string;
  orderNumber: number;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  selectedOptionId?: string;
  explanation?: string;
}

export interface ExamResultsProps {
  examTitle: string;
  score: number;
  totalMarks: number;
  passingScorePercentage?: number;
  questions: ExamResultQuestionItem[];
  courseId?: string;
}

/**
 * ExamResults — Instant Auto-Grading & Error Breakdown Component.
 * Implements FR-3.3: shows exact score, percentage, pass/fail badge,
 * and per-question breakdown highlighting student's answer, correct answer,
 * and detailed explanation for incorrect answers.
 */
export function ExamResults({
  examTitle,
  score,
  totalMarks,
  passingScorePercentage = 70,
  questions,
  courseId = "chemistry-organic",
}: ExamResultsProps) {
  const percentage = Math.round((score / totalMarks) * 100);
  const isPassed = percentage >= passingScorePercentage;

  return (
    <div className="max-w-3xl mx-auto space-y-10 text-start py-8">
      {/* 1. Score Summary Header Box */}
      <div className="bg-bg-surface border border-border-theme rounded-3xl p-8 text-center space-y-6 shadow-md relative overflow-hidden">
        {/* Background glow */}
        <div
          className={cn(
            "absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none",
            isPassed ? "bg-emerald-500/15" : "bg-danger-cta/15",
          )}
        />

        <div className="relative z-10 space-y-3">
          <Badge variant={isPassed ? "success" : "danger"} className="text-sm px-4 py-1">
            {isPassed ? "ناجح بتفوق ✓" : "يحتاج مراجعة ومذاكرة ⚠️"}
          </Badge>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink">
            نتيجة {examTitle}
          </h1>

          {/* Score & Percentage Display */}
          <div className="flex items-baseline justify-center gap-3 pt-2">
            <span className="text-5xl sm:text-6xl font-extrabold text-ink font-latin tracking-tight">
              {score}
            </span>
            <span className="text-xl font-bold text-text-secondary font-latin">
              / {totalMarks} ({percentage}%)
            </span>
          </div>

          <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
            {isPassed
              ? "أحسنت! درجة ممتازة توضح استيعابك الكامل للدرس. واصل هذا التفوق في باقي المحاضرات."
              : `درجتك أقل من نسبة النجاح المطلوبة (${passingScorePercentage}%). يرجى مراجعة شرح الأخطاء أدناه وموعد المحاولة القادمة.`}
          </p>
        </div>
      </div>

      {/* 2. Per-Question Detailed Auto-Grading Breakdown */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink flex items-center gap-2">
            <Award className="h-5 w-5 text-accent-500" />
            <span>تفاصيل الإجابات وتصحيح الأخطاء</span>
          </h2>
          <span className="text-xs text-text-secondary font-latin">
            {questions.length} أسئلة
          </span>
        </div>

        <div className="space-y-5">
          {questions.map((q) => {
            const isCorrect = q.selectedOptionId === q.correctOptionId;
            const selectedOption = q.options.find((o) => o.id === q.selectedOptionId);
            const correctOption = q.options.find((o) => o.id === q.correctOptionId);

            return (
              <div
                key={q.id}
                className={cn(
                  "rounded-2xl p-6 border space-y-4 shadow-xs transition-colors",
                  isCorrect
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-danger-cta/30 bg-danger-cta/5",
                )}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-bg-surface border border-border-theme font-latin text-xs font-bold text-ink shrink-0 mt-0.5">
                      {q.orderNumber}
                    </span>
                    <h3 className="text-base font-bold text-ink leading-relaxed">
                      {q.text}
                    </h3>
                  </div>

                  {isCorrect ? (
                    <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-bold shrink-0 bg-emerald-500/10 px-3 py-1 rounded-full">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>إجابة صحيحة</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-danger-cta text-xs font-bold shrink-0 bg-danger-cta/10 px-3 py-1 rounded-full">
                      <XCircle className="h-4 w-4" />
                      <span>إجابة خاطئة</span>
                    </div>
                  )}
                </div>

                {/* Option Breakdown */}
                <div className="space-y-2 text-sm pt-1">
                  {/* Student Answer */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-text-secondary">إجابتك:</span>
                    <span
                      className={cn(
                        "font-bold px-3 py-1 rounded-lg text-xs",
                        isCorrect
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          : "bg-danger-cta/15 text-danger-cta line-through",
                      )}
                    >
                      {selectedOption ? selectedOption.text : "لم يتم الإجابة"}
                    </span>
                  </div>

                  {/* Highlight Correct Answer if Incorrect */}
                  {!isCorrect && correctOption && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-text-secondary">الإجابة الصحيحة:</span>
                      <span className="font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-lg text-xs">
                        {correctOption.text} ✓
                      </span>
                    </div>
                  )}
                </div>

                {/* Detailed Explanation / Cause of Error (FR-3.3) */}
                {q.explanation && (
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-bg-surface border border-border-theme text-xs text-text-secondary leading-relaxed">
                    <HelpCircle className="h-4 w-4 text-accent-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-ink block mb-0.5">سبب الإجابة والشرح:</span>
                      <p>{q.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Bottom Action */}
      <div className="pt-4 flex justify-center">
        <Link href={`/courses/${courseId}`}>
          <Button variant="outline" size="lg" className="gap-2 font-bold">
            <BookOpen className="h-5 w-5 text-accent-500" />
            <span>العودة لصفحة الكورس</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
