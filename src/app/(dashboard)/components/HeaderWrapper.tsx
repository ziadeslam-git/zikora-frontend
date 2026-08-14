"use client";

import { usePathname } from "next/navigation";

export default function HeaderWrapper() {
  const pathname = usePathname() || "";

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-20 h-16 flex items-center border-b border-border-theme bg-bg-base px-4 sm:px-6">
      <span className="text-sm text-text-secondary">
        شريط أدوات الداشبورد — سيُبنى في تاسك الداشبورد
      </span>
    </header>
  );
}
