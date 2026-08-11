import Link from "next/link";
import { User, Star, Users, Video, ChevronLeft } from "lucide-react";
import { ProtectedVideoPlayer } from "@/components/video/ProtectedVideoPlayer";

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
 * Dual-theme compliant: breadcrumbs, title, quick-info metrics, and ProtectedVideoPlayer
 * embedded preview area (FR-5 DRM Protected YouTube Player).
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

          {/* Right / Protected Video Preview Area (Spans 5 cols on Desktop) */}
          <div className="lg:col-span-5 w-full">
            <ProtectedVideoPlayer
              youtubeVideoId="dQw4w9WgXcQ"
              lectureId="course-preview-hero"
              thumbnailUrl="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop"
              isLocked={!isFreePreview}
              lockReason="not_enrolled"
              viewsUsed={1}
              viewsMax={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
