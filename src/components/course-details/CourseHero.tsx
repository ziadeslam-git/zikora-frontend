import Link from "next/link";
import {
  User,
  Star,
  Users,
  Video,
  Play,
  Lock,
  ChevronLeft,
} from "lucide-react";

export interface CourseHeroProps {
  title: string;
  subjectLabel: string;
  teacherName: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  lessonsCount: number;
  isFreePreview?: boolean;
}

/**
 * CourseHero — Course Details Hero Section (Server Component).
 * Dual-theme compliant: breadcrumbs, title, quick-info metrics, and video preview area
 * with free preview / locked state toggle.
 */
export function CourseHero({
  title,
  subjectLabel,
  teacherName,
  rating,
  reviewsCount,
  studentsCount,
  lessonsCount,
  isFreePreview = true,
}: CourseHeroProps) {
  return (
    <div className="bg-bg-surface border-b border-border-theme py-10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 space-y-8 text-start">
        {/* Breadcrumbs */}
        <nav
          className="flex items-center gap-2 text-sm text-text-secondary"
          aria-label="مسار التصفح"
        >
          <Link href="/" className="hover:text-accent-500 transition-colors">
            الرئيسية
          </Link>
          <ChevronLeft className="h-3.5 w-3.5 rtl:rotate-0 ltr:rotate-180 opacity-50" />
          <Link href="/courses" className="hover:text-accent-500 transition-colors">
            الكورسات
          </Link>
          <ChevronLeft className="h-3.5 w-3.5 rtl:rotate-0 ltr:rotate-180 opacity-50" />
          <span className="text-accent-500 font-semibold">{subjectLabel}</span>
          <ChevronLeft className="h-3.5 w-3.5 rtl:rotate-0 ltr:rotate-180 opacity-50" />
          <span className="text-ink truncate max-w-[200px]">{title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Info Column (Spans 7 cols on Desktop) */}
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-block rounded-full bg-accent-blob/40 px-3.5 py-1 text-xs font-semibold text-accent-text">
              {subjectLabel} · الصف الثالث الثانوي
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-tight tracking-tight">
              {title}
            </h1>

            {/* Quick Metrics Row */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary pt-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-accent-500" />
                <span className="font-semibold text-ink">{teacherName}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-bg-surface-2 px-2.5 py-1 rounded-lg border border-border-theme">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-ink font-latin">{rating.toFixed(1)}</span>
                <span className="text-xs text-text-secondary font-latin">({reviewsCount} تقييم)</span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-text-secondary" />
                <span className="font-latin">{studentsCount.toLocaleString("ar-EG")} طالب مسجل</span>
              </div>

              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-text-secondary" />
                <span>{lessonsCount} محاضرة</span>
              </div>
            </div>
          </div>

          {/* Right / Video Preview Area (Spans 5 cols on Desktop) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative aspect-video w-full rounded-2xl bg-bg-surface-2 border border-border-theme overflow-hidden shadow-lg flex items-center justify-center group">
              {isFreePreview ? (
                <>
                  <div className="flex flex-col items-center gap-3 text-center z-10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-500 text-white shadow-glow-accent group-hover:scale-110 transition-transform duration-200 cursor-pointer">
                      <Play className="h-8 w-8 fill-white ms-1" />
                    </div>
                    <span className="inline-block rounded-full bg-bg-base/90 backdrop-blur-xs px-4 py-1.5 text-xs font-bold text-ink border border-border-theme shadow-xs">
                      شاهد فيديو المعاينة المجاني 🍿
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
                </>
              ) : (
                <div className="flex flex-col items-center gap-3 text-center p-6 z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bg-surface border border-border-theme text-text-secondary shadow-xs">
                    <Lock className="h-7 w-7 text-accent-500" />
                  </div>
                  <span className="text-sm font-bold text-ink">
                    اشترك الآن لمشاهدة محتوى الكورس
                  </span>
                  <p className="text-xs text-text-secondary max-w-xs">
                    المحتوى محمي ومتاح فقط للطلاب المسجلين في هذه المادة
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
