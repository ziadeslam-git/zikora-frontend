import Link from "next/link";
import { ArrowLeft, BookOpen, Star, Laptop, Play, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Hero — Re-engineered Marketing Homepage Hero Section (Server Component).
 * High-converting, vibrant design with electric orange accents, non-overflowing
 * floating badge cards, and crisp RTL typography.
 */
export function Hero() {
  return (
    <section className="relative overflow-x-clip pt-36 pb-20 lg:pt-44 lg:pb-28 px-6 lg:px-8 max-w-[1280px] mx-auto">
      {/* Background Decorative Glow Blobs */}
      <div
        className="absolute top-12 start-1/2 -translate-x-1/2 -z-10 w-[700px] h-[500px] rounded-full bg-gradient-to-tr from-orange-200/50 via-orange-100/30 to-transparent blur-3xl opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Copy & Actions (Spans 7 columns on Desktop) */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-start">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 border border-orange-200 shadow-xs">
            <Sparkles className="h-4 w-4 text-orange-500 shrink-0" aria-hidden="true" />
            <span className="text-sm font-semibold text-orange-700">
              منصة معتمدة لأكثر من 500 معلم في مصر
            </span>
          </div>

          {/* H1 Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink leading-[1.15] tracking-tight">
            ذاكر صح، وابقى{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#E03E00] bg-clip-text text-transparent underline decoration-orange-300 decoration-wavy underline-offset-8">
              الأول
            </span>{" "}
            في ثانويتك
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-neutral-600 max-w-xl leading-relaxed font-normal">
            تعلّم من أفضل معلمي مصر، وشاهد فيديوهات محمية عالية الجودة، وحل امتحانات تفاعلية مع تقرير أسبوعي يصل لولي أمرك تلقائيًا عبر الواتساب.
          </p>

          {/* CTA Buttons Row */}
          <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
            <Link href="/auth/register" className="w-full sm:w-auto">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto shadow-glow-orange text-base font-bold">
                <span>ابدأ التعلم الآن</span>
                <ArrowLeft className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />
              </Button>
            </Link>
            <Link href="/courses" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base font-semibold border-neutral-300 text-neutral-800 hover:border-orange-500 hover:text-orange-600 bg-white">
                استعرض الكورسات
              </Button>
            </Link>
          </div>

          {/* Trust Mini-row */}
          <div className="pt-4 flex items-center gap-4 text-sm text-neutral-600">
            <div className="flex -space-x-2.5 rtl:space-x-reverse">
              {[
                { bg: "bg-orange-500", text: "أ" },
                { bg: "bg-amber-500", text: "م" },
                { bg: "bg-neutral-800", text: "س" },
                { bg: "bg-orange-600", text: "ف" },
              ].map((avatar, idx) => (
                <div
                  key={idx}
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${avatar.bg} text-white font-bold text-xs ring-2 ring-white shadow-xs font-latin`}
                >
                  {avatar.text}
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-neutral-700">
              انضم لـ <span className="font-latin font-bold text-ink text-base">+2,000</span> طالب بدأوا رحلتهم
            </p>
          </div>
        </div>

        {/* Right Column: Visual Component (Spans 5 columns on Desktop) */}
        <div className="lg:col-span-5 relative w-full mt-4 lg:mt-0">
          {/* Main Visual Card */}
          <div className="relative rounded-3xl bg-white p-6 sm:p-8 border border-neutral-200/90 shadow-xl overflow-hidden">
            {/* Top Bar Header Decor */}
            <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <span className="text-xs font-semibold text-neutral-400 font-latin">Zikora Stream HD</span>
            </div>

            {/* Central Graphic Area */}
            <div className="py-10 flex flex-col items-center text-center space-y-5">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 shadow-glow-orange text-white">
                  <Laptop className="h-10 w-10" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1 border-2 border-white">
                  <Play className="h-3 w-3 fill-white" />
                </div>
              </div>

              <div className="space-y-1">
                <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                  محاضرة مباشرة 🔴
                </span>
                <h3 className="text-lg font-bold text-ink">الكيمياء العضوية — الجزء الأول</h3>
                <p className="text-xs text-neutral-500">أ. سامح إبراهيم · 1,240 مشاهد مباشر</p>
              </div>
            </div>

            {/* Bottom In-Card Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-2.5 rounded-xl bg-orange-50/70 p-3 border border-orange-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white shrink-0">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink font-latin">+50 مادة</p>
                  <p className="text-[11px] text-neutral-500">شاملة المنهج</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl bg-amber-50/70 p-3 border border-amber-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white shrink-0">
                  <Star className="h-4 w-4 fill-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink font-latin">4.9 / 5.0</p>
                  <p className="text-[11px] text-neutral-500">تقييم ممتاز</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
