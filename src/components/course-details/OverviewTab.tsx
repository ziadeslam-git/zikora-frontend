import Link from "next/link";
import { CheckCircle2, UserCheck, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface OverviewTabProps {
  description: string;
  learningOutcomes: string[];
  teacherName: string;
  teacherTitle: string;
  teacherBio: string;
}

/**
 * OverviewTab — Course Overview Tab (Server Component).
 * Renders full description, "What you'll learn" checklist, and teacher mini profile.
 */
export function OverviewTab({
  description,
  learningOutcomes,
  teacherName,
  teacherTitle,
  teacherBio,
}: OverviewTabProps) {
  return (
    <div className="space-y-10 text-start">
      {/* 1. Full Description */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-ink">عن هذا الكورس</h3>
        <p className="text-base text-text-secondary leading-relaxed font-normal whitespace-pre-line">
          {description}
        </p>
      </div>

      {/* 2. What You'll Learn Grid */}
      <div className="bg-bg-surface border border-border-theme rounded-2xl p-6 lg:p-8 space-y-4">
        <h3 className="text-lg font-bold text-ink flex items-center gap-2">
          <Award className="h-5 w-5 text-accent-500" />
          <span>ماذا ستتعلم في هذا الكورس؟</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {learningOutcomes.map((outcome, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-ink leading-relaxed">
                {outcome}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Teacher Profile Card */}
      <div className="bg-bg-surface border border-border-theme rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-500 text-white font-extrabold text-2xl shrink-0 font-latin shadow-glow-accent">
            {teacherName.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-bold text-ink">{teacherName}</h4>
              <UserCheck className="h-4 w-4 text-accent-500" />
            </div>
            <p className="text-xs font-semibold text-accent-text">{teacherTitle}</p>
            <p className="text-xs text-text-secondary line-clamp-2 max-w-lg">{teacherBio}</p>
          </div>
        </div>

        <Link href="/instructors" className="shrink-0 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto gap-2">
            <BookOpen className="h-4 w-4" />
            <span>شوف كل كورساته</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
