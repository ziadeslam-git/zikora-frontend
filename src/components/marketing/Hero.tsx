import Link from "next/link";
import { ArrowLeft, BookOpen, Star, Laptop, Play, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Hero — Marketing Homepage Hero Section (Server Component).
 * Features a 2-column layout (55/45 on desktop), pill badge, gradient heading,
 * CTA buttons, trust row with overlapping avatars, and a styled illustration container
 * with floating stats cards.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-44 pb-24 px-6 lg:px-8 max-w-[1280px] mx-auto">
      {/* Decorative blurred background circle */}
      <div
        className="absolute top-10 start-1/2 -translate-x-1/2 -z-10 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-orange-100 to-transparent blur-3xl opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
        {/* Left Column: Copy & Actions */}
        <div className="flex flex-col items-start">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 text-orange-600 text-sm font-medium px-4 py-1.5 border border-orange-500/20">
            <Award className="h-4 w-4 text-orange-500 shrink-0" aria-hidden="true" />
            <span>منصة معتمدة لأكتر من 500 مدرس</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl lg:text-6xl font-extrabold text-ink leading-[1.1] mt-6 tracking-tight">
            ذاكر صح، وابقى{" "}
            <span className="bg-gradient-to-r from-[#FC5A05] to-[#491900] bg-clip-text text-transparent">
              الأول
            </span>{" "}
            في ثانويتك
          </h1>

          {/* Paragraph */}
          <p className="text-lg text-neutral-600 max-w-lg mt-6 leading-relaxed">
            تعلّم من أفضل معلمي مصر، وشاهد فيديوهات محمية عالية الجودة، وحل امتحانات تفاعلية مع تقرير أسبوعي يصل لولي أمرك تلقائيًا.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            <Link href="/auth/register">
              <Button variant="gradient" size="lg">
                <span>ابدأ التعلم الآن</span>
                <ArrowLeft className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" size="lg">
                استعرض الكورسات
              </Button>
            </Link>
          </div>

          {/* Trust Mini-row */}
          <div className="mt-10 flex items-center gap-3 text-sm text-neutral-600">
            <div className="flex -space-x-3 rtl:space-x-reverse">
              {[
                { bg: "bg-orange-400", text: "أ" },
                { bg: "bg-orange-600", text: "م" },
                { bg: "bg-neutral-800", text: "س" },
                { bg: "bg-orange-500", text: "ف" },
              ].map((avatar, idx) => (
                <div
                  key={idx}
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${avatar.bg} text-white font-bold text-xs ring-2 ring-white font-latin`}
                >
                  {avatar.text}
                </div>
              ))}
            </div>
            <p className="font-medium text-neutral-700">
              <span className="font-latin font-bold text-ink">+2,000</span> طالب بدأوا رحلتهم
            </p>
          </div>
        </div>

        {/* Right Column: Hero Visual Container & Floating Cards */}
        <div className="relative w-full">
          {/* Main Visual Frame */}
          <div className="relative rounded-[32px] bg-gradient-to-br from-orange-50 via-white to-orange-100/60 p-8 border border-orange-200/60 shadow-lg min-h-[380px] flex flex-col items-center justify-center overflow-hidden">
            {/* Background pattern grid decor */}
            <div
              className="absolute inset-0 opacity-20 bg-[radial-gradient(#FC5A05_1px,transparent_1px)] [background-size:16px_16px]"
              aria-hidden="true"
            />

            {/* Center Graphic */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-500 shadow-glow-orange text-white">
                <Laptop className="h-10 w-10" />
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-neutral-200">
                <Play className="h-4 w-4 text-orange-500 fill-orange-500" />
                <span className="text-sm font-semibold text-ink">محاضرة الكيمياء — مباشرة الآن</span>
              </div>
            </div>
          </div>

          {/* Floating Card 1: Top Right */}
          <div className="absolute -top-6 -right-6 lg:-right-4 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 border border-neutral-200/80 z-20">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 shrink-0">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-bold text-ink font-latin">+50</p>
              <p className="text-xs text-neutral-500">مادة دراسية شاملة</p>
            </div>
          </div>

          {/* Floating Card 2: Bottom Left */}
          <div className="absolute -bottom-6 -left-6 lg:-left-4 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 border border-neutral-200/80 z-20">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 shrink-0">
              <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <p className="text-base font-bold text-ink font-latin">4.9 / 5.0</p>
              <p className="text-xs text-neutral-500">تقييم أولياء الأمور</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
