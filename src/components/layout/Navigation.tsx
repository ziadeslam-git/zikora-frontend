"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface NavItem {
  label: string;
  href: string;
  children?: Array<{ label: string; href: string; description?: string }>;
}

const navItems: NavItem[] = [
  { label: "الرئيسية", href: "/" },
  {
    label: "الكورسات",
    href: "/courses",
    children: [
      {
        label: "جميع الكورسات",
        href: "/courses",
        description: "استعرض مكتبة الكورسات الكاملة",
      },
      {
        label: "الأكثر مشاهدة",
        href: "/courses/popular",
        description: "الكورسات الأعلى تقييمًا",
      },
      {
        label: "المجانية",
        href: "/courses/free",
        description: "ابدأ التعلم مجانًا",
      },
    ],
  },
  { label: "المعلمون", href: "/instructors" },
  { label: "من نحن", href: "/about" },
];

// ─── Desktop NavLink ──────────────────────────────────────────────────────────
function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive =
    pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={cn(
          "relative px-3 py-2 text-sm font-medium transition-colors duration-150",
          "rounded-[var(--radius-sm)]",
          "hover:text-primary",
          isActive ? "text-primary" : "text-foreground",
        )}
      >
        {item.label}
        {isActive && (
          <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
        )}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-[var(--radius-sm)]",
          "transition-colors duration-150 hover:text-primary",
          isActive ? "text-primary" : "text-foreground",
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute top-full end-0 mt-2 w-64",
          "rounded-[var(--radius-lg)] border border-border shadow-lg glass",
          "transition-all duration-200 origin-top-end",
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        <div className="p-2 space-y-0.5">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={cn(
                "flex flex-col gap-0.5 px-3 py-2.5 rounded-[var(--radius-md)]",
                "hover:bg-primary-light hover:text-primary-dark",
                "transition-colors duration-150",
              )}
            >
              <span className="text-sm font-medium">{child.label}</span>
              {child.description && (
                <span className="text-xs text-foreground-muted">{child.description}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-neutral-950/50 backdrop-blur-sm md:hidden",
          "transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 end-0 bottom-0 z-50 w-72 md:hidden",
          "glass border-s border-border shadow-xl",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="القائمة الرئيسية"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="text-lg font-bold text-primary">Zikora</span>
          <button
            onClick={onClose}
            className="p-2 rounded-[var(--radius-sm)] hover:bg-background-subtle text-foreground-muted hover:text-foreground transition-colors"
            aria-label="إغلاق القائمة"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="p-4 space-y-1" aria-label="القائمة المحمولة">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium",
                    "transition-colors duration-150",
                    isActive
                      ? "bg-primary-light text-primary"
                      : "text-foreground hover:bg-background-subtle hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mt-1 ms-4 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center px-3 py-2 rounded-[var(--radius-md)] text-xs text-foreground-muted hover:text-primary hover:bg-background-subtle transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="absolute bottom-0 start-0 end-0 p-4 border-t border-border space-y-2">
          <Link href="/auth/login" className="block">
            <Button variant="outline" size="md" className="w-full">
              تسجيل الدخول
            </Button>
          </Link>
          <Link href="/auth/register" className="block">
            <Button variant="primary" size="md" className="w-full">
              ابدأ مجانًا
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

// ─── Navigation (exported) ────────────────────────────────────────────────────
export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Nav */}
      <nav
        className="hidden md:flex items-center gap-1"
        aria-label="القائمة الرئيسية"
      >
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>

      {/* Mobile Trigger */}
      <button
        className="md:hidden p-2 rounded-[var(--radius-sm)] hover:bg-background-subtle text-foreground-muted hover:text-foreground transition-colors"
        onClick={() => setMobileOpen(true)}
        aria-label="فتح القائمة"
        aria-expanded={mobileOpen}
      >
        <Menu className="h-5 w-5" />
      </button>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
