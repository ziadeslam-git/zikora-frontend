import Link from "next/link";
import { Star, BookOpen, CheckCircle2, Play } from "lucide-react";

export interface CourseCardProps {
  id: string;
  subjectLabel: string;
  teacherName: string;
  teacherAvatarUrl?: string;
  title: string;
  price: string | number;
  rating: number;
  lessonsCount?: number;
  thumbnailUrl?: string;
  badgeTag?: string;
}

/**
 * CourseCard — Reusable Course Card component (Server Component).
 * Dual-theme compliant: bg-bg-surface, border-border-theme, text-ink, text-accent-500.
 * Action tag reads "افتح الآن".
 */
export function CourseCard({
  id,
  subjectLabel,
  teacherName,
  teacherAvatarUrl,
  title,
  price,
  rating,
  lessonsCount = 12,
  thumbnailUrl,
  badgeTag = "افتح الآن",
}: CourseCardProps) {
  const formattedPrice =
    typeof price === "number" ? `ج.م ${price.toLocaleString("ar-EG")}` : price;

  return (
    <Link
      href={`/courses/${id}`}
      className="group flex flex-col bg-bg-surface rounded-2xl border border-border-theme overflow-hidden hover:border-accent-500/50 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Thumbnail Aspect Ratio 16:9 */}
      <div className="relative aspect-video w-full bg-bg-surface-2 overflow-hidden flex items-center justify-center border-b border-border-theme">
        {thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-accent-500">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bg-base shadow-xs group-hover:scale-110 transition-transform border border-border-theme">
              <BookOpen className="h-6 w-6 text-accent-500" />
            </div>
            <span className="text-xs font-bold text-text-secondary font-latin">{subjectLabel}</span>
          </div>
        )}

        {/* Subject Label Badge */}
        <span className="absolute top-3 end-3 bg-bg-base/95 backdrop-blur-xs rounded-full px-3 py-1 text-xs font-bold text-ink shadow-xs border border-border-theme">
          {subjectLabel}
        </span>

        {/* Action / Status Badge ("افتح الآن") */}
        <span className="absolute bottom-3 start-3 bg-ink/80 text-white backdrop-blur-xs rounded-md px-2.5 py-0.5 text-[11px] font-medium flex items-center gap-1">
          <Play className="h-2.5 w-2.5 fill-accent-500 text-accent-500" />
          {badgeTag}
        </span>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4 text-start">
        <div className="space-y-2.5">
          {/* Teacher Row */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-500 text-white font-bold text-xs shrink-0 ring-1 ring-accent-blob">
              {teacherAvatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={teacherAvatarUrl}
                  alt={teacherName}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                teacherName.charAt(0)
              )}
            </div>
            <span className="text-xs font-semibold text-text-secondary truncate">
              {teacherName}
            </span>
            <CheckCircle2 className="h-3.5 w-3.5 text-accent-500 shrink-0" aria-label="معلم معتمد" />
          </div>

          {/* Course Title */}
          <h3 className="text-base font-bold text-ink line-clamp-2 group-hover:text-accent-500 transition-colors leading-snug">
            {title}
          </h3>
        </div>

        {/* Bottom Row: Price & Rating */}
        <div className="flex items-center justify-between pt-3 border-t border-border-theme">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-extrabold text-accent-500 font-latin">
              {formattedPrice}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-bg-surface-2 px-2 py-1 rounded-lg border border-border-theme">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span className="text-xs font-bold text-ink font-latin">{rating.toFixed(1)}</span>
            <span className="text-[11px] text-text-secondary font-latin">({lessonsCount})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
