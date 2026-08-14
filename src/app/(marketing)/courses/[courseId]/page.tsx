import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseHero } from "@/components/course-details/CourseHero";
import { CourseSidebarCard } from "@/components/course-details/CourseSidebarCard";
import { CourseTabs } from "@/components/course-details/CourseTabs";
import { OverviewTab } from "@/components/course-details/OverviewTab";
import { LecturesTab } from "@/components/course-details/LecturesTab";
import { StudyPlanTab } from "@/components/course-details/StudyPlanTab";
import { ReviewsTab } from "@/components/course-details/ReviewsTab";
import { courseDetails, defaultCourseDetail } from "@/lib/data/courseDetails";

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

/**
 * generateStaticParams — tells Next.js which courseId slugs to pre-render.
 * Derived from the keys of courseDetails so it stays in sync automatically.
 * TODO: Replace with `fetch /api/v1/courses/ids` during backend integration.
 */
export function generateStaticParams() {
  return Object.keys(courseDetails).map((courseId) => ({ courseId }));
}


export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const course = courseDetails[resolvedParams.courseId] ?? defaultCourseDetail;
  return {
    title: `${course.title} — Zikora`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const resolvedParams = await params;
  const course = courseDetails[resolvedParams.courseId] ?? defaultCourseDetail;

  if (!course) {
    notFound();
  }

  // Pre-render Server Component Tab Content Props
  const overviewContent = (
    <OverviewTab
      description={course.description}
      learningOutcomes={course.learningOutcomes}
      teacherName={course.teacherName}
      teacherTitle={course.teacherTitle}
      teacherBio={course.teacherBio}
    />
  );

  const lecturesContent = <LecturesTab lectures={course.lectures} />;

  const studyPlanContent = (
    <StudyPlanTab
      completedCount={2}
      totalCount={course.lessonsCount}
    />
  );

  const reviewsContent = <ReviewsTab />;

  return (
    <div className="min-h-screen bg-bg-base text-ink">
      {/* 1. Course Hero */}
      <CourseHero
        title={course.title}
        subjectLabel={course.subjectLabel}
        teacherName={course.teacherName}
        rating={course.rating}
        reviewsCount={course.reviewsCount}
        studentsCount={course.studentsCount}
        lessonsCount={course.lessonsCount}
        isFreePreview={course.isFreePreview}
      />

      {/* 2. Main Content & Sticky Sidebar Container */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main 4-Tabs Container (70% width / 8 cols on Desktop) */}
          <div className="lg:col-span-8 w-full">
            <CourseTabs
              overviewContent={overviewContent}
              lecturesContent={lecturesContent}
              studyPlanContent={studyPlanContent}
              reviewsContent={reviewsContent}
            />
          </div>

          {/* Sticky Sidebar Card (30% width / 4 cols on Desktop) */}
          <div className="lg:col-span-4 w-full">
            <CourseSidebarCard
              price={course.price}
              pricingType={course.pricingType}
              lessonsCount={course.lessonsCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
