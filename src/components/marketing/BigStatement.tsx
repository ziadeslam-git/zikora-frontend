import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * BigStatement — Marketing Homepage Dark Statement Section (Server Component).
 * Rich dark theme section (#121316 / bg-ink) highlighting Zikora's core zero-hidden-fee policy.
 */
export function BigStatement() {
  return (
    <section className="bg-ink text-white py-24 lg:py-32 relative overflow-hidden my-12 border-y border-neutral-800">
      {/* Giant decorative background numeral */}
      <span
        className="text-[240px] sm:text-[340px] lg:text-[420px] font-black text-white/[0.04] absolute start-4 top-1/2 -translate-y-1/2 leading-none select-none pointer-events-none font-latin z-0"
        aria-hidden="true"
      >
        0%
      </span>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (Spans 7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-start">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-orange-400 border border-white/10">
              <ShieldCheck className="h-4 w-4 text-orange-400" />
              <span>شفافية وحماية كاملة</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              شفافية كاملة:{" "}
              <span className="text-orange-500 underline decoration-orange-500/50 decoration-wavy underline-offset-8">
                0% عمولة خفية
              </span>{" "}
              على المعلمين وخدمة موثوقة للطلاب.
            </h2>
          </div>

          {/* Right Column (Spans 5 cols) */}
          <div className="lg:col-span-5 space-y-6 bg-neutral-900/60 p-6 sm:p-8 rounded-3xl border border-neutral-800 backdrop-blur-xs">
            <p className="text-neutral-300 text-base leading-relaxed">
              نؤمن بأن التعليم رسالة سامية. توفر Zikora للمدرسين منصة آمنة تمامًا لحماية فيديوهاتهم، وللطلاب اشتراكات واضحة بدون مصاريف مستترة أو تقييد غير مبرر.
            </p>

            <div className="pt-2">
              <Link href="/auth/register" className="inline-block w-full sm:w-auto">
                <Button variant="gradient" size="lg" className="w-full sm:w-auto shadow-glow-orange text-base font-bold">
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
