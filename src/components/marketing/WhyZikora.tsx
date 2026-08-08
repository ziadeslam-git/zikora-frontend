import {
  ShieldCheck,
  MessageSquare,
  CheckCircle2,
  Wallet,
  BadgeCheck,
  BarChart3,
} from "lucide-react";

/**
 * WhyZikora — Marketing Homepage Bento Grid (Server Component).
 * Features 6 benefit cards with 1 highlighted gradient card (Video Protection System)
 * spanning 2 rows on desktop to emphasize Zikora's core competitive advantage.
 */
export function WhyZikora() {
  return (
    <section className="py-20 lg:py-28 max-w-[1280px] mx-auto px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="inline-block rounded-full bg-orange-100 px-3.5 py-1 text-xs font-semibold text-orange-600">
          مميزات المنصة
        </span>
        <h2 className="text-3xl lg:text-4xl font-bold text-ink">
          ليه أسر وطالب الثانوية بيختاروا Zikora؟
        </h2>
        <p className="text-neutral-600 text-base">
          بيئة تعليمية متكاملة مصممة خصيصًا لتأمين المحتوى وتسهيل المذاكرة والمتابعة
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 — Highlighted (Gradient, 2 rows) */}
        <div className="md:col-span-1 md:row-span-2 bg-brand-gradient text-white rounded-2xl p-6 lg:p-8 shadow-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="space-y-4 relative z-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white shrink-0">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
              الميزة الرئيسية ⭐
            </span>
            <h3 className="text-2xl font-bold text-white leading-snug">
              نظام حماية فيديو متقدم
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              عداد مشاهدات دقيق + ربط الحساب بجهاز واحد، يمنع مشاركة الحسابات ويحمي محتوى المعلم مع ضمان أعلى جودة للبث.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20 relative z-10">
            <p className="text-xs text-white/70 font-latin">
              100% Protected Stream Technology
            </p>
          </div>
        </div>

        {/* Card 2: تقرير واتساب */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 lg:p-8 hover:shadow-md transition-shadow">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 shrink-0">
            <MessageSquare className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-bold text-ink mt-4">
            تقرير واتساب أسبوعي تلقائي لولي الأمر
          </h3>
          <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
            يصل ولي الأمر ملخص أسبوعي بالدرجات والحضور من غير ما يفتح المنصة أصلاً.
          </p>
        </div>

        {/* Card 3: تصحيح آلي */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 lg:p-8 hover:shadow-md transition-shadow">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 shrink-0">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-bold text-ink mt-4">
            تصحيح آلي فوري للامتحانات
          </h3>
          <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
            يعرف الطالب نتيجته وسبب الخطأ في نفس اللحظة مع شرح التفاصيل.
          </p>
        </div>

        {/* Card 4: دفع بجميع الطرق */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 lg:p-8 hover:shadow-md transition-shadow">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 shrink-0">
            <Wallet className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-bold text-ink mt-4">
            دفع بكل الطرق المصرية
          </h3>
          <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
            فودافون كاش، إنستاباي، فوري، وفيزا — دفع آمن وسريع في ثوانٍ.
          </p>
        </div>

        {/* Card 5: مدرسين معتمدين */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 lg:p-8 hover:shadow-md transition-shadow">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 shrink-0">
            <BadgeCheck className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-bold text-ink mt-4">
            مدرسين معتمدين فقط
          </h3>
          <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
            كل مدرس بيتراجع من الإدارة قبل النشر للتأكد من جودة الشرح والمادة.
          </p>
        </div>

        {/* Card 6: داشبورد تقدم */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 lg:p-8 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 shrink-0">
            <BarChart3 className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-bold text-ink mt-4">
            داشبورد تقدم مباشر
          </h3>
          <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
            تعرف مستواك الحقيقي بالأرقام مش بالتخمين، وتتابع نقاط القوة والضعف.
          </p>
        </div>
      </div>
    </section>
  );
}
