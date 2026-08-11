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
 * Theme-aware 4-column responsive metrics bar.
 */
export function TrustBar({ stats = defaultStats }: TrustBarProps) {
  return (
    <section className="bg-bg-surface border-y border-border-theme py-10 shadow-xs">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon ?? Users;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-2xl bg-bg-base/60 border border-border-theme hover:border-accent-500/40 hover:bg-bg-surface-2 transition-all duration-200"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-blob/40 text-accent-500 shrink-0">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="flex flex-col text-start">
                  <span className="text-2xl lg:text-3xl font-extrabold text-ink font-latin tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-text-secondary mt-0.5">
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
