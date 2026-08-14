import { CheckCircle2, Circle, AlertCircle } from "lucide-react";

interface CourseComparisonWidgetProps {
  courses: {
    id: string;
    title: string;
    avgProgress: number;
    avgGrade: number;
  }[];
}

export function CourseComparisonWidget({ courses }: CourseComparisonWidgetProps) {
  if (!courses || courses.length === 0) return null;

  if (courses.length === 1) {
    const course = courses[0];
    if (!course) return null;
    return (
      <div className="bg-bg-surface border border-border-theme rounded-2xl p-5 space-y-4">
        <h3 className="font-bold text-ink text-sm">أداء الكورس</h3>
        <div className="space-y-3">
          <p className="text-sm font-bold text-ink truncate">{course.title}</p>
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>متوسط التقدم: <span className="font-bold font-latin">{course.avgProgress}%</span></span>
            <span>متوسط الدرجات: <span className="font-bold font-latin">{course.avgGrade}%</span></span>
          </div>
        </div>
      </div>
    );
  }

  const sortedCourses = [...courses].sort((a, b) => b.avgGrade - a.avgGrade);

  return (
    <div className="bg-bg-surface border border-border-theme rounded-2xl p-5 space-y-4">
      <h3 className="font-bold text-ink text-sm">مقارنة أداء الكورسات</h3>
      <div className="space-y-4">
        {sortedCourses.map((course, idx) => (
          <div key={course.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-latin text-text-secondary">#{idx + 1}</span>
              <span className="text-sm font-bold text-ink truncate flex-1">{course.title}</span>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-text-secondary px-6">
              <div className="flex-1 space-y-1">
                <div className="flex justify-between">
                  <span>التقدم</span>
                  <span className="font-bold font-latin">{course.avgProgress}%</span>
                </div>
                <div className="h-1 bg-border-theme rounded-full" dir="ltr">
                  <div className="h-full bg-accent-500 rounded-full" style={{ width: `${course.avgProgress}%` }} />
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between">
                  <span>الدرجات</span>
                  <span className="font-bold font-latin">{course.avgGrade}%</span>
                </div>
                <div className="h-1 bg-border-theme rounded-full" dir="ltr">
                  <div className="h-full bg-success rounded-full" style={{ width: `${course.avgGrade}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
