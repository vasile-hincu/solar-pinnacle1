import { useEffect, useMemo, useRef, useState } from "react";

type SeamlessLoopVideoProps = {
  mp4Src: string;
  webmSrc?: string;
  posterSrc?: string;
  className?: string;
  mediaClassName?: string;
  fadeMs?: number;
  fallbackImgClassName?: string;
  onVideoError?: () => void;
};

export function SeamlessLoopVideo({
  mp4Src,
  webmSrc,
  posterSrc,
  className,
  mediaClassName,
  fadeMs = 1200,
  fallbackImgClassName,
  onVideoError,
}: SeamlessLoopVideoProps) {
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const switchingRef = useRef(false);

  const [active, setActive] = useState<"a" | "b">("a");
  const [videoFailed, setVideoFailed] = useState(false);

  const fadeSeconds = useMemo(() => Math.max(0.6, fadeMs / 1000), [fadeMs]);

  useEffect(() => {
    if (videoFailed) return;

    const activeVideo = active === "a" ? videoARef.current : videoBRef.current;
    const inactiveVideo = active === "a" ? videoBRef.current : videoARef.current;

    if (!activeVideo || !inactiveVideo) return;

    const safePlay = async (video: HTMLVideoElement) => {
      try {
        await video.play();
      } catch {
        // Autoplay can be blocked in some environments.
      }
    };

    const start = async () => {
      activeVideo.muted = true;
      activeVideo.playsInline = true;
      inactiveVideo.muted = true;
      inactiveVideo.playsInline = true;

      await safePlay(activeVideo);

      const tick = () => {
        const v = active === "a" ? videoARef.current : videoBRef.current;
        const next = active === "a" ? videoBRef.current : videoARef.current;

        if (!v || !next) {
          rafIdRef.current = window.requestAnimationFrame(tick);
          return;
        }

        const duration = v.duration;

        if (
          Number.isFinite(duration) &&
          duration > 0 &&
          !switchingRef.current &&
          v.currentTime >= duration - fadeSeconds
        ) {
          switchingRef.current = true;

          try {
            next.currentTime = 0;
          } catch {
            // ignore
          }

          void safePlay(next);

          // Swap which layer is visible.
          setActive((prev) => (prev === "a" ? "b" : "a"));

          window.setTimeout(() => {
            try {
              v.pause();
              v.currentTime = 0;
            } catch {
              // ignore
            }
            switchingRef.current = false;
          }, fadeMs);
        }

        rafIdRef.current = window.requestAnimationFrame(tick);
      };

      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    void start();

    return () => {
      if (rafIdRef.current) window.cancelAnimationFrame(rafIdRef.current);
    };
  }, [active, fadeMs, fadeSeconds, videoFailed]);

  if (videoFailed) {
    return posterSrc ? (
      <img
        src={posterSrc}
        alt=""
        aria-hidden="true"
        className={fallbackImgClassName}
      />
    ) : null;
  }

  const commonVideoProps = {
    muted: true,
    playsInline: true,
    autoPlay: true,
    preload: "auto" as const,
    onError: () => {
      setVideoFailed(true);
      onVideoError?.();
    },
    className: mediaClassName,
    style: {
      transition: `opacity ${fadeMs}ms ease-in-out`,
    },
  };

  return (
    <div className={className}>
      <video
        ref={videoARef}
        {...commonVideoProps}
        style={{
          ...commonVideoProps.style,
          opacity: active === "a" ? 1 : 0,
        }}
      >
        {webmSrc ? <source src={webmSrc} type="video/webm" /> : null}
        <source src={mp4Src} type="video/mp4" />
      </video>

      <video
        ref={videoBRef}
        {...commonVideoProps}
        style={{
          ...commonVideoProps.style,
          opacity: active === "b" ? 1 : 0,
        }}
      >
        {webmSrc ? <source src={webmSrc} type="video/webm" /> : null}
        <source src={mp4Src} type="video/mp4" />
      </video>
    </div>
  );
}
