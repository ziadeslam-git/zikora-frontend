"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export interface NavLinkItem {
  label: string;
  href: string;
}

export const navLinks: readonly NavLinkItem[] = [
  { label: "الرئيسية", href: "/" },
  { label: "الكورسات", href: "/courses" },
  { label: "الأسعار والعروض", href: "/pricing" },
  { label: "المعلمون", href: "/instructors" },
  { label: "عن المنصة", href: "/about" },
] as const;

/**
 * DesktopNav — Animated Navigation Pill Menu ("use client").
 * Fixes text contrast:
 * - Active tab (with purple capsule): Pure White (text-white font-extrabold)
 * - Inactive tabs: Dark Navy in Light Mode (text-ink), Light Gray in Dark Mode.
 */
export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav
      className="hidden md:flex items-center gap-1 bg-bg-surface-2/80 p-1.5 rounded-full border border-border-theme/80 backdrop-blur-md"
      aria-label="القائمة الرئيسية"
    >
      {navLinks.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-4 py-2 text-xs transition-all duration-150 select-none rounded-full flex items-center justify-center ${
              isActive
                ? "text-white font-extrabold"
                : "text-ink font-bold hover:text-accent-500 opacity-90 hover:opacity-100"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-nav-pill-bg"
                className="absolute inset-0 bg-accent-500 rounded-full shadow-glow-accent z-0"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
            <span
              className={`relative z-10 select-none whitespace-nowrap ${
                isActive ? "text-white font-extrabold" : "text-ink font-bold"
              }`}
            >
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
