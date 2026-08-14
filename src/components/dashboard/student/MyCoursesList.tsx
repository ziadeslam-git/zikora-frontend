import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface EnrolledCourse {
  id: string;
  title: string;
  teacherName: string;
  progressPercentage: number;
}

interface MyCoursesListProps {
  courses: EnrolledCourse[];
}

export function MyCoursesList({ courses }: MyCoursesListProps) {
  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-text-secondary border border-dashed border-border-theme rounded-xl">
        لم تشترك في أي كورس بعد
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-ink">كورساتي ({courses.length})</h3>
      <div className="space-y-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-bg-surface border border-border-theme rounded-xl p-4 flex items-center gap-4 hover:border-accent-500/50 transition-colors"
          >
            {/* Thumbnail */}
            <div className="w-16 h-16 rounded-lg bg-bg-surface-2 border border-border-theme shrink-0 flex items-center justify-center">
              <span className="text-xs text-text-secondary opacity-50">صورة</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-ink truncate">{course.title}</h4>
              <p className="text-xs text-text-secondary truncate">{course.teacherName}</p>

              {/* Progress Bar */}
              <div className="flex items-center gap-3 mt-2">
                <div className="flex-1 h-1.5 bg-border-theme rounded-full overflow-hidden" dir="ltr">
                  <div
                    className="h-full bg-accent-500 rounded-full"
                    style={{ width: `${course.progressPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-bold font-latin text-text-secondary w-8 text-end">
                  {course.progressPercentage}%
                </span>
              </div>
            </div>

            {/* Certificate Badge */}
            {course.progressPercentage >= 80 && course.progressPercentage < 100 && (
              <div className="hidden sm:block">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full whitespace-nowrap">
                  باقي {100 - course.progressPercentage}% للشهادة 🎓
                </span>
              </div>
            )}
            
            {course.progressPercentage === 100 && (
              <div className="hidden sm:block">
                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full whitespace-nowrap">
                  مكتمل 🏆
                </span>
              </div>
            )}

            {/* Action */}
            <div className="shrink-0">
              <Link href={`/courses/${course.id}`}>
                <Button variant="ghost" size="sm" className="text-accent-text hover:bg-accent-blob/20">
                  كمل
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
