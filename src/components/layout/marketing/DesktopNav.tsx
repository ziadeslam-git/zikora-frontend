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
 * Uses motion/react for 60fps buttery-smooth active tab indicator.
 * Ensures active tab text is ALWAYS pure white (!text-white) in both themes.
 */
export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-1 bg-bg-surface-2/60 p-1.5 rounded-full border border-border-theme/60 backdrop-blur-md" aria-label="القائمة الرئيسية">
      {navLinks.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-4 py-2 text-xs font-bold transition-colors duration-150 select-none rounded-full flex items-center justify-center ${
              isActive ? "!text-white font-extrabold" : "text-text-secondary hover:text-ink"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-nav-pill-bg"
                className="absolute inset-0 bg-accent-500 rounded-full shadow-glow-accent z-0"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 35,
                }}
              />
            )}
            <span className="relative z-10 !text-white select-none whitespace-nowrap" style={{ color: isActive ? "#FFFFFF" : undefined }}>
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
