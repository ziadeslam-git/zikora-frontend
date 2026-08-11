import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseHero } from "@/components/course-details/CourseHero";
import { CourseSidebarCard } from "@/components/course-details/CourseSidebarCard";
import { CourseTabs } from "@/components/course-details/CourseTabs";
import { OverviewTab } from "@/components/course-details/OverviewTab";
import { LecturesTab, type LectureItem } from "@/components/course-details/LecturesTab";
import { StudyPlanTab } from "@/components/course-details/StudyPlanTab";
import { ReviewsTab } from "@/components/course-details/ReviewsTab";

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

// Sample Course Database
const courseDatabase: Record<
  string,
  {
    title: string;
    subjectLabel: string;
    teacherName: string;
    teacherTitle: string;
    teacherBio: string;
    rating: number;
    reviewsCount: number;
    studentsCount: number;
    lessonsCount: number;
    price: number;
    pricingType: "subscription" | "per_lecture";
    isFreePreview: boolean;
    description: string;
    learningOutcomes: string[];
    lectures: LectureItem[];
  }
> = {
  "chemistry-organic": {
    title: "الكيمياء العضوية والتحليلية بالكامل مع بنك الأسئلة",
    subjectLabel: "الكيمياء",
    teacherName: "أ. سامح إبراهيم",
    teacherTitle: "خبير ومدرس الكيمياء للثانوية العامة خبرة 15 عاماً",
    teacherBio:
      "معلم أول كيمياء بالوزارة، صاحب أشهر أساليب تبسيط التفاعلات العضوية وربط المفاهيم الكيميائية ببيئة الامتحان.",
    rating: 4.8,
    reviewsCount: 128,
    studentsCount: 1420,
    lessonsCount: 20,
    price: 400,
    pricingType: "subscription",
    isFreePreview: true,
    description:
      "كورس الكيمياء العضوية والتحليلية المنهج الكامل لصف الثالث الثانوي. يشمل الشرح التفصيلي لجميع الأبواب والتفاعلات الكيميائية مع حل أكثر من 1500 سؤال وتطبيق عملي مطابق لأحدث أنظمة الامتحانات.",
    learningOutcomes: [
      "فهم وتطبيق ميكانيكية التفاعلات العضوية والمركبات الأليفاتية والأروماتية",
      "القدرة على حل مسائل التحليل الحجمي والكتلي بكل سهولة",
      "إتقان معادلات الأكسدة والاختزال والخلية الجلفانية والكهربية",
      "حل الامتحانات الشاملة والتصحيح الذاتي الفوري لمعرفة نقاط الضعف",
    ],
    lectures: [
      { id: "lec-1", orderNumber: 1, title: "مقدمة الكيمياء العضوية والتهجين", duration: "45 دقيقة", isFreePreview: true, isAvailable: true, isCompleted: true },
      { id: "lec-2", orderNumber: 2, title: "الهيدروكربونات الأليفاتية: الهيدروكربونات المشبعة", duration: "50 دقيقة", isFreePreview: true, isAvailable: true, isCompleted: true },
      { id: "lec-3", orderNumber: 3, title: "الألكينات والألكانات الحلقية والخاصية الأروماتية", duration: "60 دقيقة", isAvailable: true, isCompleted: false },
      { id: "lec-4", orderNumber: 4, title: "مشتقات الهيدروكربونات: الكحولات والفينولات", duration: "55 دقيقة", isAvailable: false, isCompleted: false },
      { id: "lec-5", orderNumber: 5, title: "الأحماض الكاربوكسيلية والاسترات والتصيون", duration: "65 دقيقة", isAvailable: false, isCompleted: false },
      { id: "lec-6", orderNumber: 6, title: "التحليل الكيميائي الوصفي والكمي", duration: "70 دقيقة", isAvailable: false, isCompleted: false },
    ],
  },
};

// Fallback Default Course for dynamically testing any [courseId]
const defaultCourse = {
  title: "كورس الفيزياء الكلاسيكية والكهربية للثانوية العامة",
  subjectLabel: "الفيزياء",
  teacherName: "أ. محمد عبدالمعبود",
  teacherTitle: "كبير معلمين ومقدم برامج الفيزياء التعليمية",
  teacherBio:
    "مدرس الفيزياء الأول، قام بتدريس أكثر من 50,000 طالب وطالبة ومساعدتهم في تحصيل الدرجات النهائية.",
  rating: 4.9,
  reviewsCount: 254,
  studentsCount: 2850,
  lessonsCount: 24,
  price: 450,
  pricingType: "subscription" as const,
  isFreePreview: true,
  description:
    "كورس الفيزياء الكامل للثانوية العامة. يتضمن شرحاً مبسطاً وعميقاً لدوائر التيار المتردد والمجالات المغناطيسية والفيزياء الحديثة، مع بنك أسئلة شامل وحل امتحانات السنوات السابقة.",
  learningOutcomes: [
    "فهم كامل لدوائر التيار المتردد والمقاومة والمكثف والملف",
    "تطبيق قوانين كيرشوف وأوم للدوائر المغلقة بسرعة وبدون خطأ",
    "استيعاب الفيزياء الحديثة والتأثير الكهرومغناطيسي وتأثير كومتون",
    "التعامل بثقة مع أسئلة امتحانات نهاية العام والتفكير الفيزيائي",
  ],
  lectures: [
    { id: "lec-1", orderNumber: 1, title: "التيار الكهربي وقانون أوم", duration: "40 دقيقة", isFreePreview: true, isAvailable: true, isCompleted: true },
    { id: "lec-2", orderNumber: 2, title: "قوانين كيرشوف وتطبيقات الدوائر المعقدة", duration: "55 دقيقة", isFreePreview: true, isAvailable: true, isCompleted: true },
    { id: "lec-3", orderNumber: 3, title: "المجال المغناطيسي للتيار الكهربي", duration: "60 دقيقة", isAvailable: true, isCompleted: false },
    { id: "lec-4", orderNumber: 4, title: "القوة المغناطيسية وعزم الثنائي قطب", duration: "50 دقيقة", isAvailable: false, isCompleted: false },
  ],
};

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const course = courseDatabase[resolvedParams.courseId] ?? defaultCourse;
  return {
    title: `${course.title} — Zikora`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const resolvedParams = await params;
  const course = courseDatabase[resolvedParams.courseId] ?? defaultCourse;

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
