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

const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "الاسم الكامل يجب أن يكون 3 أحرف على الأقل")
      .refine((val) => val.trim().includes(" "), "يرجى إدخال الاسم الثنائي على الأقل"),
    email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
    phone: z
      .string()
      .regex(/^01[0125]\d{8}$/, "يرجى إدخال رقم موبايل مصري صحيح مكون من 11 رقمًا (مثال: 01000000000)"),
    password: z.string().min(8, "كلمة السر يجب أن تكون 8 أحرف على الأقل"),
    confirmPassword: z.string().min(8, "يرجى تأكيد كلمة السر"),
    agreeTerms: z.boolean().refine((val) => val === true, "يجب الموافقة على الشروط والأحكام للاستمرار"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا السر غير متطابقتين",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      // Mock registration API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Registration submitted:", data);
      // Redirect directly to Onboarding wizard
      router.push("/onboarding");
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 w-full text-start">
      {/* Editorial Title & Subtitle */}
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold text-ink tracking-tight">
          ابدأ رحلتك مع Zikora
        </h1>
        <p className="text-base text-text-secondary">
          سجّل حسابك كطالب واستمتع بتجربة تعليمية فريدة ومحمية
        </p>
      </div>

      {/* Register Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Full Name */}
        <Input
          label="الاسم الكامل"
          placeholder="مثال: أحمد محمد علي"
          type="text"
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        {/* Email */}
        <Input
          label="البريد الإلكتروني"
          placeholder="ahmed@example.com"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Egyptian Phone Number */}
        <Input
          label="رقم الموبايل"
          placeholder="01000000000"
          type="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-ink">كلمة السر</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="8 أحرف على الأقل"
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

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-ink">تأكيد كلمة السر</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="أعد كتابة كلمة السر"
              className={`w-full rounded-xl border bg-bg-surface px-4 py-2.5 pe-11 text-sm text-ink placeholder:text-text-secondary focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 transition-all ${
                errors.confirmPassword ? "border-danger-cta" : "border-border-theme"
              }`}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute end-3 top-1/2 -translate-y-1/2 p-1 text-text-secondary hover:text-ink transition-colors"
              aria-label={showConfirmPassword ? "إخفاء كلمة السر" : "إظهار كلمة السر"}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword?.message && (
            <p className="text-xs font-medium text-danger-cta mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Agree Terms Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-border-theme text-accent-500 focus:ring-accent-500"
              {...register("agreeTerms")}
            />
            <span className="text-xs text-text-secondary leading-relaxed">
              موافق على{" "}
              <Link href="/terms" className="font-semibold text-accent-500 hover:underline">
                الشروط والأحكام
              </Link>{" "}
              و{" "}
              <Link href="/privacy" className="font-semibold text-accent-500 hover:underline">
                سياسة الخصوصية
              </Link>
            </span>
          </label>
          {errors.agreeTerms?.message && (
            <p className="text-xs font-medium text-danger-cta mt-1">
              {errors.agreeTerms.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full font-bold shadow-glow-accent mt-4"
          loading={isSubmitting}
        >
          <span>إنشاء الحساب</span>
          <ArrowLeft className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />
        </Button>
      </form>

      {/* Switch to Login link */}
      <p className="text-center text-sm text-text-secondary pt-2">
        عندك حساب بالفعل؟{" "}
        <Link
          href="/auth/login"
          className="font-bold text-accent-500 hover:text-accent-hover hover:underline"
        >
          سجّل دخولك
        </Link>
      </p>
    </div>
  );
}
