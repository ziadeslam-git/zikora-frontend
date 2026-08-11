import type { Metadata } from "next";
import { OnboardingWizard } from "@/components/auth/OnboardingWizard";

export const metadata: Metadata = {
  title: "إعداد الحساب — Zikora",
  description: "اختار صفك الدراسي وإعدادات المتابعة لتهيئة حسابك في منصة Zikora",
};

/**
 * Onboarding Page — Server Component.
 * Rendered inside the (auth)/onboarding/layout.tsx centered layout.
 */
export default function OnboardingPage() {
  return <OnboardingWizard />;
}
