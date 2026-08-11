import type { Metadata } from "next";
import {
  Hero,
  TrustBar,
  ProcessTimeline,
  WhyZikora,
  FeaturedCourses,
  BigStatement,
  Testimonials,
  FinalCtaBanner,
} from "@/components/marketing";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "الرئيسية — ذاكر صح وابقى الأول في ثانويتك",
  description:
    "منصة Zikora للتعليم الإلكتروني في مصر — كورسات معتمدة، فيديوهات محمية، تصحيح آلي للامتحانات، وتواصل أسبوعي تلقائي مع ولي الأمر عبر الواتساب.",
};

/**
 * Marketing Homepage — Server Component.
 * Assembles all 8 homepage sections wrapped with ScrollReveal directional animations.
 */
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-bg-base text-ink transition-colors duration-200 space-y-4">
      {/* 1. Hero Section */}
      <ScrollReveal direction="up" delay={0.1}>
        <Hero />
      </ScrollReveal>

      {/* 2. Trust Bar */}
      <ScrollReveal direction="up" delay={0.15}>
        <TrustBar />
      </ScrollReveal>

      {/* 3. Our Process — Step-by-step Timeline */}
      <ScrollReveal direction="right" delay={0.1}>
        <ProcessTimeline />
      </ScrollReveal>

      {/* 4. Why Zikora — Bento Grid */}
      <ScrollReveal direction="left" delay={0.1}>
        <WhyZikora />
      </ScrollReveal>

      {/* 5. Featured Courses */}
      <ScrollReveal direction="up" delay={0.1}>
        <FeaturedCourses />
      </ScrollReveal>

      {/* 6. Big Statement Section */}
      <ScrollReveal direction="up" delay={0.1}>
        <BigStatement />
      </ScrollReveal>

      {/* 7. Student & Parent Testimonials */}
      <ScrollReveal direction="right" delay={0.1}>
        <Testimonials />
      </ScrollReveal>

      {/* 8. Final Call to Action Banner */}
      <ScrollReveal direction="up" delay={0.1}>
        <FinalCtaBanner />
      </ScrollReveal>
    </div>
  );
}
