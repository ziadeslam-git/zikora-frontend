import Link from "next/link";
import { Video, FileText, Clock, Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface CourseSidebarCardProps {
  price: number;
  pricingType?: "subscription" | "per_lecture";
  lessonsCount?: number;
  examsCount?: number;
  accessDuration?: string;
  hasCertificate?: boolean;
}

/**
 * CourseSidebarCard — Sticky Sidebar Enrollment Box (Server Component).
 * Dual-theme compliant: bg-bg-surface, border-border-theme, text-ink, gradient CTA.
 */
export function CourseSidebarCard({
  price,
  pricingType = "subscription",
  lessonsCount = 24,
  examsCount = 6,
  accessDuration = "وصول لمدة 6 أشهر",
  hasCertificate = true,
}: CourseSidebarCardProps) {
  const formattedPrice = `ج.م ${price.toLocaleString("ar-EG")}`;

  return (
    <div className="bg-bg-surface border border-border-theme rounded-2xl p-6 sticky top-24 shadow-md space-y-6 text-start">
      {/* Price Header */}
      <div className="space-y-1">
        <span className="text-xs font-semibold text-text-secondary">سعر الاشتراك</span>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl lg:text-4xl font-extrabold text-ink font-latin tracking-tight">
            {formattedPrice}
          </span>
          <span className="text-xs font-semibold text-accent-500">
            {pricingType === "subscription" ? "شهريًا" : "بالمحاضرة الواحدة"}
          </span>
        </div>
      </div>

      {/* Main CTA Button linking to Checkout */}
      <Link href="/checkout?plan=term" className="w-full inline-block">
        <Button variant="gradient" size="lg" className="w-full font-bold shadow-glow-accent">
          اشترك في الكورس الآن 🚀
        </Button>
      </Link>

      {/* Course Features List */}
      <div className="space-y-3.5 pt-2">
        <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
          يتضمن هذا الكورس
        </p>

        <ul className="space-y-3 text-sm text-ink">
          <li className="flex items-center gap-3">
            <Video className="h-4 w-4 text-accent-500 shrink-0" />
            <span>{lessonsCount} محاضرة فيديو فائقة الجودة</span>
          </li>
          <li className="flex items-center gap-3">
            <FileText className="h-4 w-4 text-accent-500 shrink-0" />
            <span>{examsCount} امتحانات تفاعلية مع تصحيح آلي</span>
          </li>
          <li className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-accent-500 shrink-0" />
            <span>{accessDuration}</span>
          </li>
          {hasCertificate && (
            <li className="flex items-center gap-3">
              <Award className="h-4 w-4 text-accent-500 shrink-0" />
              <span>شهادة إتمام معتمدة بعد الاجتياز</span>
            </li>
          )}
          <li className="flex items-center gap-3">
            <ShieldCheck className="h-4 w-4 text-accent-500 shrink-0" />
            <span>تقرير أسبوعي لولي الأمر على الواتساب</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-border-theme pt-4 space-y-3">
        <p className="text-xs font-semibold text-text-secondary">طرق الدفع المتاحة</p>
        <div className="flex flex-wrap gap-2">
          {["فودافون كاش", "إنستاباي", "فيزا / ماستركارد", "فوري"].map((method) => (
            <span
              key={method}
              className="inline-flex items-center gap-1 bg-bg-surface-2 border border-border-theme rounded-lg px-2.5 py-1 text-xs font-semibold text-ink"
            >
              <CheckCircle2 className="h-3 w-3 text-accent-500" />
              {method}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
