import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PaymentResultScreen } from "@/components/checkout/PaymentResultScreen";

export const metadata: Metadata = {
  title: "تم الاشتراك بنجاح — Zikora",
  description: "تمت عملية الاشتراك بنجاح وتفعيل المحتوى التعليمي في حسابك",
};

export default function CheckoutSuccessPage() {
  return (
    <PaymentResultScreen
      variant="success"
      icon={CheckCircle2}
      title="تم الاشتراك بنجاح!"
      description="تهانينا! تم تفعيل الاشتراك بنجاح في حسابك، ويمكنك الآن متابعة المحاضرات والامتحانات فوراً."
      buttonLabel="روح للكورس دلوقتي 🚀"
      buttonHref="/courses/chemistry-organic"
      buttonVariant="gradient"
    />
  );
}
