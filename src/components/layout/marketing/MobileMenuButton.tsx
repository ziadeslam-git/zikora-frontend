"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface MobileMenuButtonProps {
  navLinks: readonly NavLinkItem[];
}

export function MobileMenuButton({ navLinks }: MobileMenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on Escape key press and prevent scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-ink rounded-lg hover:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
        aria-expanded={isOpen}
      >
        <div className={cn("transition-transform duration-300", isOpen && "rotate-180")}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </div>
      </button>

      {/* Slide-in Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 end-0 z-50 w-full max-w-xs bg-base-white p-6 shadow-xl border-s border-neutral-200 flex flex-col justify-between md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="القائمة الرئيسية"
            >
              <div className="space-y-6">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white font-bold font-latin">
                      Z
                    </div>
                    <span className="text-lg font-bold text-ink font-latin">Zikora</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-neutral-600 rounded-lg hover:bg-neutral-100 transition-colors"
                    aria-label="إغلاق القائمة"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2" aria-label="روابط التنقل">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-base font-semibold text-ink hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-6 border-t border-neutral-200">
                <Link href="/auth/login" onClick={() => setIsOpen(false)} className="w-full">
                  <Button variant="outline" size="md" className="w-full">
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={() => setIsOpen(false)} className="w-full">
                  <Button variant="primary" size="md" className="w-full">
                    ابدأ الآن
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
