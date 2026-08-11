import Link from "next/link";
import { HeaderScrollWrapper } from "./HeaderScrollWrapper";
import { MobileMenuButton } from "./MobileMenuButton";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "الكورسات", href: "/courses" },
  { label: "المعلمون", href: "/instructors" },
  { label: "عن المنصة", href: "/about" },
] as const;

/**
 * Marketing Header — Server Component.
 * Dual-theme header using theme tokens exclusively.
 */
export function Header() {
  return (
    <HeaderScrollWrapper>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 group"
          aria-label="Zikora — الصفحة الرئيسية"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500 shadow-glow-accent transition-transform duration-200 group-hover:scale-105">
            <span className="text-white text-base font-bold select-none font-latin">Z</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-ink font-latin">
            Zikora
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="القائمة الرئيسية">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink transition-colors duration-150 hover:text-accent-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">
              تسجيل الدخول
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="primary" size="sm">
              ابدأ الآن
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Trigger & Panel (ThemeToggle stays visible on mobile) */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileMenuButton navLinks={navLinks} />
        </div>
      </div>
    </HeaderScrollWrapper>
  );
}
