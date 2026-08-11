import { ShieldCheck, CheckCircle2 } from "lucide-react";

export interface OrderSummaryProps {
  planId?: string;
  planName?: string;
  basePrice?: number;
  discount?: number;
}

/**
 * OrderSummary — Checkout Order Summary Card (Server Component).
 * Rendered as a sticky 40% column displaying selected plan breakdown & security badge.
 */
export function OrderSummary({
  planId = "monthly",
  planName = "خطة الترم الكامل — الكيمياء العضوية والتحليلية",
  basePrice = 950,
  discount = 150,
}: OrderSummaryProps) {
  const finalPrice = basePrice - discount;

  return (
    <div className="bg-bg-surface border border-border-theme rounded-3xl p-6 lg:p-8 sticky top-24 space-y-6 shadow-md text-start">
      <div className="space-y-1 pb-4 border-b border-border-theme">
        <span className="text-xs font-bold text-accent-500 bg-accent-blob/40 px-3 py-1 rounded-full">
          ملخص الطلب
        </span>
        <h3 className="text-xl font-bold text-ink pt-2">{planName}</h3>
        <span className="text-xs text-text-secondary">خطة تعليمية شاملة للثانوية العامة</span>
      </div>

      {/* Price Calculation Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between text-text-secondary">
          <span>السعر الأساسي</span>
          <span className="font-latin font-semibold">{basePrice.toLocaleString("ar-EG")} ج.م</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-emerald-500 font-semibold">
            <span>خصم العرض الخاص</span>
            <span className="font-latin">-{discount.toLocaleString("ar-EG")} ج.م</span>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-text-secondary pt-1">
          <span>رسوم الخدمة والتفعيل</span>
          <span className="text-emerald-500 font-semibold">مجاناً</span>
        </div>

        <div className="border-t border-border-theme pt-4 flex items-baseline justify-between">
          <span className="text-base font-extrabold text-ink">الإجمالي النهائي</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-accent-500 font-latin tracking-tight">
              {finalPrice.toLocaleString("ar-EG")}
            </span>
            <span className="text-xs font-bold text-ink">ج.م</span>
          </div>
        </div>
      </div>

      {/* What Student Gets Checklist */}
      <div className="bg-bg-surface-2 p-4 rounded-2xl border border-border-theme space-y-2 text-xs text-ink">
        <p className="font-bold text-ink">يشمل طلباً آكاديمياً فورياً:</p>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-3.5 w-3.5 text-accent-500 shrink-0" />
          <span>تفعيل الكورس والمحاضرات فوراً</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-3.5 w-3.5 text-accent-500 shrink-0" />
          <span>تنبيه تقارير الواتساب لولي الأمر</span>
        </div>
      </div>

      {/* Security Badge */}
      <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-accent-blob/20 border border-accent-500/20 text-xs font-semibold text-ink">
        <ShieldCheck className="h-5 w-5 text-accent-500 shrink-0" />
        <span>🔒 دفع آمن ومشفّر 100% بشرائح معتمدة</span>
      </div>
    </div>
  );
}
