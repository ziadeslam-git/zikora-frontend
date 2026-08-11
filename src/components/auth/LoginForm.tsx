"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const loginSchema = z.object({
  identifier: z.string().min(1, "يرجى إدخال البريد الإلكتروني أو رقم الموبايل").refine((val) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const isEgyptianPhone = /^01[0125]\d{8}$/.test(val);
    return isEmail || isEgyptianPhone;
  }, "يرجى إدخال بريد إلكتروني صحيح أو رقم موبايل مصري صحيح (مثال: 01000000000)"),
  password: z.string().min(6, "كلمة السر يجب أن تكون 6 أحرف على الأقل"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      // Mock login API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Login submitted:", data);
      router.push("/dashboard/student");
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 w-full text-start">
      {/* Editorial Title & Subtitle */}
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold text-ink tracking-tight">
          أهلاً بيك تاني
        </h1>
        <p className="text-base text-text-secondary">
          سجّل دخولك لمتابعة دروسك وامتحاناتك التفاعلية
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Identifier Field */}
        <Input
          label="البريد الإلكتروني أو رقم الموبايل"
          placeholder="مثال: ahmed@example.com أو 01000000000"
          type="text"
          error={errors.identifier?.message}
          {...register("identifier")}
        />

        {/* Password Field with Show/Hide Toggle */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-ink">كلمة السر</label>
            <Link
              href="/auth/forgot-password"
              className="text-xs font-semibold text-accent-500 hover:text-accent-hover hover:underline"
            >
              نسيت كلمة السر؟
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full rounded-xl border bg-bg-surface px-4 py-2.5 pe-11 text-sm text-ink placeholder:text-text-secondary focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 transition-all ${
                errors.password ? "border-danger-cta" : "border-border-theme"
              }`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute end-3 top-1/2 -translate-y-1/2 p-1 text-text-secondary hover:text-ink transition-colors"
              aria-label={showPassword ? "إخفاء كلمة السر" : "إظهار كلمة السر"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password?.message && (
            <p className="text-xs font-medium text-danger-cta mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full font-bold shadow-glow-accent mt-2"
          loading={isSubmitting}
        >
          <span>تسجيل الدخول</span>
          <ArrowLeft className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-border-theme" />
        <span className="absolute bg-bg-base px-4 text-xs font-semibold text-text-secondary">
          أو
        </span>
      </div>

      {/* Social Login Button */}
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full font-semibold border-border-theme text-ink hover:bg-bg-surface-2"
        onClick={() => console.log("Google Login clicked")}
      >
        <svg className="h-5 w-5 shrink-0 font-latin" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>الدخول بحساب جوجل</span>
      </Button>

      {/* Switch to Register link */}
      <p className="text-center text-sm text-text-secondary">
        لسه معندكش حساب؟{" "}
        <Link
          href="/auth/register"
          className="font-bold text-accent-500 hover:text-accent-hover hover:underline"
        >
          سجّل دلوقتي
        </Link>
      </p>
    </div>
  );
}
