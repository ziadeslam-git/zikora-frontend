import type { CourseCardProps } from "@/components/marketing/CourseCard";

/**
 * Course listing item — extends CourseCardProps with filtering fields.
 *
 * TODO (API integration): Replace this file's export with a fetch from:
 *   GET /api/v1/courses?q=&subject=&grade=&price=&sort=&page=
 *   Response shape: { courses: CourseListItem[], total: number, page: number, pageSize: number }
 */
export interface CourseListItem extends CourseCardProps {
  /** Grade level used for filtering (e.g. "3rd-sec", "2nd-sec"). */
  grade: string;
  /** Raw numeric price used for range filtering (before formatting). */
  rawPrice: number;
}

/**
 * Static placeholder course catalogue.
 * Replace with an API call when backend integration begins.
 */
export const allCourses: CourseListItem[] = [
  {
    id: "physics-3rd-sec",
    subjectLabel: "الفيزياء",
    teacherName: "أ. محمد عبدالمعبود",
    title: "كورس الفيزياء الكلاسيكية والكهربية للثانوية العامة",
    price: 450,
    rawPrice: 450,
    rating: 4.9,
    lessonsCount: 24,
    badgeTag: "افتح الآن",
    grade: "3rd-sec",
  },
  {
    id: "chemistry-organic",
    subjectLabel: "الكيمياء",
    teacherName: "أ. سامح إبراهيم",
    title: "الكيمياء العضوية والتحليلية بالكامل مع بنك الأسئلة",
    price: 400,
    rawPrice: 400,
    rating: 4.8,
    lessonsCount: 20,
    badgeTag: "افتح الآن",
    grade: "3rd-sec",
  },
  {
    id: "math-calculus",
    subjectLabel: "الرياضيات",
    teacherName: "د. أحمد سليمان",
    title: "التفاضل والتكامل والتطبيقات للثانوية العامة",
    price: 420,
    rawPrice: 420,
    rating: 4.9,
    lessonsCount: 28,
    badgeTag: "افتح الآن",
    grade: "3rd-sec",
  },
  {
    id: "biology-structure",
    subjectLabel: "الأحياء",
    teacherName: "أ. حسن متولي",
    title: "الباب الأول والثاني: التركيب والوظيفة والتكاثر",
    price: 380,
    rawPrice: 380,
    rating: 4.7,
    lessonsCount: 18,
    badgeTag: "افتح الآن",
    grade: "3rd-sec",
  },
  {
    id: "arabic-grammar",
    subjectLabel: "اللغة العربية",
    teacherName: "أ. رضا الفاروق",
    title: "النحو والبلاغة الشاملة للثانوية العامة",
    price: 350,
    rawPrice: 350,
    rating: 4.9,
    lessonsCount: 30,
    badgeTag: "افتح الآن",
    grade: "3rd-sec",
  },
  {
    id: "english-full",
    subjectLabel: "اللغة الإنجليزية",
    teacherName: "أ. شريف المصري",
    title: "المنهج الكامل ومجلة القواعد والكلمات الشاملة",
    price: 320,
    rawPrice: 320,
    rating: 4.8,
    lessonsCount: 22,
    badgeTag: "افتح الآن",
    grade: "2nd-sec",
  },
  {
    id: "geology-env",
    subjectLabel: "الجيولوجيا",
    teacherName: "أ. ماجد إمام",
    title: "علوم البيئة والجيولوجيا الشاملة والقطاعات",
    price: 360,
    rawPrice: 360,
    rating: 4.9,
    lessonsCount: 16,
    badgeTag: "افتح الآن",
    grade: "3rd-sec",
  },
  {
    id: "philosophy-logic",
    subjectLabel: "الفلسفة",
    teacherName: "أ. تامر صفوت",
    title: "المنطق التطبيقي والفلسفة وقضايا العصر",
    price: 300,
    rawPrice: 300,
    rating: 4.7,
    lessonsCount: 14,
    badgeTag: "افتح الآن",
    grade: "2nd-sec",
  },
];
