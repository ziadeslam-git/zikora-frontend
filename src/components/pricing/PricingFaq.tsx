import { ChevronDown, HelpCircle } from "lucide-react";

const faqItems = [
  {
    q: "إمتى يتفعّل الاشتراك بعد الدفع؟",
    a: "يتفعل الاشتراك فوراً بلمحة عين بمجرد تأكيد عملية الدفع عن طريق الفيزا، فودافون كاش، أو إنستاباي. في حالة الدفع عن طريق فوري يتفعل الاشتراك فور إتمام التسديد في الفرع.",
  },
  {
    q: "هل ينفع أغيّر الخطة من شهري لترم كامل بعدين؟",
    a: "نعم بالتأكيد! يمكنك الترقية إلى خطة الترم الكامل في أي وقت وسيتم خصم المبلغ المتبقي من اشتراكك الشهري الحالي تلقائياً.",
  },
  {
    q: "ما هي وسائل الدفع المتاحة على المنصة؟",
    a: "نوفر جميع وسائل الدفع المحلية المريحة: فودافون كاش، إنستاباي، كروت الفيزا والماستركارد عبر Paymob، وأكواد فوري المباشرة.",
  },
  {
    q: "هل الفيديوهات المتاحة محمية برقم الموبايل والجهاز؟",
    a: "نعم، جميع الفيديوهات محمية بنظام Zikora DRM وتعمل فقط على الجهاز المربوط لمنع المشاركة وسرقة المجهود التعليمي.",
  },
];

/**
 * PricingFaq — Pricing Frequently Asked Questions (Server Component).
 * Native details/summary accordion styled with Tailwind CSS.
 */
export function PricingFaq() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 text-start pt-12">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-ink flex items-center justify-center gap-2">
          <HelpCircle className="h-6 w-6 text-accent-500" />
          <span>أسئلة شائعة عن خطط الأسعار</span>
        </h3>
        <p className="text-xs text-text-secondary">كل الإجابات التي تحتاجها قبل اتخاذ القرار</p>
      </div>

      <div className="space-y-3">
        {faqItems.map((item, idx) => (
          <details
            key={idx}
            className="group rounded-2xl border border-border-theme bg-bg-surface overflow-hidden transition-colors"
          >
            <summary className="flex items-center justify-between p-5 cursor-pointer select-none list-none font-bold text-ink hover:bg-bg-surface-2 transition-colors">
              <span>{item.q}</span>
              <ChevronDown className="h-4 w-4 text-text-secondary transition-transform duration-200 group-open:rotate-180 shrink-0 ms-2" />
            </summary>

            <div className="px-5 pb-5 pt-1 text-sm text-text-secondary leading-relaxed border-t border-border-theme/60 bg-bg-base/40">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
