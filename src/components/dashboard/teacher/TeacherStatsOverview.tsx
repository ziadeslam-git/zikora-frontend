import { Users, BookOpen, TrendingUp, Target, UserPlus, Wallet } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

interface TeacherStatsOverviewProps {
  totalStudents: number;
  totalCourses: number;
  averageProgress: number;
  averageScore: number;
  newSignups7Days: number;
  estimatedRevenue30Days: number;
}

export function TeacherStatsOverview({
  totalStudents,
  totalCourses,
  averageProgress,
  averageScore,
  newSignups7Days,
  estimatedRevenue30Days,
}: TeacherStatsOverviewProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard
        icon={<Users />}
        label="إجمالي الطلاب"
        value={totalStudents}
        iconBgClassName="bg-blue-100 dark:bg-blue-900/30"
        iconColorClassName="text-blue-500"
      />
      <StatCard
        icon={<BookOpen />}
        label="عدد الكورسات"
        value={totalCourses}
        iconBgClassName="bg-purple-100 dark:bg-purple-900/30"
        iconColorClassName="text-purple-500"
      />
      <StatCard
        icon={<TrendingUp />}
        label="متوسط التقدم العام"
        value={`${averageProgress}%`}
        iconBgClassName="bg-emerald-100 dark:bg-emerald-900/30"
        iconColorClassName="text-emerald-500"
      />
      <StatCard
        icon={<Target />}
        label="متوسط الدرجات العام"
        value={`${averageScore}%`}
        iconBgClassName="bg-amber-100 dark:bg-amber-900/30"
        iconColorClassName="text-amber-500"
      />
      <StatCard
        icon={<UserPlus />}
        label="اشتراكات جديدة"
        value={`+${newSignups7Days}`}
        trend={{ direction: "up", value: "آخر 7 أيام", label: "معدل جيد" }}
        iconBgClassName="bg-accent-blob/30"
        iconColorClassName="text-accent-500"
      />
      <StatCard
        icon={<Wallet />}
        label="الإيراد التقريبي"
        value={`${estimatedRevenue30Days.toLocaleString("ar-EG")} ج.م`}
        trend={{ direction: "up", value: "آخر 30 يوم", label: "بدون خصم العمولة" }}
        iconBgClassName="bg-success/10"
        iconColorClassName="text-success"
      />
    </div>
  );
}
