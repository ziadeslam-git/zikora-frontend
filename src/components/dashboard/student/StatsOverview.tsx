import { BookOpen, Target, Flame, Award } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

interface StatsOverviewProps {
  progressAvg: number;
  scoreAvg: number;
  scoreTrend: {
    direction: "up" | "down";
    value: string;
  };
  streakDays: number;
  certificatesEarned: number;
  certificatesInProgress: number;
}

export function StatsOverview({
  progressAvg,
  scoreAvg,
  scoreTrend,
  streakDays,
  certificatesEarned,
  certificatesInProgress,
}: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<BookOpen />}
        label="متوسط التقدم"
        value={`${progressAvg}%`}
        iconBgClassName="bg-blue-100 dark:bg-blue-900/30"
        iconColorClassName="text-blue-500"
      />
      <StatCard
        icon={<Target />}
        label="متوسط الدرجات"
        value={`${scoreAvg}%`}
        trend={{
          direction: scoreTrend.direction,
          value: scoreTrend.value,
          label: "عن آخر 5 امتحانات",
        }}
        iconBgClassName="bg-emerald-100 dark:bg-emerald-900/30"
        iconColorClassName="text-emerald-500"
      />
      <StatCard
        icon={<Flame />}
        label="Study Streak"
        value={`${streakDays} أيام`}
        iconBgClassName="bg-orange-100 dark:bg-orange-900/30"
        iconColorClassName="text-orange-500"
      />
      <StatCard
        icon={<Award />}
        label="الشهادات"
        value={`${certificatesEarned} مكتملة`}
        trend={{
          direction: "up",
          value: `${certificatesInProgress}`,
          label: "قيد التقدم حالياً",
        }}
        iconBgClassName="bg-purple-100 dark:bg-purple-900/30"
        iconColorClassName="text-purple-500"
      />
    </div>
  );
}
