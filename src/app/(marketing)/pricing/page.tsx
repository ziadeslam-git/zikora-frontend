import type { Metadata } from "next";
import { PricingSection } from "@/components/pricing/PricingSection";
import { PricingFaq } from "@/components/pricing/PricingFaq";

export const metadata: Metadata = {
  title: "خطط الأسعار والاشتراكات — Zikora",
  description: "اختر خطة الاشتراك المناسبة لك واستمتع بكورسات مميزة وفيديوهات محمية",
};

/**
 * Marketing Pricing Page — Server Component.
 * Assembles Pricing Hero, PricingSection client wrapper, and PricingFaq.
 */
export default function PricingPage() {
  return (
    <div className="min-h-screen bg-bg-base text-ink py-16 px-6 lg:px-8 max-w-[1280px] mx-auto space-y-16">
      {/* Pricing Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="inline-block rounded-full bg-accent-blob/40 px-3.5 py-1 text-xs font-semibold text-accent-text">
          استثمار مالي بسيط لتفوقك الدراسي
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
          اختار الخطة اللي تناسبك
        </h1>
        <p className="text-text-secondary text-base leading-relaxed">
          خطط مرنة مصممة خصيصاً لطلاب الثانوية العامة — بدون رسوم خفية مع حماية كاملة ومتابعة لأولياء الأمور.
        </p>
      </div>

      {/* Pricing Section (Toggle + 3 Plan Cards) */}
      <PricingSection />

      {/* FAQ Section */}
      <PricingFaq />
    </div>
  );
}
