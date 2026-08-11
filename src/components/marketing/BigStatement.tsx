import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * BigStatement — Marketing Homepage Dark Statement Section (Server Component).
 * Styled with fixed rich dark theme (#0D0E1F) in both themes with a giant decorative
 * background "0%" numeral, high-contrast crisp white typography, and glowing accent badges.
 */
export function BigStatement() {
  return (
    <section className="mx-4 sm:mx-6 lg:mx-8 max-w-[1280px] lg:mx-auto my-16">
      <div className="bg-[#0D0E1F] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-white/15 shadow-2xl">
        {/* Giant decorative background numeral */}
        <span
          className="text-[200px] sm:text-[300px] lg:text-[380px] font-black text-white/[0.05] absolute -start-10 top-1/2 -translate-y-1/2 leading-none select-none pointer-events-none font-latin z-0"
          aria-hidden="true"
        >
          0%
        </span>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (Spans 7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-start">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-white border border-white/15 backdrop-blur-md">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>شفافية وحماية كاملة 100%</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
              شفافية كاملة:{" "}
              <span className="text-accent-500 font-black underline decoration-accent-500/50 decoration-wavy underline-offset-8">
                0% عمولة خفية
              </span>{" "}
              على المعلمين وخدمة موثوقة للطلاب.
            </h2>
          </div>

          {/* Right Column (Spans 5 cols) */}
          <div className="lg:col-span-5 space-y-6 bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/15 backdrop-blur-md text-start">
            <p className="text-white/90 text-base leading-relaxed font-normal">
              نؤمن بأن التعليم رسالة سامية. توفر Zikora للمدرسين منصة آمنة تمامًا لحماية فيديوهاتهم، وللطلاب اشتراكات واضحة بدون مصاريف مستترة أو تقييد غير مبرر.
            </p>

            <div className="pt-2">
              <Link href="/auth/register" className="inline-block w-full sm:w-auto">
                <Button variant="gradient" size="lg" className="w-full sm:w-auto text-base font-bold shadow-glow-accent">
                  <span>انضم للمنصة الآن</span>
                  <ArrowLeft className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
