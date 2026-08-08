"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  GraduationCap,
  Award,
  Users,
  FileText,
  BarChart3,
  CreditCard,
  ShieldAlert,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type DashboardRole = "student" | "teacher" | "admin";

export interface DashboardSidebarProps {
  role: DashboardRole;
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

interface SidebarLinkItem {
  label: string;
  href: string;
  icon: LucideIcon;
  isLogout?: boolean;
}

const roleMenuLinks: Record<DashboardRole, SidebarLinkItem[]> = {
  student: [
    { label: "الرئيسية", href: "/dashboard/student", icon: Home },
    { label: "كورساتي", href: "/dashboard/student/courses", icon: BookOpen },
    { label: "جدول الدرجات", href: "/dashboard/student/grades", icon: GraduationCap },
    { label: "الشهادات", href: "/dashboard/student/certificates", icon: Award },
  ],
  teacher: [
    { label: "الرئيسية", href: "/dashboard/teacher", icon: Home },
    { label: "طلابي", href: "/dashboard/teacher/students", icon: Users },
    { label: "المواد والكورسات", href: "/dashboard/teacher/courses", icon: BookOpen },
    { label: "الامتحانات", href: "/dashboard/teacher/exams", icon: FileText },
    { label: "الإحصائيات", href: "/dashboard/teacher/analytics", icon: BarChart3 },
  ],
  admin: [
    { label: "الرئيسية", href: "/dashboard/admin", icon: Home },
    { label: "المدرسين", href: "/dashboard/admin/teachers", icon: GraduationCap },
    { label: "الطلاب", href: "/dashboard/admin/students", icon: Users },
    { label: "المدفوعات", href: "/dashboard/admin/payments", icon: CreditCard },
    { label: "Audit Log", href: "/dashboard/admin/audit-log", icon: ShieldAlert },
  ],
};

const generalLinks: SidebarLinkItem[] = [
  { label: "البروفايل", href: "/dashboard/profile", icon: User },
  { label: "الإعدادات", href: "/dashboard/settings", icon: Settings },
  { label: "المساعدة", href: "/dashboard/help", icon: HelpCircle },
  { label: "تسجيل خروج", href: "/auth/login", icon: LogOut, isLogout: true },
];

export function DashboardSidebar({
  role,
  isCollapsed,
  onToggle,
  className,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  // Persist collapsed state to localStorage on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zikora-sidebar-collapsed");
      if (saved !== null) {
        const isSavedCollapsed = saved === "true";
        if (isSavedCollapsed !== isCollapsed) {
          onToggle();
        }
      }
    } catch {
      // Ignore localStorage errors (e.g. SSR or restricted context)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = () => {
    const nextState = !isCollapsed;
    try {
      localStorage.setItem("zikora-sidebar-collapsed", String(nextState));
    } catch {
      // Ignore localStorage errors
    }
    onToggle();
  };

  const menuLinks = roleMenuLinks[role] ?? roleMenuLinks.student;

  const renderLink = (item: SidebarLinkItem) => {
    const Icon = item.icon;
    const isActive =
      pathname === item.href ||
      (item.href !== "/dashboard/student" &&
        item.href !== "/dashboard/teacher" &&
        item.href !== "/dashboard/admin" &&
        pathname.startsWith(item.href));

    return (
      <Link
        key={item.href}
        href={item.href}
        title={isCollapsed ? item.label : undefined}
        className={cn(
          "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 select-none",
          isActive
            ? "bg-orange-500/10 text-orange-600 font-semibold"
            : item.isLogout
              ? "text-danger hover:bg-red-50 hover:text-danger"
              : "text-neutral-700 hover:bg-neutral-100 hover:text-ink",
          isCollapsed && "justify-center px-0",
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5 shrink-0 transition-colors",
            isActive
              ? "text-orange-600"
              : item.isLogout
                ? "text-danger"
                : "text-neutral-500 group-hover:text-ink",
          )}
        />
        {!isCollapsed && <span className="truncate">{item.label}</span>}

        {/* Floating tooltip on hover when collapsed */}
        {isCollapsed && (
          <div className="absolute start-full ms-2 hidden rounded-md bg-ink px-2.5 py-1 text-xs font-medium text-white shadow-md group-hover:block z-50 whitespace-nowrap">
            {item.label}
          </div>
        )}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "flex flex-col justify-between border-e border-neutral-200 bg-base-white transition-all duration-300 ease-in-out shrink-0",
        isCollapsed ? "w-[72px]" : "w-64",
        className,
      )}
      aria-label="شريط التنقل الجانبي"
    >
      <div className="flex flex-col">
        {/* Top Logo & Toggle */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-neutral-200">
          <Link
            href="/"
            className={cn("flex items-center gap-2 overflow-hidden", isCollapsed && "justify-center w-full")}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white font-bold font-latin shrink-0">
              Z
            </div>
            {!isCollapsed && (
              <span className="text-lg font-bold tracking-tight text-ink font-latin">
                Zikora
              </span>
            )}
          </Link>

          {!isCollapsed && (
            <button
              type="button"
              onClick={handleToggle}
              className="p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-ink rounded-lg transition-colors"
              aria-label="طي القائمة الجانبية"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>
          )}
        </div>

        {/* Role label badge */}
        {!isCollapsed && (
          <div className="px-4 py-2.5 bg-neutral-100/60 border-b border-neutral-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              {role === "student" && "لوحة الطالب"}
              {role === "teacher" && "لوحة المعلم"}
              {role === "admin" && "لوحة المسؤول"}
            </span>
          </div>
        )}

        {/* Section 1: MENU */}
        <nav className="p-3 space-y-1" aria-label="القائمة الرئيسية">
          {!isCollapsed && (
            <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              MENU
            </p>
          )}
          {menuLinks.map(renderLink)}
        </nav>

        <div className="my-1 border-t border-neutral-200 mx-3" />

        {/* Section 2: GENERAL */}
        <nav className="p-3 space-y-1" aria-label="الإعدادات العامة">
          {!isCollapsed && (
            <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              GENERAL
            </p>
          )}
          {generalLinks.map(renderLink)}
        </nav>
      </div>

      {/* Expand Toggle Button when collapsed */}
      {isCollapsed && (
        <div className="p-3 border-t border-neutral-200 flex justify-center">
          <button
            type="button"
            onClick={handleToggle}
            className="p-2 text-neutral-500 hover:bg-neutral-100 hover:text-ink rounded-lg transition-colors"
            aria-label="توسيع القائمة الجانبية"
          >
            <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
          </button>
        </div>
      )}
    </aside>
  );
}
