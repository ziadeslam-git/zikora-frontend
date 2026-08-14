import { BookOpen, Users, Clock, Star } from "lucide-react";

interface StatsBarProps {
  coursesCount: number;
  studentsCount: number;
  experienceYears?: number;
  averageRating: number;
}

export function StatsBar({
  coursesCount,
  studentsCount,
  experienceYears,
  averageRating,
}: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-bg-surface border border-border-theme rounded-2xl p-4 text-center space-y-2 shadow-sm">
        <div className="w-10 h-10 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="text-2xl font-bold font-latin text-ink">{coursesCount}</div>
        <div className="text-xs text-text-secondary">كورس متاح</div>
      </div>

      <div className="bg-bg-surface border border-border-theme rounded-2xl p-4 text-center space-y-2 shadow-sm">
        <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 flex items-center justify-center">
          <Users className="w-5 h-5" />
        </div>
        <div className="text-2xl font-bold font-latin text-ink">{studentsCount.toLocaleString("ar-EG")}</div>
        <div className="text-xs text-text-secondary">طالب مسجل</div>
      </div>

      {experienceYears && (
        <div className="bg-bg-surface border border-border-theme rounded-2xl p-4 text-center space-y-2 shadow-sm">
          <div className="w-10 h-10 mx-auto rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-500 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold font-latin text-ink">+{experienceYears}</div>
          <div className="text-xs text-text-secondary">سنين خبرة</div>
        </div>
      )}

      <div className="bg-bg-surface border border-border-theme rounded-2xl p-4 text-center space-y-2 shadow-sm">
        <div className="w-10 h-10 mx-auto rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-500 flex items-center justify-center">
          <Star className="w-5 h-5" />
        </div>
        <div className="text-2xl font-bold font-latin text-ink">{averageRating}</div>
        <div className="text-xs text-text-secondary">متوسط التقييم</div>
      </div>
    </div>
  );
}
