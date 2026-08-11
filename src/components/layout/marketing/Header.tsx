import Link from "next/link";
import { HeaderScrollWrapper } from "./HeaderScrollWrapper";
import { DesktopNav, navLinks } from "./DesktopNav";
import { MobileMenuButton } from "./MobileMenuButton";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";

/**
 * Marketing Header — Server Component.
 * Floating capsule navigation header with glassmorphic active pill indicator.
 */
export function Header() {
  return (
    <HeaderScrollWrapper>
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2.5 shrink-0 group"
        aria-label="Zikora — الصفحة الرئيسية"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-500 shadow-glow-accent transition-transform duration-200 group-hover:scale-105">
          <span className="text-white text-base font-extrabold select-none font-latin">Z</span>
        </div>
        <span className="text-lg font-extrabold tracking-tight text-ink font-latin">
          Zikora
        </span>
      </Link>

      {/* Animated Desktop Navigation Pill Links */}
      <DesktopNav />

      {/* Desktop Actions & Theme Toggle */}
      <div className="hidden md:flex items-center gap-2.5">
        <ThemeToggle />
        <Link href="/auth/login">
          <Button variant="ghost" size="sm" className="font-bold text-xs rounded-full">
            تسجيل الدخول
          </Button>
        </Link>
        <Link href="/auth/register">
          <Button variant="gradient" size="sm" className="font-bold text-xs rounded-full shadow-glow-accent">
            ابدأ الآن
          </Button>
        </Link>
      </div>

      {/* Mobile Menu Trigger & Panel */}
      <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <MobileMenuButton navLinks={navLinks} />
      </div>
    </HeaderScrollWrapper>
  );
}
