import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OptionItem {
  id: string;
  text: string;
}

export interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  text: string;
  options: OptionItem[];
  questionType?: "mcq" | "true_false";
  selectedOptionId?: string;
  onSelectAnswer: (optionId: string) => void;
}

/**
 * QuestionCard — Individual Exam Question Presenter Component.
 * Supports MCQ options list and True/False side-by-side buttons.
 */
export function QuestionCard({
  questionNumber,
  totalQuestions,
  text,
  options,
  questionType = "mcq",
  selectedOptionId,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <div className="bg-bg-surface border border-border-theme rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-md text-start space-y-6">
      {/* Question Header Badge & Text */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-accent-500 bg-accent-blob/40 px-3 py-1 rounded-full">
          السؤال {questionNumber} من {totalQuestions}
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-ink leading-relaxed">
          {text}
        </h2>
      </div>

      {/* Render Options */}
      {questionType === "true_false" ? (
        /* True / False Side-by-Side Large Buttons */
        <div className="grid grid-cols-2 gap-4 pt-2">
          {options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            return (
              <button
                type="button"
                key={option.id}
                onClick={() => onSelectAnswer(option.id)}
                className={cn(
                  "p-5 rounded-2xl border-2 text-center text-lg font-bold transition-all duration-150 cursor-pointer select-none",
                  isSelected
                    ? "border-accent-500 bg-accent-500/10 text-ink shadow-sm"
                    : "border-border-theme bg-bg-surface-2 text-ink hover:border-accent-500/40",
                )}
              >
                {option.text}
              </button>
            );
          })}
        </div>
      ) : (
        /* MCQ Options Vertical Stack */
        <div className="space-y-3 pt-2">
          {options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            const optionLetter = String.fromCharCode(65 + idx); // A, B, C, D

            return (
              <div
                key={option.id}
                onClick={() => onSelectAnswer(option.id)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-2xl border transition-all duration-150 cursor-pointer select-none",
                  isSelected
                    ? "border-2 border-accent-500 bg-accent-500/10 text-ink shadow-xs"
                    : "border-border-theme bg-bg-surface-2/60 text-ink hover:border-accent-500/40 hover:bg-bg-surface-2",
                )}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-xl font-latin text-xs font-bold shrink-0 transition-colors",
                      isSelected
                        ? "bg-accent-500 text-white"
                        : "bg-bg-surface text-text-secondary border border-border-theme",
                    )}
                  >
                    {optionLetter}
                  </div>
                  <span className="text-base font-semibold text-ink leading-normal">
                    {option.text}
                  </span>
                </div>

                {isSelected ? (
                  <CheckCircle2 className="h-5 w-5 text-accent-500 shrink-0 ms-2" />
                ) : (
                  <Circle className="h-5 w-5 text-border-theme shrink-0 ms-2" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
