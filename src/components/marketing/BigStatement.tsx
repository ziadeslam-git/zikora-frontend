import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * BigStatement — Marketing Homepage Dark Statement Section (Server Component).
 * Full-width dark background (#141414 / bg-ink) with a giant decorative "0%" background numeral
 * and clear proposition copy.
 */
export function BigStatement() {
  return (
    <section className="bg-[#141414] text-white py-28 relative overflow-hidden my-12">
      {/* Giant decorative background numeral */}
      <span
        className="text-[280px] lg:text-[400px] font-black text-white/5 absolute -left-10 top-1/2 -translate-y-1/2 leading-none select-none pointer-events-none font-latin"
        aria-hidden="true"
      >
        0%
      </span>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left / Main Heading Column */}
          <div className="space-y-4">
            <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-orange-400">
              رؤيتنا وقيمنا
            </span>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight">
              شفافية كاملة:{" "}
              <span className="text-orange-500">0% عمولة خفية</span> على المعلمين
              وخدمة موثوقة لطلاب مصر.
            </h2>
          </div>

          {/* Right / Copy & Action Column */}
          <div className="space-y-6 lg:ps-6">
            <p className="text-neutral-300 text-lg leading-relaxed">
              نؤمن بأن التعليم رسالة سامية. توفر Zikora للمدرسين منصة آمنة تمامًا لحماية فيديوهاتهم، وللطلاب اشتراكات واضحة بدون مصاريف مستترة أو تقييد غير مبرر.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link href="/auth/register">
                <Button variant="gradient" size="lg">
                  <span>انضم للمنصة الآن</span>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
