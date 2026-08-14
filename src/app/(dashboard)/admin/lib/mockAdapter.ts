import { AdminOverviewStats, AdminGrowthPoint, PendingTeacher, AdminAlert } from "./types";

/**
 * Temporary Mock Adapter for Admin Overview.
 * Simulates network delay and returns mock data strictly representing the educational domain.
 */
const DELAY_MS = 800;

export async function fetchAdminStats(): Promise<AdminOverviewStats> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalTeachers: 1245,
        totalStudents: 45200,
        publishedCourses: 3420,
        revenue: {
          amount: 1250000,
          currency: "EGP",
        },
        paymentSuccessRate: 99.4,
        apiP95Ms: 310,
      });
    }, DELAY_MS);
  });
}

export async function fetchGrowthAnalytics(): Promise<AdminGrowthPoint[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { date: "يناير", teachers: 800, students: 20000, revenue: 1000000 },
        { date: "فبراير", teachers: 950, students: 25000, revenue: 1100000 },
        { date: "مارس", teachers: 1050, students: 30000, revenue: 1150000 },
        { date: "أبريل", teachers: 1120, students: 35000, revenue: 1200000 },
        { date: "مايو", teachers: 1200, students: 40000, revenue: 1220000 },
        { date: "يونيو", teachers: 1245, students: 45200, revenue: 1250000 },
      ]);
    }, DELAY_MS + 200);
  });
}

export async function fetchPendingTeachers(): Promise<PendingTeacher[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "T-001", name: "محمد رمضان", subject: "الفيزياء", registeredAt: "منذ ساعتين", status: "pending" },
        { id: "T-002", name: "أحمد سيد", subject: "الكيمياء", registeredAt: "اليوم", status: "pending" },
        { id: "T-003", name: "فاطمة الزهراء", subject: "الأحياء", registeredAt: "أمس", status: "pending" },
        { id: "T-004", name: "محمود حسن", subject: "الرياضيات", registeredAt: "منذ 3 أيام", status: "pending" },
      ]);
    }, DELAY_MS + 400);
  });
}

export async function fetchAdminAlerts(): Promise<AdminAlert[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "a1",
          type: "warning",
          title: "طلبات معلمين متراكمة",
          description: "يوجد 4 طلبات انضمام للمعلمين قيد الانتظار لأكثر من 24 ساعة.",
        },
        {
          id: "a2",
          type: "danger",
          title: "بطء في استجابة الخادم",
          description: "زمن استجابة واجهة برمجة التطبيقات تجاوز 300 مللي ثانية.",
        },
      ]);
    }, DELAY_MS + 100);
  });
}
