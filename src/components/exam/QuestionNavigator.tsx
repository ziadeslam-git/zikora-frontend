import { cn } from "@/lib/utils";

export interface QuestionNavigatorProps {
  totalQuestions: number;
  currentIndex: number;
  answers: Record<string, string>;
  questionIds: string[];
  onJumpToQuestion: (index: number) => void;
}

/**
 * QuestionNavigator — Row of numbered circles allowing direct question jumping.
 * Highlights answered, unanswered, and active question status.
 */
export function QuestionNavigator({
  totalQuestions,
  currentIndex,
  answers,
  questionIds,
  onJumpToQuestion,
}: QuestionNavigatorProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto py-2 select-none">
      {Array.from({ length: totalQuestions }).map((_, idx) => {
        const qId = questionIds[idx];
        const isAnswered = qId ? Boolean(answers[qId]) : false;
        const isActive = idx === currentIndex;

        return (
          <button
            type="button"
            key={idx}
            onClick={() => onJumpToQuestion(idx)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-xl font-latin text-xs font-bold transition-all duration-150 cursor-pointer",
              isActive && "ring-2 ring-accent-500 ring-offset-2 ring-offset-bg-base scale-110 z-10",
              isAnswered
                ? "bg-accent-500 text-white shadow-xs"
                : "border border-border-theme bg-bg-surface text-text-secondary hover:border-accent-500/40",
            )}
            aria-label={`الانتقال للسؤال رقم ${idx + 1}`}
          >
            {idx + 1}
          </button>
        );
      })}
    </div>
  );
}
