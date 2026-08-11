import type { Metadata } from "next";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { PaymentForm } from "@/components/checkout/PaymentForm";

export const metadata: Metadata = {
  title: "إتمام الشراء والدفع — Zikora",
  description: "اختر وسيلة الدفع المناسبة وأتمم إدخال بيانات الطلب بأمان",
};

interface CheckoutPageProps {
  searchParams: Promise<{
    plan?: string;
  }>;
}

const defaultPlan = {
  title: "الخطة الشهرية — الكيمياء العضوية والتحليلية",
  price: 350,
  discount: 0,
};

const planTitles: Record<string, { title: string; price: number; discount: number }> = {
  monthly: { title: "الخطة الشهرية — الكيمياء العضوية والتحليلية", price: 350, discount: 0 },
  term: { title: "خطة الترم الكامل — الكيمياء العضوية والتحليلية", price: 950, discount: 150 },
  per_lecture: { title: "حزمة المحاضرات المحددة", price: 45, discount: 0 },
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const resolvedParams = await searchParams;

  const planId = resolvedParams.plan ?? "monthly";
  const currentPlan = planTitles[planId] ?? defaultPlan;

  return (
    <div className="min-h-screen bg-bg-base text-ink py-16 px-6 lg:px-8 max-w-[1280px] mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
          إتمام الاشتراك والدفع
        </h1>
        <p className="text-sm text-text-secondary">
          خطوة واحدة تفصلك عن فتح المحتوى التعليمي والامتحانات التفاعلية
        </p>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Payment Form (60% width / 7 cols) */}
        <div className="lg:col-span-7 w-full">
          <PaymentForm />
        </div>

        {/* Right / Order Summary (40% width / 5 cols) */}
        <div className="lg:col-span-5 w-full">
          <OrderSummary
            planId={planId}
            planName={currentPlan.title}
            basePrice={currentPlan.price}
            discount={currentPlan.discount}
          />
        </div>
      </div>
    </div>
  );
}
