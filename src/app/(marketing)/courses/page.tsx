import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SearchX, RotateCcw } from "lucide-react";
import { CourseCard } from "@/components/marketing/CourseCard";
import { CourseSearchInput } from "@/components/courses/CourseSearchInput";
import { FilterBar } from "@/components/courses/FilterBar";
import { CourseGridSkeleton } from "@/components/courses/CourseGridSkeleton";
import { Pagination } from "@/components/courses/Pagination";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { allCourses } from "@/lib/data/courses";

export const metadata: Metadata = {
  title: "كل الكورسات — Zikora",
  description: "تصفّح وفلتر كل كورسات الثانوية العامة المتاحة على منصة Zikora",
};

interface SearchParamsProps {
  searchParams: Promise<{
    q?: string;
    subject?: string;
    grade?: string;
    price?: string;
    sort?: string;
    page?: string;
  }>;
}

/** Alias for backward compatibility with filter/sort logic below. */
const allCoursesData = allCourses;


export default async function CoursesPage({ searchParams }: SearchParamsProps) {
  const resolvedParams = await searchParams;

  const query = resolvedParams.q?.toLowerCase().trim() ?? "";
  const subjectFilter = resolvedParams.subject ?? "";
  const gradeFilter = resolvedParams.grade ?? "";
  const priceFilter = resolvedParams.price ?? "";
  const sortOption = resolvedParams.sort ?? "latest";
  const currentPage = Math.max(1, parseInt(resolvedParams.page ?? "1", 10));

  // Filter Logic
  let filtered = allCoursesData.filter((course) => {
    if (
      query &&
      !course.title.toLowerCase().includes(query) &&
      !course.subjectLabel.toLowerCase().includes(query) &&
      !course.teacherName.toLowerCase().includes(query)
    ) {
      return false;
    }

    if (subjectFilter) {
      const subjectMap: Record<string, string> = {
        physics: "الفيزياء",
        chemistry: "الكيمياء",
        biology: "الأحياء",
        math: "الرياضيات",
        arabic: "اللغة العربية",
        english: "اللغة الإنجليزية",
        geology: "الجيولوجيا",
        philosophy: "الفلسفة",
      };
      const expectedSubject = subjectMap[subjectFilter];
      if (expectedSubject && course.subjectLabel !== expectedSubject) {
        return false;
      }
    }

    if (gradeFilter && course.grade !== gradeFilter) {
      return false;
    }

    if (priceFilter) {
      if (priceFilter === "free" && course.rawPrice !== 0) return false;
      if (priceFilter === "under-300" && course.rawPrice >= 300) return false;
      if (priceFilter === "300-500" && (course.rawPrice < 300 || course.rawPrice > 500)) return false;
      if (priceFilter === "over-500" && course.rawPrice <= 500) return false;
    }

    return true;
  });

  // Sort Logic
  if (sortOption === "rating") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  } else if (sortOption === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.rawPrice - b.rawPrice);
  } else if (sortOption === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.rawPrice - a.rawPrice);
  }

  // Pagination Logic (8 items per page)
  const pageSize = 8;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedCourses = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="min-h-screen bg-bg-base text-ink py-16 px-6 lg:px-8 max-w-[1280px] mx-auto space-y-8">
      {/* 1. Page Header */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="text-center space-y-4 mb-6">
          <span className="inline-block rounded-full bg-accent-blob/40 px-3.5 py-1 text-xs font-semibold text-accent-text">
            تصفّح المكتبة التعليمية
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
            كل الكورسات المتاحة
          </h1>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            اختر مادتك من بين أفضل كورسات الثانوية العامة المعتمدة لحجز مكانك وتأمين تفوقك
          </p>

          <div className="pt-2">
            <CourseSearchInput />
          </div>
        </div>
      </ScrollReveal>

      {/* 2. Filter Bar */}
      <ScrollReveal direction="up" delay={0.15}>
        <FilterBar totalResults={filtered.length} />
      </ScrollReveal>

      {/* 3. Results Grid wrapped in Suspense & ScrollReveal */}
      <Suspense fallback={<CourseGridSkeleton />}>
        {filtered.length > 0 ? (
          <>
            <ScrollReveal direction="up" delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {paginatedCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </ScrollReveal>

            {/* 4. Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              searchParams={resolvedParams}
            />
          </>
        ) : (
          /* Empty State */
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-4 bg-bg-surface border border-border-theme rounded-3xl p-8 max-w-md mx-auto my-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-blob/40 text-accent-500">
              <SearchX className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-ink">مفيش كورسات مطابقة</h3>
              <p className="text-sm text-text-secondary">
                جرّب تغيّر كلمات البحث أو تعدّل الفلاتر المختارة
              </p>
            </div>
            <div className="pt-2">
              <Link href="/courses">
                <Button variant="outline" size="md" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  <span>إعادة ضبط الفلاتر</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
}
