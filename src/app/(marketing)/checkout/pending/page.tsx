import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { PaymentResultScreen } from "@/components/checkout/PaymentResultScreen";

export const metadata: Metadata = {
  title: "الطلب قيد المراجعة — Zikora",
  description: "طلب الدفع الخاص بك قيد الانتظار لحين تأكيد التحويل أو السداد",
};

export default function CheckoutPendingPage() {
  return (
    <PaymentResultScreen
      variant="pending"
      icon={Clock}
      title="طلبك قيد المراجعة"
      description="تم تقديم طلب الدفع بنجاح. إذا قمت باختيار الدفع عن طريق فوري، يرجى سداد المبلغ في أقرب فرع باستخدام كود الدفع ليصلك التفعيل."
      buttonLabel="شوف حالة الطلب في الداشبورد"
      buttonHref="/dashboard/student"
      buttonVariant="outline"
    />
  );
}
