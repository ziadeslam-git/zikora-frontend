"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "./Navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Header — Marketing layout header.
 *
 * Server-side rendering note: This is a Client Component because it needs
 * scroll state for the sticky/glass effect. The heavy content (nav items,
 * page body) remain Server Components — only the header shell is client-side.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full transition-all duration-300",
        scrolled
          ? "glass shadow-md border-b border-border"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 group"
          aria-label="Zikora — الصفحة الرئيسية"
        >
          {/* Logo mark */}
          <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-primary shadow-glow transition-transform duration-200 group-hover:scale-105">
            <span className="text-white text-sm font-bold select-none">Z</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Zikora
          </span>
        </Link>

        {/* Desktop Navigation (Server-rendered nav items are inside Navigation) */}
        <Navigation />

        {/* Auth CTA — Desktop only */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">تسجيل الدخول</Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="primary" size="sm">ابدأ مجانًا</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
