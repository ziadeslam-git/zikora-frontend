import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CourseCard, type CourseCardProps } from "./CourseCard";

const featuredCourses: CourseCardProps[] = [
  {
    id: "physics-3rd-sec",
    subjectLabel: "الفيزياء",
    teacherName: "أ. محمد عبدالمعبود",
    title: "كورس الفيزياء الكلاسيكية والكهربية للثانوية العامة",
    price: 450,
    rating: 4.9,
    lessonsCount: 24,
  },
  {
    id: "chemistry-organic",
    subjectLabel: "الكيمياء",
    teacherName: "أ. سامح إبراهيم",
    title: "الكيمياء العضوية والتحليلية بالكامل مع بنك الأسئلة",
    price: 400,
    rating: 4.8,
    lessonsCount: 20,
  },
  {
    id: "math-calculus",
    subjectLabel: "الرياضيات",
    teacherName: "د. أحمد سليمان",
    title: "التفاضل والتكامل والتطبيقات للثانوية العامة",
    price: 420,
    rating: 4.9,
    lessonsCount: 28,
  },
  {
    id: "biology-structure",
    subjectLabel: "الأحياء",
    teacherName: "أ. حسن متولي",
    title: "الباب الأول والثاني: التركيب والوظيفة والتكاثر",
    price: 380,
    rating: 4.7,
    lessonsCount: 18,
  },
  {
    id: "arabic-grammar",
    subjectLabel: "اللغة العربية",
    teacherName: "أ. رضا الفاروق",
    title: "النحو والبلاغة الشاملة للثانوية العامة",
    price: 350,
    rating: 4.9,
    lessonsCount: 30,
  },
  {
    id: "english-full",
    subjectLabel: "اللغة الإنجليزية",
    teacherName: "أ. شريف المصري",
    title: "المنهج الكامل ومجلة القواعد والكلمات الشاملة",
    price: 320,
    rating: 4.8,
    lessonsCount: 22,
  },
  {
    id: "geology-env",
    subjectLabel: "الجيولوجيا",
    teacherName: "أ. ماجد إمام",
    title: "علوم البيئة والجيولوجيا الشاملة والقطاعات",
    price: 360,
    rating: 4.9,
    lessonsCount: 16,
  },
  {
    id: "philosophy-logic",
    subjectLabel: "الفلسفة",
    teacherName: "أ. تامر صفوت",
    title: "المنطق التطبيقي والفلسفة وقضايا العصر",
    price: 300,
    rating: 4.7,
    lessonsCount: 14,
  },
];

/**
 * FeaturedCourses — Marketing Homepage Featured Courses Section (Server Component).
 * Displays a 4-column responsive grid of 8 top courses with header navigation.
 */
export function FeaturedCourses() {
  return (
    <section className="py-20 lg:py-28 max-w-[1280px] mx-auto px-6 lg:px-8">
      {/* Section Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div className="space-y-2">
          <span className="inline-block rounded-full bg-orange-100 px-3.5 py-1 text-xs font-semibold text-orange-600">
            الكورسات المميزة
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-ink">
            اختر مادتك وابدأ التعلم الآن
          </h2>
        </div>

        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors group self-start sm:self-auto"
        >
          <span>عرض كل الكورسات (+120)</span>
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredCourses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
}
