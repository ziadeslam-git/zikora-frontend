import { Star, Quote } from "lucide-react";

interface TestimonialItem {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  avatarLetter: string;
  rating: number;
}

const testimonials: TestimonialItem[] = [
  {
    id: "1",
    quote:
      "المنصة غيّرت طريقة مذاكرتي تمامًا. الفيديوهات واضحة ومحمية، والامتحانات بعد كل فصل بتخليني أعرف غلطاتي فورًا وأصلحها قبل امتحانات الشهر.",
    authorName: "عمر خالد",
    authorRole: "طالب ثانوية عامة (علمي علوم)",
    avatarLetter: "ع",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "أهم ميزة بالنسبة لي كولي أمر هي تقرير الواتساب الأسبوعي. بقيت مطمنة على مستوى بنتي ومتابعة حضورها والدرجات من غير ما أضغط عليها.",
    authorName: "م. منى السيد",
    authorRole: "ولي أمر طالبة في 3 ثانوي",
    avatarLetter: "م",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "الدفع بفودافون كاش وإنستاباي سهّل علينا كتير. والمدرسين ممتاذين والشرح منظّم جدًا. منصة محترمة وتستاهل كل خير.",
    authorName: "أ. طارق عبدالكريم",
    authorRole: "ولي أمر طالب في 2 ثانوي",
    avatarLetter: "ط",
    rating: 5,
  },
];

/**
 * Testimonials — Marketing Homepage Testimonials Section (Server Component).
 * Dual-theme compliant: bg-bg-surface, border-border-theme, text-ink, text-text-secondary.
 */
export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 max-w-[1280px] mx-auto px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="inline-block rounded-full bg-accent-blob/40 px-3.5 py-1 text-xs font-semibold text-accent-text">
          آراء وتجارب
        </span>
        <h2 className="text-3xl lg:text-4xl font-bold text-ink">
          ماذا يقول طلابنا وأولياء الأمور عن Zikora؟
        </h2>
        <p className="text-text-secondary text-base">
          تجارب حقيقية لطلاب وأسر حققوا نتائج ملموسة مع معلمينا
        </p>
      </div>

      {/* Testimonials 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between bg-bg-surface rounded-2xl p-6 lg:p-8 border border-border-theme shadow-xs hover:shadow-md transition-all duration-200 relative text-start"
          >
            {/* Top Rating & Quote Icon */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1" aria-label={`تقييم ${item.rating} نجوم`}>
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-text-secondary opacity-40" aria-hidden="true" />
              </div>

              <p className="text-base text-ink leading-relaxed">
                «{item.quote}»
              </p>
            </div>

            {/* Author Profile Footer */}
            <div className="mt-8 pt-4 border-t border-border-theme flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500 text-white font-bold text-sm shrink-0 font-latin">
                {item.avatarLetter}
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-ink">{item.authorName}</p>
                <p className="text-xs text-text-secondary">{item.authorRole}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
