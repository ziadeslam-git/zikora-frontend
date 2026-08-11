import Link from "next/link";
import { ArrowLeft, Rocket } from "lucide-react";

/**
 * FinalCtaBanner — Marketing Homepage Final Call to Action Banner (Server Component).
 * Rendered inside the max-w container with bg-brand-gradient background, white text,
 * and a prominent white button with text-accent-500.
 */
export function FinalCtaBanner() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-8 mb-20">
      <div className="bg-brand-gradient rounded-3xl px-8 lg:px-16 py-16 text-center text-white shadow-xl relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div
          className="absolute -top-24 -start-24 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -end-24 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          {/* Badge Icon */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white">
            <Rocket className="h-4 w-4" />
            <span>ابدأ مجانًا في أقل من دقيقتين</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
            جاهز تبدأ رحلة التفوق مع Zikora؟
          </h2>

          {/* Subtitle */}
          <p className="text-white/85 text-base lg:text-lg leading-relaxed">
            انضم لأكثر من 2,000 طالب وأسرة، واكتشف تجربة تعليمية منظّمة، فيديوهات محمية، وتواصل أسبوعي مباشر.
          </p>

          {/* Action Button */}
          <div className="pt-4 flex justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-3 bg-white text-accent-500 hover:bg-neutral-100 font-extrabold text-base px-8 py-4 rounded-xl shadow-lg transition-all duration-200 active:scale-95"
            >
              <span>سجّل حسابك المجاني الآن</span>
              <ArrowLeft className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
