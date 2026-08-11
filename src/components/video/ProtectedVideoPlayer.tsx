"use client";

import { useState } from "react";
import { LockedState } from "@/components/video/LockedState";
import { ReadyToPlayState } from "@/components/video/ReadyToPlayState";
import { PlayingState } from "@/components/video/PlayingState";
import { LimitReachedState } from "@/components/video/LimitReachedState";
import { DeviceMismatchState } from "@/components/video/DeviceMismatchState";

export interface ProtectedVideoPlayerProps {
  youtubeVideoId: string;
  lectureId: string;
  thumbnailUrl: string;
  isLocked?: boolean;
  lockReason?: "not_enrolled" | "sequential_lock";
  viewsUsed?: number;
  viewsMax?: number;
}

export type VideoPlayerState =
  | "locked"
  | "ready"
  | "playing"
  | "limit_reached"
  | "device_mismatch";

// TODO: Replace with real API integration (POST /api/v1/lectures/:id/register-play)
async function mockRegisterVideoPlay(
  lectureId: string,
  viewsUsed: number,
  viewsMax: number,
): Promise<{
  allowed: boolean;
  reason?: "limit_reached" | "device_mismatch";
  viewsUsed: number;
  viewsMax: number;
}> {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
  if (viewsUsed >= viewsMax) {
    return { allowed: false, reason: "limit_reached", viewsUsed, viewsMax };
  }
  return { allowed: true, viewsUsed: viewsUsed + 1, viewsMax };
}

// TODO: Replace with real API integration (POST /api/v1/lectures/:id/record-completion)
async function mockRecordViewCompletion(lectureId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  console.log(`[DRM API] Lecture ${lectureId} 80% view completion recorded successfully.`);
}

/**
 * ProtectedVideoPlayer — Core Protected Video Player Component.
 * Implements FR-5 DRM & Device Binding client-side presentation:
 * 1. Facade Pattern (Zero iframe payload until user clicks Play)
 * 2. 80% completion ratio view tracking
 * 3. 5 visual playback states (locked, ready, playing, limit_reached, device_mismatch)
 */
export function ProtectedVideoPlayer({
  youtubeVideoId,
  lectureId,
  thumbnailUrl,
  isLocked = false,
  lockReason = "not_enrolled",
  viewsUsed = 1,
  viewsMax = 3,
}: ProtectedVideoPlayerProps) {
  // Initialize initial state based on props
  const getInitialState = (): VideoPlayerState => {
    if (isLocked) return "locked";
    if (viewsUsed >= viewsMax) return "limit_reached";
    return "ready";
  };

  const [playerState, setPlayerState] = useState<VideoPlayerState>(getInitialState);
  const [currentViewsUsed, setCurrentViewsUsed] = useState(viewsUsed);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayClick = async () => {
    setIsLoading(true);
    try {
      // Register video play with backend API (includes device fingerprint validation)
      const res = await mockRegisterVideoPlay(lectureId, currentViewsUsed, viewsMax);

      if (res.allowed) {
        setCurrentViewsUsed(res.viewsUsed);
        setPlayerState("playing");
      } else if (res.reason === "device_mismatch") {
        setPlayerState("device_mismatch");
      } else {
        setPlayerState("limit_reached");
      }
    } catch {
      setPlayerState("limit_reached");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewCompletion = () => {
    mockRecordViewCompletion(lectureId);
  };

  return (
    <div className="w-full">
      {playerState === "locked" && <LockedState lockReason={lockReason} />}

      {playerState === "ready" && (
        <ReadyToPlayState
          thumbnailUrl={thumbnailUrl}
          viewsUsed={currentViewsUsed}
          viewsMax={viewsMax}
          isLoading={isLoading}
          onPlayClick={handlePlayClick}
        />
      )}

      {playerState === "playing" && (
        <PlayingState
          youtubeVideoId={youtubeVideoId}
          onViewCompletion={handleViewCompletion}
        />
      )}

      {playerState === "limit_reached" && (
        <LimitReachedState viewsUsed={currentViewsUsed} viewsMax={viewsMax} />
      )}

      {playerState === "device_mismatch" && <DeviceMismatchState />}
    </div>
  );
}
