import { Star, MessageSquare } from "lucide-react";

export interface ReviewItem {
  id: string;
  authorName: string;
  authorAvatarLetter: string;
  date: string;
  rating: number;
  comment: string;
}

const defaultReviews: ReviewItem[] = [
  {
    id: "1",
    authorName: "عمر أحمد",
    authorAvatarLetter: "ع",
    date: "منذ 3 أيام",
    rating: 5,
    comment:
      "الشرح ممتاز جداً والمسائل المتدرجة في الصعوبة بتساعد على الفهم العميق. الشرح مغطي كل قطاعات الامتحان.",
  },
  {
    id: "2",
    authorName: "سارة محمود",
    authorAvatarLetter: "س",
    date: "منذ أسبوع",
    rating: 5,
    comment:
      "الكورس منظّم والتقارير الأسبوعية بتخلي أهلي مطمنين عليا طول الترم. شكراً جداً لمستر سامح.",
  },
  {
    id: "3",
    authorName: "محمد عبدالفتاح",
    authorAvatarLetter: "م",
    date: "منذ أسبوعين",
    rating: 4,
    comment:
      "محتوى رائع وتصحيح الامتحانات الفوري بيعرفني غلطاتي في ساعتها، أتمنى زيادة بنك الأسئلة التفاعلية.",
  },
  {
    id: "4",
    authorName: "فاطمة إبراهيم",
    authorAvatarLetter: "ف",
    date: "منذ شهر",
    rating: 5,
    comment:
      "أفضل كورس كيمياء للثانوية العامة بدون مبالغة. الفيديوهات سلسة وحماية البث ممتازة.",
  },
  {
    id: "5",
    authorName: "خالد يوسف",
    authorAvatarLetter: "خ",
    date: "منذ شهرين",
    rating: 5,
    comment:
      "خطة المذاكرة والتسلسل الزمني بيسهل عليا أعرف فاضلي إيه وأخلص المنهج في وقته.",
  },
];

const starBreakdown = [
  { stars: 5, percentage: 82 },
  { stars: 4, percentage: 14 },
  { stars: 3, percentage: 3 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 0 },
];

export function ReviewsTab({ reviews = defaultReviews }: { reviews?: ReviewItem[] }) {
  return (
    <div className="space-y-10 text-start">
      {/* Rating Summary Header Box */}
      <div className="bg-bg-surface border border-border-theme rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-center gap-8 shadow-xs">
        {/* Left Average Box */}
        <div className="flex flex-col items-center justify-center text-center space-y-2 shrink-0 md:pe-8 md:border-e md:border-border-theme w-full md:w-auto">
          <span className="text-5xl font-extrabold text-ink font-latin">4.9</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs text-text-secondary">بناءً على 128 تقييم من الطلاب</span>
        </div>

        {/* Right 5-Row Star Breakdown */}
        <div className="flex-1 w-full space-y-2">
          {starBreakdown.map((row) => (
            <div key={row.stars} className="flex items-center gap-3 text-xs">
              <span className="w-12 font-latin font-bold text-ink flex items-center gap-1 shrink-0">
                {row.stars} <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              </span>
              <div className="flex-1 h-2 rounded-full bg-bg-surface-2 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${row.percentage}%` }}
                />
              </div>
              <span className="w-10 font-latin font-semibold text-text-secondary text-end shrink-0">
                {row.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Review Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-ink flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-accent-500" />
          <span>آراء الطلاب المسجلين ({reviews.length})</span>
        </h3>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-bg-surface border border-border-theme rounded-2xl p-6 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-500 text-white font-bold text-sm font-latin">
                    {review.authorAvatarLetter}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink">{review.authorName}</h4>
                    <span className="text-xs text-text-secondary font-latin">{review.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-sm text-ink leading-relaxed">
                «{review.comment}»
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
