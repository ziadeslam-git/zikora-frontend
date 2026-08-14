"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "../admin/components/AdminSidebar";

export default function SidebarWrapper() {
  const pathname = usePathname() || "";

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <aside
      className="hidden lg:flex w-64 shrink-0 flex-col border-e border-border-theme bg-bg-base"
      aria-label="قائمة الداشبورد"
    >
      <div className="flex h-16 items-center px-6 border-b border-border-theme">
        <span className="text-lg font-bold text-ink">Zikora</span>
      </div>
      <div className="flex-1 p-4 text-sm text-text-secondary">
        الشريط الجانبي — سيُبنى في تاسك الداشبورد
      </div>
    </aside>
  );
}
