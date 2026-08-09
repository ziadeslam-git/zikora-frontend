import { Users, Video, Award, Headphones, type LucideIcon } from "lucide-react";

export interface TrustStatItem {
  value: string;
  label: string;
  icon?: LucideIcon;
}

export interface TrustBarProps {
  stats?: TrustStatItem[];
}

const defaultStats: TrustStatItem[] = [
  { value: "+500", label: "معلم معتمد ومحترف", icon: Users },
  { value: "+10,000", label: "ساعة فيديو فائقة الجودة", icon: Video },
  { value: "95%", label: "نسبة نجاح ورضا الطلاب", icon: Award },
  { value: "24/7", label: "دعم فني وتواصل مستمر", icon: Headphones },
];

/**
 * TrustBar — Marketing Homepage Trust Bar (Server Component).
 * Renders key platform metrics with icons, subtle card containers, and vibrant numbers.
 */
export function TrustBar({ stats = defaultStats }: TrustBarProps) {
  return (
    <section className="bg-white border-y border-neutral-200/80 py-10 shadow-xs">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon ?? Users;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50/60 border border-neutral-200/60 hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-200"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 shrink-0">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="flex flex-col text-start">
                  <span className="text-2xl lg:text-3xl font-extrabold text-ink font-latin tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-neutral-600 mt-0.5">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
