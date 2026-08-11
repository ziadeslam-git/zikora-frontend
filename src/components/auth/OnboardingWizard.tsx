"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowLeft, ArrowRight, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const grades = [
  { id: "1st-sec", label: "الصف الأول الثانوي", sublabel: "تأسيس المنهج الجديد" },
  { id: "2nd-sec", label: "الصف الثاني الثانوي", sublabel: "علمي وأدبي" },
  { id: "3rd-sec", label: "الصف الثالث الثانوي", sublabel: "الشهادة الثانوية العامة" },
] as const;

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [parentPhone, setParentPhone] = useState("");
  const [parentPhoneError, setParentPhoneError] = useState("");
  const [optInWhatsapp, setOptInWhatsapp] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNextStep = () => {
    if (step === 1 && selectedGrade) {
      setStep(2);
    }
  };

  const handleCompleteOnboarding = async () => {
    if (step === 2) {
      if (!parentPhone || !/^01[0125]\d{8}$/.test(parentPhone)) {
        setParentPhoneError("يرجى إدخال رقم موبايل مصري صحيح لولي الأمر (مثال: 01000000000)");
        return;
      }

      setParentPhoneError("");
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        console.log("Onboarding complete:", {
          grade: selectedGrade,
          parentPhone,
          optInWhatsapp,
        });
        router.push("/dashboard/student");
      } catch {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="space-y-8 w-full text-start">
      {/* Stepper Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-text-secondary">
          <span>الخطوة {step} من 2</span>
          <span>{step === 1 ? "اختيار الصف الدراسي" : "بيانات المتابعة"}</span>
        </div>

        {/* Stepper Circles & Connected Line */}
        <div className="relative flex items-center justify-between">
          <div className="absolute top-1/2 start-0 end-0 h-0.5 -translate-y-1/2 bg-border-theme -z-0" />
          <div
            className="absolute top-1/2 start-0 h-0.5 -translate-y-1/2 bg-accent-500 transition-all duration-300 -z-0"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />

          {/* Circle 1 */}
          <div
            className={cn(
              "relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-latin text-sm font-bold transition-all duration-200",
              step >= 1
                ? "bg-accent-500 text-white shadow-glow-accent ring-4 ring-bg-base"
                : "border-2 border-border-theme bg-bg-surface text-text-secondary",
            )}
          >
            1
          </div>

          {/* Circle 2 */}
          <div
            className={cn(
              "relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-latin text-sm font-bold transition-all duration-200",
              step === 2
                ? "bg-accent-500 text-white shadow-glow-accent ring-4 ring-bg-base"
                : "border-2 border-border-theme bg-bg-surface text-text-secondary",
            )}
          >
            2
          </div>
        </div>
      </div>

      {/* Step 1: Select Grade */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-ink tracking-tight">
              اختار صفك الدراسي
            </h2>
            <p className="text-sm text-text-secondary">
              هنفلتر لك الكورسات والمواد الدراسية المناسبة لسنتك بالضبط
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {grades.map((grade) => {
              const isSelected = selectedGrade === grade.id;
              return (
                <button
                  type="button"
                  key={grade.id}
                  onClick={() => setSelectedGrade(grade.id)}
                  className={cn(
                    "flex items-center justify-between p-5 rounded-2xl border transition-all duration-200 text-start cursor-pointer select-none",
                    isSelected
                      ? "border-2 border-accent-500 bg-accent-500/10 text-ink shadow-sm"
                      : "border-border-theme bg-bg-surface text-ink hover:border-accent-500/40 hover:bg-bg-surface-2",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-colors shrink-0",
                        isSelected ? "bg-accent-500 text-white" : "bg-accent-blob/40 text-accent-500",
                      )}
                    >
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-ink">{grade.label}</h3>
                      <p className="text-xs text-text-secondary mt-0.5">{grade.sublabel}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="h-6 w-6 text-accent-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <Button
            type="button"
            variant="gradient"
            size="lg"
            className="w-full font-bold shadow-glow-accent mt-4"
            disabled={!selectedGrade}
            onClick={handleNextStep}
          >
            <span>التالي</span>
            <ArrowLeft className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />
          </Button>
        </div>
      )}

      {/* Step 2: Parent Information */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-ink tracking-tight">
              بيانات ولي الأمر
            </h2>
            <p className="text-sm text-text-secondary">
              نرسل تقرير أسبوعي مباشر بالأداء والدرجات لإبقاء أسرتك على اطلاع دائم
            </p>
          </div>

          <div className="space-y-4 bg-bg-surface p-6 rounded-2xl border border-border-theme">
            <Input
              label="رقم موبايل ولي الأمر"
              placeholder="01000000000"
              type="tel"
              value={parentPhone}
              onChange={(e) => {
                setParentPhone(e.target.value);
                if (parentPhoneError) setParentPhoneError("");
              }}
              error={parentPhoneError}
              helperText="هنستخدم الرقم ده لإرسال تقرير أسبوعي عن أدائك عبر الواتساب"
            />

            <label className="flex items-start gap-2.5 pt-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={optInWhatsapp}
                onChange={(e) => setOptInWhatsapp(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border-theme text-accent-500 focus:ring-accent-500"
              />
              <span className="text-xs text-text-secondary leading-relaxed">
                ولي أمري موافق يستقبل تقارير واتساب الأسبوعية بالدرجات والحضور
              </span>
            </label>
          </div>

          {/* Helper WhatsApp callout box */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-accent-blob/20 border border-accent-500/20 text-xs text-ink">
            <MessageSquare className="h-5 w-5 text-accent-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              تقارير الواتساب مجانية بالكامل ومؤمنة، وتوفر لولي أمرك متابعة هادئة ومستمرة دون إزعاج.
            </p>
          </div>

          {/* Step 2 Navigation Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-1/3"
              onClick={() => setStep(1)}
              disabled={isSubmitting}
            >
              <ArrowRight className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />
              <span>السابق</span>
            </Button>

            <Button
              type="button"
              variant="gradient"
              size="lg"
              className="w-2/3 font-bold shadow-glow-accent"
              loading={isSubmitting}
              onClick={handleCompleteOnboarding}
            >
              <span>ابدأ رحلتك الآن</span>
              <ArrowLeft className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
