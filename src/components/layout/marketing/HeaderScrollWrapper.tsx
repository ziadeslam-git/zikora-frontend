"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface HeaderScrollWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * HeaderScrollWrapper — Floating Top Island Navigation Wrapper.
 * Floating rounded capsule layout without full-width rectangular background blocks.
 */
export function HeaderScrollWrapper({
  children,
  className,
}: HeaderScrollWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-4 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-none",
        className,
      )}
    >
      <div
        className={cn(
          "max-w-6xl mx-auto rounded-full transition-all duration-300 pointer-events-auto backdrop-blur-2xl border px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-lg",
          isScrolled
            ? "bg-bg-base/90 border-border-theme shadow-xl py-2"
            : "bg-bg-base/75 border-border-theme/60 shadow-md",
        )}
      >
        {children}
      </div>
    </header>
  );
}
