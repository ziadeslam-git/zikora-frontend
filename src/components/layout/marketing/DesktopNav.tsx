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
 * DesktopNav — Animated Navigation Menu ("use client").
 * Features glassmorphic pill backdrop with smooth layout animation (motion/react layoutId).
 */
export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-1.5 bg-bg-surface-2/80 p-1.5 rounded-full border border-border-theme/80 backdrop-blur-md shadow-inner" aria-label="القائمة الرئيسية">
      {navLinks.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-4 py-2 text-xs font-bold transition-colors duration-200 select-none rounded-full ${
              isActive ? "text-white" : "text-text-secondary hover:text-ink"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-nav-pill"
                className="absolute inset-0 bg-accent-500 rounded-full shadow-glow-accent -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
