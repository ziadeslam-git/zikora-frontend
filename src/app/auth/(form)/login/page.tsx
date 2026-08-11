import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "تسجيل الدخول — Zikora",
  description: "سجّل دخولك لمتابعة دروسك وامتحاناتك في منصة Zikora",
};

export default function LoginPage() {
  return <LoginForm />;
}
