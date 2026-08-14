import { CourseCard } from "@/components/marketing/CourseCard";
import type { CourseListItem } from "@/lib/data/courses";

interface TeacherCoursesTabProps {
  courses: CourseListItem[];
}

export function TeacherCoursesTab({ courses }: TeacherCoursesTabProps) {
  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-16 text-text-secondary border border-dashed border-border-theme rounded-2xl">
        لا توجد كورسات متاحة حالياً لهذا المدرس.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} {...course} />
      ))}
    </div>
  );
}
