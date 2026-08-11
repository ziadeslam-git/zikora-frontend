import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-base text-ink flex flex-col justify-between p-6 sm:p-12">
      {/* Top Header Row with Logo & ThemeToggle */}
      <div className="mx-auto flex h-16 w-full max-w-xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500 text-white font-bold font-latin shadow-glow-accent">
            Z
          </div>
          <span className="text-lg font-bold text-ink font-latin">Zikora</span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Main Centered Content Wrapper */}
      <main className="my-auto py-8 w-full max-w-xl mx-auto">
        {children}
      </main>

      {/* Footer Note */}
      <div className="text-center text-xs text-text-secondary">
        خطوات بسيطة لإعداد حسابك وتخصيص تجربتك
      </div>
    </div>
  );
}
