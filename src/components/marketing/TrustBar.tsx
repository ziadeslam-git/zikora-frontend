export interface TrustStatItem {
  value: string;
  label: string;
}

export interface TrustBarProps {
  stats?: TrustStatItem[];
}

const defaultStats: TrustStatItem[] = [
  { value: "+500", label: "مدرس معتمد" },
  { value: "+10,000", label: "ساعة فيديو عالية الجودة" },
  { value: "95%", label: "نسبة رضا الطلاب والنتائج" },
  { value: "24/7", label: "دعم فني وتواصل مستمر" },
];

/**
 * TrustBar — Marketing Homepage Trust Bar (Server Component).
 * Renders key platform metrics in a clean 4-column responsive grid.
 */
export function TrustBar({ stats = defaultStats }: TrustBarProps) {
  return (
    <section className="bg-white border-y border-neutral-200 py-10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-x-reverse divide-neutral-200/60 lg:divide-x lg:divide-x-reverse">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl lg:text-4xl font-extrabold text-ink font-latin tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-neutral-600 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
