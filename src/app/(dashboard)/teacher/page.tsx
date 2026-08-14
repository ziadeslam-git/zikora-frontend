import type { Metadata } from "next";
import { AtRiskBanner } from "@/components/dashboard/teacher/AtRiskBanner";
import { TeacherStatsOverview } from "@/components/dashboard/teacher/TeacherStatsOverview";
import { StudentsTable, StudentRow } from "@/components/dashboard/teacher/StudentsTable";
import { CourseComparisonWidget } from "@/components/dashboard/teacher/CourseComparisonWidget";
import { ContentPerformanceWidget } from "@/components/dashboard/teacher/ContentPerformanceWidget";

export const metadata: Metadata = {
  title: "داشبورد المعلم — Zikora",
  description: "لوحة تحكم المعلم لمتابعة الطلاب وتحليل الأداء.",
};

// ----------------------------------------------------------------------
// Mock Data
// ----------------------------------------------------------------------

const MOCK_TEACHER_NAME = "أ. سامح إبراهيم";

const MOCK_STUDENTS: StudentRow[] = [
  {
    id: "s1",
    name: "عمر أحمد",
    gradeLevel: "الصف الثالث الثانوي",
    avatarLetter: "ع",
    courseName: "الكيمياء العضوية",
    progress: 80,
    averageGrade: 92,
    lastActive: "من يومين",
    examHistory: [{ name: "امتحان 1", score: 85 }, { name: "امتحان 2", score: 90 }, { name: "امتحان 3", score: 95 }],
    lectureChecklist: [
      { id: "l1", title: "المحاضرة الأولى", isCompleted: true },
      { id: "l2", title: "المحاضرة الثانية", isCompleted: true },
      { id: "l3", title: "المحاضرة الثالثة", isCompleted: false },
    ]
  },
  {
    id: "s2",
    name: "يوسف خالد",
    gradeLevel: "الصف الثالث الثانوي",
    avatarLetter: "ي",
    courseName: "الكيمياء العضوية",
    progress: 40,
    averageGrade: 55,
    lastActive: "منذ 20 يوم",
    examHistory: [{ name: "امتحان 1", score: 60 }, { name: "امتحان 2", score: 50 }],
    lectureChecklist: [
      { id: "l1", title: "المحاضرة الأولى", isCompleted: true },
      { id: "l2", title: "المحاضرة الثانية", isCompleted: false },
    ]
  },
  {
    id: "s3",
    name: "سارة محمود",
    gradeLevel: "الصف الثالث الثانوي",
    avatarLetter: "س",
    courseName: "الكيمياء التحليلية",
    progress: 100,
    averageGrade: 98,
    lastActive: "اليوم",
    examHistory: [{ name: "امتحان 1", score: 95 }, { name: "امتحان 2", score: 100 }],
    lectureChecklist: [
      { id: "l1", title: "المحاضرة الأولى", isCompleted: true },
      { id: "l2", title: "المحاضرة الثانية", isCompleted: true },
    ]
  },
  {
    id: "s4",
    name: "مروان طارق",
    gradeLevel: "الصف الثاني الثانوي",
    avatarLetter: "م",
    courseName: "أساسيات الكيمياء",
    progress: 65,
    averageGrade: 75,
    lastActive: "من أسبوع",
    examHistory: [{ name: "امتحان 1", score: 70 }, { name: "امتحان 2", score: 80 }],
    lectureChecklist: [
      { id: "l1", title: "المحاضرة الأولى", isCompleted: true },
      { id: "l2", title: "المحاضرة الثانية", isCompleted: false },
    ]
  },
  {
    id: "s5",
    name: "هنا مصطفى",
    gradeLevel: "الصف الثالث الثانوي",
    avatarLetter: "هـ",
    courseName: "الكيمياء العضوية",
    progress: 15,
    averageGrade: 45,
    lastActive: "من يومين",
    examHistory: [{ name: "امتحان 1", score: 45 }],
    lectureChecklist: [
      { id: "l1", title: "المحاضرة الأولى", isCompleted: false },
    ]
  },
];

const MOCK_COURSES_STATS = [
  { id: "c1", title: "الكيمياء العضوية", avgProgress: 65, avgGrade: 78 },
  { id: "c2", title: "الكيمياء التحليلية", avgProgress: 80, avgGrade: 85 },
  { id: "c3", title: "أساسيات الكيمياء", avgProgress: 45, avgGrade: 60 },
];

const MOCK_CONTENT_STATS = {
  lectures: [
    { id: "lc1", title: "مشتقات الهيدروكربونات - جزء 2", completionRate: 35 },
    { id: "lc2", title: "تفاعلات الإحلال", completionRate: 45 },
    { id: "lc3", title: "مقدمة الكيمياء التحليلية", completionRate: 85 },
  ],
  questions: [
    { id: "q1", text: "ما هو الناتج الرئيسي من تفاعل البنزين مع حمض النيتريك في وجود حمض الكبريتيك؟", wrongAnswerRate: 75 },
    { id: "q2", text: "احسب عدد مولات الغاز المتصاعد عند تفاعل الصوديوم مع الإيثانول.", wrongAnswerRate: 82 },
    { id: "q3", text: "أي من المركبات التالية يعطي لوناً بنفسجياً مع كلوريد الحديد الثلاثي؟", wrongAnswerRate: 40 },
  ]
};

export default function TeacherDashboardPage() {
  const hasMultipleCourses = MOCK_COURSES_STATS.length > 1;
  const atRiskCount = MOCK_STUDENTS.filter(s => s.averageGrade < 60 || s.lastActive.includes("20 يوم")).length;

  return (
    <div className="space-y-8 max-w-[1280px] mx-auto w-full">
      {/* Welcome Bar */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-ink">مرحباً، {MOCK_TEACHER_NAME} 👋</h1>
        <p className="text-sm text-text-secondary">نظرة عامة على أداء طلابك ومحتواك.</p>
      </div>

      <AtRiskBanner atRiskCount={atRiskCount} />

      <TeacherStatsOverview 
        totalStudents={15420}
        totalCourses={MOCK_COURSES_STATS.length}
        averageProgress={72}
        averageScore={81}
        newSignups7Days={145}
        estimatedRevenue30Days={45000}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Main Column */}
        <div className="min-w-0">
          <StudentsTable students={MOCK_STUDENTS} hasMultipleCourses={hasMultipleCourses} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6 shrink-0">
          <CourseComparisonWidget courses={MOCK_COURSES_STATS} />
          <ContentPerformanceWidget 
            lectures={MOCK_CONTENT_STATS.lectures}
            questions={MOCK_CONTENT_STATS.questions}
          />
        </div>
      </div>
    </div>
  );
}
