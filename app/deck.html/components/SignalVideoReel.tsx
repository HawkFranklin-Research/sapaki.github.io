"use client";

import { useEffect, useRef, useState } from "react";

const clips = [
  {
    src: "/videos/robot-olympics/04_football_siuuu.mp4",
    label: "FOOTBALL",
    start: 2,
    end: 7,
  },
  {
    src: "/videos/robot-olympics/07_taichi_martial_arts.mp4",
    label: "TAI CHI",
    start: 9,
    end: 15,
  },
] as const;

type SignalVideoReelProps = {
  active: boolean;
};

export default function SignalVideoReel({ active }: SignalVideoReelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const transitionTimer = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const transitionLocked = useRef(false);
  const [clipIndex, setClipIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const clip = clips[clipIndex];

  const playCurrentClip = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = clip.start;
    if (active) void video.play().catch(() => undefined);
  };

  const showCurrentClip = () => {
    if (active) void videoRef.current?.play().catch(() => undefined);
    transitionLocked.current = false;
    setTransitioning(false);
  };

  const advance = () => {
    if (transitionLocked.current) return;
    transitionLocked.current = true;
    setTransitioning(true);
    transitionTimer.current = window.setTimeout(() => {
      setClipIndex((current) => (current + 1) % clips.length);
    }, 260);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!active) {
      video.pause();
      return;
    }
    if (video.currentTime < clip.start || video.currentTime >= clip.end) video.currentTime = clip.start;
    void video.play().catch(() => undefined);
  }, [active, clip.end, clip.start]);

  useEffect(() => () => {
    if (transitionTimer.current) window.clearTimeout(transitionTimer.current);
  }, []);

  return (
    <div className={`signal-video-reel ${transitioning ? "is-transitioning" : ""}`}>
      <video
        key={clip.src}
        ref={videoRef}
        src={clip.src}
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={playCurrentClip}
        onCanPlay={showCurrentClip}
        onTimeUpdate={(event) => {
          if (event.currentTarget.currentTime >= clip.end) advance();
        }}
        aria-label={`${clip.label.toLowerCase()} robot demonstration`}
      />
      <div className="signal-video-shade" aria-hidden="true" />
      <b>SHUFFLE CUT · {String(clipIndex + 1).padStart(2, "0")}/{String(clips.length).padStart(2, "0")}</b>
      <span>{clip.label}</span>
    </div>
  );
}
