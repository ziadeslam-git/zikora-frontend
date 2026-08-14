export interface AdminOverviewStats {
  totalTeachers: number;
  totalStudents: number;
  publishedCourses: number;
  revenue: {
    amount: number;
    currency: string;
  };
  paymentSuccessRate: number;
  apiP95Ms: number;
}

export interface AdminGrowthPoint {
  date: string;
  teachers: number;
  students: number;
  revenue?: number;
}

export interface PendingTeacher {
  id: string;
  name: string;
  email?: string;
  subject?: string;
  registeredAt: string;
  status: "pending";
}

export interface AdminAlert {
  id: string;
  type: "warning" | "danger" | "info";
  title: string;
  description: string;
  href?: string;
}
