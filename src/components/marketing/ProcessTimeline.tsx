import Link from "next/link";
import { UserCheck, CreditCard, PlayCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";

const steps = [
  {
    number: "01",
    title: "اختار مدرسك ومادتك",
    description:
      "تصفّح المدرسين المعتمدين، شوف تقييمهم، واختار المادة اللي محتاجها بالظبط لسنتك الدراسية.",
    icon: UserCheck,
  },
  {
    number: "02",
    title: "اشترك بالطريقة اللي تناسبك",
    description:
      "اشترك شهري/ترم كامل، أو ادفع بالمحاضرة الواحدة بس — فودافون كاش وإنستاباي وفيزا كلهم متاحين.",
    icon: CreditCard,
  },
  {
    number: "03",
    title: "ذاكر بالفيديو وحل الامتحانات",
    description:
      "شاهد الشرح، حل امتحانات تصحح نفسها فورًا، واعرف نقط ضعفك بالظبط قبل ما تنسى.",
    icon: PlayCircle,
  },
  {
    number: "04",
    title: "تابع تقدمك وهو أهلك مطمنين",
    description:
      "داشبورد بتقدمك أول بأول، وتقرير واتساب أسبوعي بيوصل لولي أمرك تلقائيًا.",
    icon: MessageSquare,
  },
] as const;

/**
 * ProcessTimeline — Marketing Homepage 4-step Timeline (Server Component).
 * Renders a vertical connected timeline showing the student journey in 4 steps.
 */
export function ProcessTimeline() {
  return (
    <section className="py-20 lg:py-28 max-w-[1280px] mx-auto px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="inline-block rounded-full bg-orange-100 px-3.5 py-1 text-xs font-semibold text-orange-600">
          كيف تعمل المنصة؟
        </span>
        <h2 className="text-3xl lg:text-4xl font-bold text-ink">
          رحلتك التعليمية في 4 خطوات بسيطة
        </h2>
        <p className="text-neutral-600 text-base">
          خطوات واضحة وسريعة تبدأ بيها رحلة التفوق من أي مكان في مصر
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="relative max-w-4xl mx-auto space-y-12">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isLast = idx === steps.length - 1;

          return (
            <div key={step.number} className="relative flex gap-6 lg:gap-8 items-start">
              {/* Left timeline indicator column (RTL start) */}
              <div className="flex flex-col items-center shrink-0">
                {/* Number Circle */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FC5A05] to-[#491900] text-white font-bold text-lg flex items-center justify-center shadow-md font-latin shrink-0 z-10">
                  {step.number}
                </div>

                {/* Connecting Vertical Line */}
                {!isLast && (
                  <div className="w-0.5 bg-gradient-to-b from-orange-500 to-orange-200 h-24 my-2" />
                )}
              </div>

              {/* Step Card Content */}
              <div className="flex-1 bg-white border border-neutral-200 rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 shrink-0">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-xl font-bold text-ink">{step.title}</h3>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action CTA below timeline */}
      <div className="mt-16 text-center">
        <Link href="/about">
          <Button variant="outline" size="lg">
            شوف كل التفاصيل
          </Button>
        </Link>
      </div>
    </section>
  );
}
