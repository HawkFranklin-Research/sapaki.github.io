"use client";

import { useEffect, useRef } from "react";

type SignalHighlightVideoProps = {
  active: boolean;
};

export default function SignalHighlightVideo({ active }: SignalHighlightVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!active) {
      video.pause();
      return;
    }
    void video.play().catch(() => undefined);
  }, [active]);

  return (
    <div className="signal-highlight-video">
      <video
        ref={videoRef}
        src="/videos/robot-olympics/10_highlights_recap.mp4"
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Humanoid robot dance highlights"
      />
    </div>
  );
}
