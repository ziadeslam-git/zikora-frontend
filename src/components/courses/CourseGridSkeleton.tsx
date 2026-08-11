/**
 * CourseGridSkeleton — Suspense fallback for the Course Catalog results grid.
 * Renders 8 pulsating skeleton cards matching exact CourseCard dimensions.
 */
export function CourseGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col bg-bg-surface rounded-2xl border border-border-theme overflow-hidden shadow-xs animate-pulse"
        >
          {/* Skeleton Thumbnail */}
          <div className="aspect-video w-full bg-bg-surface-2" />

          {/* Skeleton Content Body */}
          <div className="p-5 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-bg-surface-2 shrink-0" />
                <div className="h-3 w-24 rounded bg-bg-surface-2" />
              </div>
              <div className="h-4 w-full rounded bg-bg-surface-2" />
              <div className="h-4 w-3/4 rounded bg-bg-surface-2" />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border-theme">
              <div className="h-5 w-16 rounded bg-bg-surface-2" />
              <div className="h-4 w-12 rounded bg-bg-surface-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
