"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface HeaderScrollWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * HeaderScrollWrapper — Client Component wrapper for the Marketing Header.
 * Adds glassmorphism backdrop blur and translucent background.
 */
export function HeaderScrollWrapper({
  children,
  className,
}: HeaderScrollWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-xl border-b",
        isScrolled
          ? "bg-bg-base/85 border-border-theme shadow-sm py-1"
          : "bg-bg-base/70 border-border-theme/40 py-2",
        className,
      )}
    >
      {children}
    </header>
  );
}
