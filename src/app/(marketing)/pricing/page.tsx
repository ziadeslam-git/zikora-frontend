import type { Metadata } from "next";
import { PricingSection } from "@/components/pricing/PricingSection";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
      <ScrollReveal direction="up" delay={0.1}>
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-accent-500/10 border border-accent-500/20 px-4 py-1.5 text-xs font-bold text-accent-500">
            استثمار مالي بسيط لتفوقك الدراسي 🎯
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
            اختار الخطة اللي تناسبك
          </h1>
          <p className="text-text-secondary text-base leading-relaxed">
            خطط مرنة مصممة خصيصاً لطلاب الثانوية العامة — بدون رسوم خفية مع حماية كاملة ومتابعة لأولياء الأمور.
          </p>
        </div>
      </ScrollReveal>

      {/* Pricing Section (Toggle + 3 Plan Cards) */}
      <ScrollReveal direction="up" delay={0.15}>
        <PricingSection />
      </ScrollReveal>

      {/* FAQ Section */}
      <ScrollReveal direction="up" delay={0.2}>
        <PricingFaq />
      </ScrollReveal>
    </div>
  );
}
