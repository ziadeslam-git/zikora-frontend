import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { PricingMode } from "./PricingToggle";

export interface PricingCardsProps {
  mode: PricingMode;
}

/**
 * PricingCards — 3-Plan Comparison Cards (Server Component).
 * Features "Single Distinction" rule: the middle "Full Term" card uses bg-brand-gradient and white text.
 */
export function PricingCards({ mode }: PricingCardsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4 text-start">
      {/* Plan 1: Monthly Subscription */}
      <div className="bg-bg-surface border border-border-theme rounded-3xl p-8 flex flex-col justify-between space-y-8 shadow-xs hover:border-accent-500/40 transition-colors">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-accent-500 bg-accent-blob/40 px-3 py-1 rounded-full">
              الخطة الشهرية
            </span>
            <h3 className="text-2xl font-bold text-ink">اشتراك شهري</h3>
            <p className="text-xs text-text-secondary">مرونة كاملة مع إمكانية الإلغاء في أي وقت</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-ink font-latin">350</span>
            <span className="text-sm font-bold text-text-secondary">ج.م / شهرياً</span>
          </div>

          {/* Features Checklist */}
          <ul className="space-y-3 text-sm text-ink pt-2">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>وصول كامل لكورسات المادة المختارة</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>مشاهدة الفيديوهات المحمية (3 مرات لكل فيديو)</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>دخول الامتحانات والتصحيح الفوري</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>تقارير أسبوعية لولي الأمر على الواتساب</span>
            </li>
          </ul>
        </div>

        <Link href="/checkout?plan=monthly" className="w-full">
          <Button variant="outline" size="lg" className="w-full font-bold">
            اشترك شهرياً
          </Button>
        </Link>
      </div>

      {/* Plan 2: Full Term (Highlighted Most Popular Plan — Single Distinction Rule) */}
      <div className="bg-brand-gradient text-white rounded-3xl p-8 flex flex-col justify-between space-y-8 shadow-2xl relative overflow-hidden border border-white/20 scale-105 z-10">
        {/* Most Popular Badge */}
        <div className="absolute top-4 end-4">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-extrabold text-white border border-white/30">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>الخطة الأكثر توفيراً 🔥</span>
          </div>
        </div>

        <div className="space-y-6 pt-2">
          <div className="space-y-2">
            <span className="text-xs font-bold text-white/80 bg-white/15 px-3 py-1 rounded-full">
              الخطة الفصلية
            </span>
            <h3 className="text-2xl font-extrabold text-white">ترم كامل معتاد</h3>
            <p className="text-xs text-white/85">توفير أكثر من 30% مقارنة بالدفع الشهري</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-extrabold text-white font-latin">950</span>
            <span className="text-sm font-bold text-white/85">ج.م / للترم بالكامل</span>
          </div>

          {/* Features Checklist */}
          <ul className="space-y-3 text-sm text-white/95 pt-2">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
              <span>جميع ميزات الاشتراك الشهري بالكامل</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
              <span>وصول غير محدود لملخصات ومذكرات الشرح</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
              <span>مراجعات ليلة الامتحان وبنك الأسئلة المتقدم</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
              <span>أولوية الدعم الفني والإجابة على الاستفسارات</span>
            </li>
          </ul>
        </div>

        <Link href="/checkout?plan=term" className="w-full">
          <Button
            variant="primary"
            size="lg"
            className="w-full bg-white text-accent-500 hover:bg-neutral-100 font-extrabold shadow-lg"
          >
            اشترك في الترم الكامل
          </Button>
        </Link>
      </div>

      {/* Plan 3: Per Lecture */}
      <div className="bg-bg-surface border border-border-theme rounded-3xl p-8 flex flex-col justify-between space-y-8 shadow-xs hover:border-accent-500/40 transition-colors">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-accent-500 bg-accent-blob/40 px-3 py-1 rounded-full">
              الدفع الدقيق
            </span>
            <h3 className="text-2xl font-bold text-ink">بالمحاضرة الواحدة</h3>
            <p className="text-xs text-text-secondary">مناسب لمن يحتاج درس محدد أو جزء معين</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-ink font-latin">45</span>
            <span className="text-sm font-bold text-text-secondary">ج.م / للمحاضرة</span>
          </div>

          {/* Features Checklist */}
          <ul className="space-y-3 text-sm text-ink pt-2">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>فتح المحاضرة المختارة فقط بدون اشتراك كامل</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>مشاهدة الفيديو المختار (3 مرات)</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>امتحان المحاضرة المحددة وتصحيحه</span>
            </li>
          </ul>
        </div>

        <Link href="/checkout?plan=per_lecture" className="w-full">
          <Button variant="outline" size="lg" className="w-full font-bold">
            اختر المحاضرات
          </Button>
        </Link>
      </div>
    </div>
  );
}
