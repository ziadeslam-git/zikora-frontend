import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "إنشاء حساب جديد — Zikora",
  description: "سجّل حسابك كطالب في منصة Zikora وابدأ التعلم الآن",
};

/**
 * Register Page — Server Component.
 * Rendered inside the (auth)/layout.tsx split-screen layout.
 */
export default function RegisterPage() {
  return <RegisterForm />;
}
