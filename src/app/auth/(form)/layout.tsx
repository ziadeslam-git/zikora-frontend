import Link from "next/link";
import { BookOpen, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export default function AuthFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[45%_55%] bg-bg-base text-ink">
      {/* Left Column — Editorial Illustration Panel (Dark always, hidden on mobile <lg) */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-ink text-white relative overflow-hidden border-e border-white/10 select-none">
        {/* Background decorative glow */}
        <div
          className="absolute -top-24 -start-24 w-96 h-96 rounded-full bg-accent-500/20 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Top Header Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500 text-white font-bold font-latin shadow-glow-accent">
              Z
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-latin">
              Zikora
            </span>
          </Link>
        </div>

        {/* Center Illustration Placeholder & Editorial Tagline */}
        <div className="relative z-10 my-auto py-12 flex flex-col items-center text-center space-y-8 max-w-md mx-auto">
          {/* Geometric Flat Illustration Placeholder */}
          <div className="relative w-full aspect-4/3 rounded-3xl bg-brand-gradient p-8 flex flex-col items-center justify-center shadow-2xl border border-white/15 overflow-hidden group">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white shadow-lg">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <div className="mt-4 flex items-center gap-2 bg-white/15 backdrop-blur-xs px-4 py-1.5 rounded-full border border-white/20">
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span className="text-xs font-semibold text-white font-latin">
                Editorial Design Grid System
              </span>
            </div>
          </div>

          {/* Large Bold Editorial Tagline */}
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              ذاكرتك بداية تفوقك
            </h2>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs mx-auto">
              بيئة تعلم ذكية، فيديوهات محمية، وتواصل مستمر يرافق رحلتك الدراسية يومًا بيوم.
            </p>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center gap-2 pt-2">
            <span className="h-2.5 w-8 rounded-full bg-white" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
          </div>
        </div>

        {/* Bottom Footer Credits */}
        <div className="relative z-10 text-xs text-white/50 font-latin text-start">
          © {new Date().getFullYear()} Zikora Platform. All rights reserved.
        </div>
      </div>

      {/* Right Column — Form Panel (Theme-aware bg-bg-base) */}
      <div className="flex flex-col justify-between p-6 sm:p-12 relative overflow-y-auto min-h-screen">
        {/* Top Header Row with Logo (Mobile) + ThemeToggle */}
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500 text-white font-bold font-latin">
              Z
            </div>
            <span className="text-lg font-bold text-ink font-latin">Zikora</span>
          </Link>
          <div className="ms-auto">
            <ThemeToggle />
          </div>
        </div>

        {/* Main Content Area */}
        <main className="my-auto py-8 w-full max-w-md mx-auto flex flex-col justify-center">
          {children}
        </main>

        {/* Bottom Helper Links */}
        <div className="pt-6 text-center text-xs text-text-secondary">
          بمتابعة الاستخدام، فإنك توافق على{" "}
          <Link href="/terms" className="text-accent-500 underline hover:text-accent-hover">
            شروط الخدمة
          </Link>{" "}
          و{" "}
          <Link href="/privacy" className="text-accent-500 underline hover:text-accent-hover">
            سياسة الخصوصية
          </Link>
        </div>
      </div>
    </div>
  );
}
