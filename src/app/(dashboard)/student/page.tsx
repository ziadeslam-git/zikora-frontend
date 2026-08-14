import type { Metadata } from "next";
import { WelcomeHero } from "@/components/dashboard/student/WelcomeHero";
import { StatsOverview } from "@/components/dashboard/student/StatsOverview";
import { MyCoursesList } from "@/components/dashboard/student/MyCoursesList";
import { PerformanceAnalysis } from "@/components/dashboard/student/PerformanceAnalysis";
import { StudyStreakWidget } from "@/components/dashboard/student/StudyStreakWidget";
import { SmartRecommendation } from "@/components/dashboard/student/SmartRecommendation";
import { MyTeachersWidget } from "@/components/dashboard/student/MyTeachersWidget";
import { ParentReportPreview } from "@/components/dashboard/student/ParentReportPreview";

export const metadata: Metadata = {
  title: "الداشبورد — Zikora",
  description: "داشبورد الطالب: متابعة التقدم، الدرجات، والتقارير الأسبوعية.",
};

// ----------------------------------------------------------------------
// Mock Data (To be replaced by real API calls in backend integration phase)
// ----------------------------------------------------------------------

const MOCK_STUDENT_NAME = "أحمد";
const MOCK_IS_NEW_STUDENT = false; // Toggle this to test the empty state

const MOCK_ENROLLED_COURSES = [
  { id: "chemistry-organic", title: "الكيمياء العضوية والتحليلية بالكامل مع بنك الأسئلة", teacherName: "أ. سامح إبراهيم", progressPercentage: 60 },
  { id: "physics-3rd-sec", title: "كورس الفيزياء الكلاسيكية والكهربية", teacherName: "أ. محمد عبدالمعبود", progressPercentage: 85 },
  { id: "math-calculus", title: "التفاضل والتكامل والتطبيقات للثانوية العامة", teacherName: "د. أحمد سليمان", progressPercentage: 100 },
];

const MOCK_EXAM_SCORES = [
  { name: "أغسطس 1", score: 65, classAverage: 70 },
  { name: "أغسطس 2", score: 68, classAverage: 71 },
  { name: "سبتمبر 1", score: 72, classAverage: 70 },
  { name: "سبتمبر 2", score: 70, classAverage: 72 },
  { name: "أكتوبر 1", score: 75, classAverage: 73 },
  { name: "أكتوبر 2", score: 82, classAverage: 75 },
  { name: "نوفمبر 1", score: 85, classAverage: 74 },
  { name: "نوفمبر 2", score: 88, classAverage: 76 },
];

const MOCK_SUBJECTS_ACCURACY = [
  { subject: "الكيمياء", accuracy: 58 },
  { subject: "الفيزياء", accuracy: 75 },
  { subject: "اللغة العربية", accuracy: 82 },
  { subject: "الرياضيات", accuracy: 95 },
];

const MOCK_TEACHERS = [
  { id: "t1", slug: "sameh-ibrahim", name: "أ. سامح إبراهيم", subject: "الكيمياء" },
  { id: "t2", slug: "mohamed-abdelmaaboud", name: "أ. محمد عبدالمعبود", subject: "الفيزياء" },
  { id: "t3", slug: "ahmed-soliman", name: "د. أحمد سليمان", subject: "الرياضيات" },
];

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6 max-w-[1280px] mx-auto w-full">
      {/* Top Welcome Section (Full Width) */}
      <WelcomeHero 
        studentName={MOCK_STUDENT_NAME} 
        isNewStudent={MOCK_IS_NEW_STUDENT} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Main Content Column (Left on LTR, Right on RTL) */}
        <div className="space-y-6 min-w-0">
          <StatsOverview
            progressAvg={81}
            scoreAvg={78}
            scoreTrend={{ direction: "up", value: "+5.2%" }}
            streakDays={14}
            certificatesEarned={1}
            certificatesInProgress={2}
          />

          <MyCoursesList courses={MOCK_ENROLLED_COURSES} />
          
          <PerformanceAnalysis 
            examScores={MOCK_EXAM_SCORES} 
            subjectsAccuracy={MOCK_SUBJECTS_ACCURACY} 
          />
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6 shrink-0">
          <StudyStreakWidget 
            streakDays={14} 
            last7DaysActivity={[true, true, true, false, true, true, true]} 
          />
          
          <SmartRecommendation 
            weakestSubject={MOCK_SUBJECTS_ACCURACY[0]?.subject ?? "المادة"} 
            remainingLecturesInSubject={12}
            courseId="chemistry-organic"
          />
          
          <MyTeachersWidget teachers={MOCK_TEACHERS} />
        </div>
      </div>

      {/* Parent Report Section (Full Width at Bottom) */}
      <ParentReportPreview 
        lecturesWatchedCount={8}
        averageScore={78}
        attendancePercentage={85}
        nextReportDay="الخميس"
      />
    </div>
  );
}
