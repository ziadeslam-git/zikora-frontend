import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "إنشاء حساب جديد — Zikora",
  description: "سجّل حسابك كطالب في منصة Zikora وابدأ التعلم الآن",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
