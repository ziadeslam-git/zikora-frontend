import type { Metadata } from "next";
import { XCircle } from "lucide-react";
import { PaymentResultScreen } from "@/components/checkout/PaymentResultScreen";

export const metadata: Metadata = {
  title: "تعذر إتمام الدفع — Zikora",
  description: "حدثت مشكلة أثناء معالجة الدفع، يرجى إعادة المحاولة",
};

export default function CheckoutFailedPage() {
  return (
    <PaymentResultScreen
      variant="failed"
      icon={XCircle}
      title="حصلت مشكلة في الدفع"
      description="تعذر إتمام عملية الدفع. يرجى التأكد من رصيد الكارت/المحفظة أو اختيار وسيلة دفع أخرى وإعادة المحاولة مرّة أخرى."
      buttonLabel="جرّب تاني"
      buttonHref="/checkout"
      buttonVariant="gradient"
    />
  );
}
