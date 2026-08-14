import type { LectureItem } from "@/components/course-details/LecturesTab";

/**
 * Full course detail shape — used by the [courseId] detail page.
 *
 * TODO (API integration): Replace courseDetails and defaultCourseDetail with a fetch from:
 *   GET /api/v1/courses/:courseId
 *   Response shape: CourseDetail
 */
export interface CourseDetail {
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

/**
 * Keyed map of known course slugs → their static detail data.
 * Replace with an API call when backend integration begins.
 *
 * generateStaticParams in [courseId]/page.tsx is derived from Object.keys(courseDetails).
 */
export const courseDetails: Record<string, CourseDetail> = {
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

/**
 * Fallback course shown for any unrecognised courseId while placeholder data is active.
 * Remove this fallback once real API integration is wired up (notFound() should be called instead).
 */
export const defaultCourseDetail: CourseDetail = {
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
  pricingType: "subscription",
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
