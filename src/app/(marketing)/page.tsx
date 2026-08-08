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

export const metadata: Metadata = {
  title: "الرئيسية — ذاكر صح وابقى الأول في ثانويتك",
  description:
    "منصة Zikora للتعليم الإلكتروني في مصر — كورسات معتمدة، فيديوهات محمية، تصحيح آلي للامتحانات، وتواصل أسبوعي تلقائي مع ولي الأمر عبر الواتساب.",
};

/**
 * Marketing Homepage — Server Component.
 * Assembles all 8 homepage sections in exact sequence:
 * 1. Hero
 * 2. TrustBar
 * 3. ProcessTimeline
 * 4. WhyZikora (Bento Grid)
 * 5. FeaturedCourses
 * 6. BigStatement (Dark section with giant faint 0% numeral)
 * 7. Testimonials
 * 8. FinalCtaBanner
 *
 * Header and Footer are automatically provided by (marketing)/layout.tsx.
 */
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. Our Process — Step-by-step Timeline */}
      <ProcessTimeline />

      {/* 4. Why Zikora — Bento Grid */}
      <WhyZikora />

      {/* 5. Featured Courses */}
      <FeaturedCourses />

      {/* 6. Big Statement Section */}
      <BigStatement />

      {/* 7. Student & Parent Testimonials */}
      <Testimonials />

      {/* 8. Final Call to Action Banner */}
      <FinalCtaBanner />
    </div>
  );
}
