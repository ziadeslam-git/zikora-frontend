"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "الرئيسية", href: "/admin" },
  { name: "المعلمين", href: "/admin/teachers" },
  { name: "الطلاب", href: "/admin/students" },
  { name: "المدفوعات", href: "/admin/payments" },
  { name: "سجل العمليات", href: "/admin/audit-log" },
];

export default function AdminNavbar() {
  const pathname = usePathname() || "";
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full transition-all duration-300 rounded-full",
        scrolled
          ? "glass shadow-md border-b border-border-theme bg-bg-surface/80 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-6">
        
        {/* Brand & Home Link */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 group"
            title="العودة للصفحة الرئيسية"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-accent-500 shadow-glow transition-transform duration-200 group-hover:scale-105">
              <span className="text-white text-sm font-bold select-none">Z</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-ink hidden sm:block font-latin">
              Zikora
            </span>
          </Link>
          
          {/* Main Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-ink text-bg-base" // Inverted colors for active state
                      : "text-text-secondary hover:text-ink hover:bg-bg-surface-2"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side Tools */}
        <div className="flex items-center gap-2">
          
          <Link href="/" title="زيارة الموقع">
            <button className="p-2 text-text-secondary hover:text-ink hover:bg-bg-surface-2 rounded-full transition-colors flex items-center gap-2">
              <Home className="w-5 h-5" />
            </button>
          </Link>
          
          <div className="relative group">
            <button aria-label="بحث" className="p-2 text-text-secondary hover:text-ink hover:bg-bg-surface-2 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="الإشعارات"
              className="p-2 text-text-secondary hover:text-ink hover:bg-bg-surface-2 rounded-full transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-cta rounded-full border-2 border-bg-base"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute top-12 left-0 w-64 bg-bg-surface border border-border-theme rounded-2xl shadow-xl p-4 animate-in fade-in zoom-in duration-200 text-start">
                <h4 className="text-sm font-bold text-ink mb-2">الإشعارات</h4>
                <div className="text-xs text-text-secondary py-2 border-b border-border-theme">
                  <span className="font-semibold text-ink">معلم جديد:</span> طلب انضمام من أحمد سيد.
                </div>
                <div className="text-xs text-text-secondary py-2">
                  <span className="font-semibold text-ink">النظام:</span> تم عمل نسخة احتياطية بنجاح.
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3 ps-3 border-s border-border-theme ms-1">
            <div className="w-9 h-9 rounded-full bg-accent-500/20 text-accent-text flex items-center justify-center font-bold text-sm font-latin">
              AD
            </div>
            <div className="hidden sm:block text-start">
              <div className="text-sm font-bold text-ink leading-tight font-latin">Admin User</div>
              <div className="text-xs text-text-secondary font-latin">admin@zikora.edu</div>
            </div>
          </div>
        </div>
        
      </div>
    </header>
  );
}
