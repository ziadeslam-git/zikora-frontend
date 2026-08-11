"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export interface PlayingStateProps {
  youtubeVideoId: string;
  onViewCompletion: () => void;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string | HTMLElement,
        config: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: unknown }) => void;
            onStateChange?: (event: { data: number; target: { getCurrentTime: () => number; getDuration: () => number } }) => void;
          };
        },
      ) => void;
      PlayerState: {
        PLAYING: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

/**
 * PlayingState — Active YouTube IFrame API Player Component.
 * Dynamically loads YouTube IFrame API, tracks 80% video completion ratio,
 * triggers onViewCompletion callback, and displays a temporary completion toast badge.
 */
export function PlayingState({
  youtubeVideoId,
  onViewCompletion,
}: PlayingStateProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const containerIdRef = useRef(`yt-player-${Math.random().toString(36).substr(2, 9)}`);
  const completionTrackedRef = useRef(false);

  const [showCompletionToast, setShowCompletionToast] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    let trackingInterval: NodeJS.Timeout | null = null;
    let toastTimeout: NodeJS.Timeout | null = null;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player || !playerRef.current) return;

      new window.YT.Player(containerIdRef.current, {
        videoId: youtubeVideoId,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          origin: typeof window !== "undefined" ? window.location.origin : "",
        },
        events: {
          onReady: () => {
            setIsPlayerReady(true);
          },
          onStateChange: (event) => {
            // Check progress when video is playing
            if (event.data === window.YT.PlayerState.PLAYING) {
              if (!trackingInterval) {
                trackingInterval = setInterval(() => {
                  if (completionTrackedRef.current) {
                    if (trackingInterval) clearInterval(trackingInterval);
                    return;
                  }

                  const player = event.target;
                  const currentTime = player.getCurrentTime();
                  const duration = player.getDuration();

                  if (duration > 0 && currentTime / duration >= 0.8) {
                    completionTrackedRef.current = true;
                    if (trackingInterval) clearInterval(trackingInterval);
                    onViewCompletion();
                    setShowCompletionToast(true);

                    toastTimeout = setTimeout(() => {
                      setShowCompletionToast(false);
                    }, 3500);
                  }
                }, 1000);
              }
            } else {
              if (trackingInterval) {
                clearInterval(trackingInterval);
                trackingInterval = null;
              }
            }
          },
        },
      });
    };

    // Load YouTube IFrame API script if not present
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    return () => {
      if (trackingInterval) clearInterval(trackingInterval);
      if (toastTimeout) clearTimeout(toastTimeout);
    };
  }, [youtubeVideoId, onViewCompletion]);

  return (
    <div className="relative aspect-video w-full rounded-2xl bg-black border border-border-theme overflow-hidden shadow-xl">
      {/* YouTube Player Target Container */}
      <div id={containerIdRef.current} ref={playerRef} className="h-full w-full" />

      {/* Top Banner Security & Status Bar */}
      <div className="absolute top-3 start-3 end-3 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-1.5 bg-bg-base/90 backdrop-blur-md px-3 py-1 rounded-full border border-border-theme text-[11px] font-bold text-ink shadow-xs">
          <ShieldCheck className="h-3.5 w-3.5 text-accent-500" />
          <span>بث محمي بنظام Zikora DRM</span>
        </div>

        {/* 80% View Completion Toast */}
        {showCompletionToast && (
          <div className="flex items-center gap-2 bg-emerald-500/90 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg animate-bounce">
            <CheckCircle2 className="h-4 w-4" />
            <span>تم احتساب المشاهدة المعتمدة ✓</span>
          </div>
        )}
      </div>
    </div>
  );
}
