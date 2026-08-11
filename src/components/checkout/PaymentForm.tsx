"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Smartphone, Store, ShieldCheck, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export type PaymentMethod = "vodafone_cash" | "instapay" | "fawry" | "visa";

const paymentMethods: {
  id: PaymentMethod;
  name: string;
  badge: string;
  icon: typeof Smartphone;
}[] = [
  { id: "vodafone_cash", name: "فودافون كاش", badge: "محفظة إلكترونية", icon: Smartphone },
  { id: "instapay", name: "إنستاباي", badge: "تحويل لحظي", icon: Smartphone },
  { id: "fawry", name: "فوري", badge: "دفع نقدي بالفرع", icon: Store },
  { id: "visa", name: "فيزا / Paymob", badge: "كارت بنكي مشفّر", icon: CreditCard },
];

const phoneSchema = z.object({
  walletPhone: z
    .string()
    .regex(/^01[0125]\d{8}$/, "يرجى إدخال رقم محفظة مصري صحيح مكون من 11 رقمًا (مثال: 01000000000)"),
});

export type PhoneFormData = z.infer<typeof phoneSchema>;

export function PaymentForm() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("vodafone_cash");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      walletPhone: "",
    },
  });

  const onSubmit = async (data?: PhoneFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock API delay
      console.log("Payment submitted:", { method: selectedMethod, data });

      if (selectedMethod === "fawry") {
        router.push("/checkout/pending");
      } else {
        router.push("/checkout/success");
      }
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bg-surface border border-border-theme rounded-3xl p-6 lg:p-8 space-y-8 shadow-md text-start">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-ink">اختر طريقة الدفع</h2>
        <p className="text-xs text-text-secondary">جميع عمليات الدفع مشفرة وآمنة بنسبة 100%</p>
      </div>

      {/* 4 Selectable Payment Method Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {paymentMethods.map((method) => {
          const isSelected = selectedMethod === method.id;
          const Icon = method.icon;

          return (
            <button
              type="button"
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={cn(
                "flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-all duration-150 cursor-pointer select-none space-y-2 relative",
                isSelected
                  ? "border-accent-500 bg-accent-500/10 text-ink shadow-xs"
                  : "border-border-theme bg-bg-surface-2 text-ink hover:border-accent-500/40",
              )}
            >
              {isSelected && (
                <CheckCircle2 className="h-4 w-4 text-accent-500 absolute top-2.5 end-2.5" />
              )}
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                  isSelected ? "bg-accent-500 text-white" : "bg-bg-surface text-accent-500 border border-border-theme",
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-ink">{method.name}</h4>
                <span className="text-[10px] text-text-secondary block mt-0.5">{method.badge}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Form Area Based on Selected Method */}
      <div className="bg-bg-surface-2 p-6 rounded-2xl border border-border-theme space-y-4">
        {(selectedMethod === "vodafone_cash" || selectedMethod === "instapay") && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-ink">
                الدفع عن طريق {selectedMethod === "vodafone_cash" ? "فودافون كاش" : "إنستاباي"}
              </h3>
              <p className="text-xs text-text-secondary">
                أدخل رقم المحفظة أو الحساب الذي ستتم منه عملية التحويل لتأكيد الطلب
              </p>
            </div>

            <Input
              label="رقم محفظة التحويل"
              placeholder="01000000000"
              type="tel"
              error={errors.walletPhone?.message}
              {...register("walletPhone")}
            />

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full font-bold shadow-glow-accent mt-2"
              loading={isSubmitting}
            >
              <span>ادفع الآن ({selectedMethod === "vodafone_cash" ? "فودافون كاش" : "إنستاباي"})</span>
              <ArrowLeft className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />
            </Button>
          </form>
        )}

        {selectedMethod === "fawry" && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-ink">الدفع النقدى عبر منافذ فوري</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                بعد الضغط على الزرار أدناه، ستحصل على كود دفع مرجعي (Reference Number). توجه لأي فرع أو كشك فوري وقم بسداد المبلغ خلال 24 ساعة لتفعيل الاشتراك.
              </p>
            </div>

            <Button
              type="button"
              variant="gradient"
              size="lg"
              className="w-full font-bold shadow-glow-accent mt-2"
              loading={isSubmitting}
              onClick={() => onSubmit()}
            >
              <span>احصل على كود الدفع (فوري)</span>
              <ArrowLeft className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />
            </Button>
          </div>
        )}

        {selectedMethod === "visa" && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-ink">الدفع الكارت البنكي (Visa / Mastercard)</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                سيتم توجيهك بأمان كامل إلى صفحة بوابة الدفع البنكية المعتمدة (Paymob) لإدخال بيانات الكارت وتأكيد العملية. منصة Zikora لا تحتفظ ولا تطلع على بيانات الكروت مطلقاً.
              </p>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-bg-surface border border-border-theme text-xs text-text-secondary">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>مؤمّن بتشفير 256-bit SSL وحاصل على شهادة PCI DSS Compliance</span>
            </div>

            <Button
              type="button"
              variant="gradient"
              size="lg"
              className="w-full font-bold shadow-glow-accent mt-2"
              loading={isSubmitting}
              onClick={() => onSubmit()}
            >
              <span>التحويل لصفحة Paymob الآمنة 🔒</span>
              <ArrowLeft className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
