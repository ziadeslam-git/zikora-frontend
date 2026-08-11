import { Play, Eye, Loader2 } from "lucide-react";

export interface ReadyToPlayStateProps {
  thumbnailUrl: string;
  viewsUsed: number;
  viewsMax: number;
  isLoading?: boolean;
  onPlayClick: () => void;
}

/**
 * ReadyToPlayState — Facade Pattern / Click-to-Load Video Player Component.
 * ZERO YouTube iframe loaded until the user explicitly clicks the play button,
 * saving ~500KB+ JS payload and speeding up course page rendering.
 */
export function ReadyToPlayState({
  thumbnailUrl,
  viewsUsed,
  viewsMax,
  isLoading = false,
  onPlayClick,
}: ReadyToPlayStateProps) {
  return (
    <div
      onClick={!isLoading ? onPlayClick : undefined}
      className="relative aspect-video w-full rounded-2xl bg-bg-surface-2 border border-border-theme overflow-hidden shadow-lg group cursor-pointer select-none"
    >
      {/* Custom Thumbnail Image / Fallback Gradient */}
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt="صورة المحاضرة المصغرة"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-brand-gradient opacity-90" />
      )}

      {/* Dark Backdrop Overlay */}
      <div className="absolute inset-0 bg-ink/40 transition-opacity duration-200 group-hover:bg-ink/30" />

      {/* Top-End View Counter Badge */}
      <div className="absolute top-4 end-4 z-10">
        <div className="flex items-center gap-1.5 bg-bg-base/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-border-theme text-xs font-bold text-ink shadow-sm">
          <Eye className="h-3.5 w-3.5 text-accent-500" />
          <span>
            شاهدت <span className="font-latin">{viewsUsed}</span> من{" "}
            <span className="font-latin">{viewsMax}</span> مرات مسموحة
          </span>
        </div>
      </div>

      {/* Center Play Button Facade */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {isLoading ? (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-500/90 backdrop-blur-md text-white shadow-glow-accent">
            <Loader2 className="h-9 w-9 animate-spin" />
          </div>
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-500/90 backdrop-blur-md text-white shadow-glow-accent group-hover:scale-110 transition-transform duration-200">
            <Play className="h-9 w-9 fill-white ms-1" />
          </div>
        )}
      </div>

      {/* Bottom Text Bar */}
      <div className="absolute bottom-4 start-4 z-10">
        <span className="text-xs font-bold text-white/90 bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20">
          انقر للتشغيل الآمن 🔐
        </span>
      </div>
    </div>
  );
}
