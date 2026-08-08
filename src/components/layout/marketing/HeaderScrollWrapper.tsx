"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface HeaderScrollWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * HeaderScrollWrapper — Client Component wrapper for the Marketing Header shell.
 * Adds sticky glassmorphism styling (`bg-white/95 backdrop-blur-md shadow-sm`)
 * when window.scrollY > 80.
 */
export function HeaderScrollWrapper({
  children,
  className,
}: HeaderScrollWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200/60"
          : "bg-transparent",
        className,
      )}
    >
      {children}
    </header>
  );
}
