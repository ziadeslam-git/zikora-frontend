import Link from "next/link";
import { HeaderScrollWrapper } from "./HeaderScrollWrapper";
import { DesktopNav, navLinks } from "./DesktopNav";
import { MobileMenuButton } from "./MobileMenuButton";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";

/**
 * Marketing Header — Server Component.
 * Glassmorphic navigation header featuring animated active route pill indicator.
 */
export function Header() {
  return (
    <HeaderScrollWrapper>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 group"
          aria-label="Zikora — الصفحة الرئيسية"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-500 shadow-glow-accent transition-transform duration-200 group-hover:scale-105">
            <span className="text-white text-lg font-extrabold select-none font-latin">Z</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-ink font-latin">
            Zikora
          </span>
        </Link>

        {/* Animated Desktop Navigation Links */}
        <DesktopNav />

        {/* Desktop Actions & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="font-bold text-xs">
              تسجيل الدخول
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="gradient" size="sm" className="font-bold text-xs shadow-glow-accent">
              ابدأ الآن
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Trigger & Panel */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileMenuButton navLinks={navLinks} />
        </div>
      </div>
    </HeaderScrollWrapper>
  );
}
