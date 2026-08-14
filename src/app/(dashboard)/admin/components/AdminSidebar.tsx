"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Mail, FileText, Users, Settings, HelpCircle, LogOut } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const topIcons = [
  { name: "الرئيسية", href: "/admin", icon: LayoutDashboard },
  { name: "المعلمين", href: "/admin/teachers", icon: Users },
  { name: "الطلاب", href: "/admin/students", icon: Calendar },
  { name: "المدفوعات", href: "/admin/payments", icon: FileText },
  { name: "سجل العمليات", href: "/admin/audit-log", icon: Mail },
];

const bottomIcons = [
  { name: "الإعدادات", href: "/admin/settings", icon: Settings },
  { name: "المساعدة", href: "/help", icon: HelpCircle },
];

export default function AdminSidebar() {
  const pathname = usePathname() || "";

  return (
    <aside className="hidden lg:flex w-20 shrink-0 flex-col items-center py-6 bg-bg-base rounded-full shadow-sm border border-border-theme h-[calc(100vh-3rem)] sticky top-6">
      
      {/* Top Icons */}
      <nav className="flex-1 space-y-4 w-full flex flex-col items-center">
        {topIcons.map((item) => {
          const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              title={item.name}
              className={cn(
                "p-3 rounded-full flex items-center justify-center transition-all duration-200",
                isActive
                  ? "bg-ink text-bg-base shadow-md"
                  : "text-text-secondary hover:bg-surface-2 hover:text-ink"
              )}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          );
        })}
      </nav>

      {/* Bottom Icons */}
      <div className="space-y-4 w-full flex flex-col items-center mt-auto">
        {bottomIcons.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              title={item.name}
              className={cn(
                "p-3 rounded-full flex items-center justify-center transition-all duration-200",
                isActive
                  ? "bg-ink text-bg-base shadow-md"
                  : "text-text-secondary hover:bg-surface-2 hover:text-ink"
              )}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          );
        })}
        <Link href="/" title="تسجيل الخروج">
          <button className="p-3 rounded-full flex items-center justify-center text-text-secondary hover:bg-danger-cta/10 hover:text-danger-cta transition-all duration-200">
            <LogOut className="h-5 w-5" />
          </button>
        </Link>
      </div>
    </aside>
  );
}
