import Link from "next/link";
import { Star, BookOpen } from "lucide-react";

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
}

/**
 * CourseCard — Reusable Course Card component (Server Component).
 * Rendered in 16:9 thumbnail ratio with subject badge, teacher avatar, course title,
 * price, and star ratings.
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
}: CourseCardProps) {
  const formattedPrice =
    typeof price === "number" ? `£ ${price.toLocaleString("ar-EG")}` : price;

  return (
    <Link
      href={`/courses/${id}`}
      className="group flex flex-col bg-white rounded-2xl border border-neutral-200/90 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      {/* Thumbnail Aspect Ratio 16:9 */}
      <div className="relative aspect-video w-full bg-gradient-to-br from-orange-100 to-orange-200 overflow-hidden flex items-center justify-center">
        {thumbnailUrl ? (
          // eslint-disable-next-next/no-img-element
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-orange-500/80">
            <BookOpen className="h-10 w-10" />
            <span className="text-xs font-semibold text-neutral-600">{subjectLabel}</span>
          </div>
        )}

        {/* Subject Label Badge */}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs rounded-full px-3 py-1 text-xs font-semibold text-ink shadow-xs">
          {subjectLabel}
        </span>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div className="space-y-2">
          {/* Teacher Row */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-xs shrink-0 border border-orange-200">
              {teacherAvatarUrl ? (
                // eslint-disable-next-next/no-img-element
                <img
                  src={teacherAvatarUrl}
                  alt={teacherName}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                teacherName.charAt(0)
              )}
            </div>
            <span className="text-xs font-medium text-neutral-600 truncate">
              {teacherName}
            </span>
          </div>

          {/* Course Title */}
          <h3 className="text-base font-bold text-ink line-clamp-2 group-hover:text-orange-500 transition-colors leading-snug">
            {title}
          </h3>
        </div>

        {/* Bottom Row: Price & Rating */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-orange-600 font-latin">
              {formattedPrice}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400 shrink-0" />
            <span className="text-xs font-bold text-ink font-latin">{rating.toFixed(1)}</span>
            <span className="text-xs text-neutral-400">({lessonsCount} درس)</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
