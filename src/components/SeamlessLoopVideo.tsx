import { useEffect, useMemo, useRef, useState } from "react";

type SeamlessLoopVideoProps = {
  mp4Src: string;
  webmSrc?: string;
  posterSrc?: string;
  className?: string;
  mediaClassName?: string;
  overlayClassName?: string;
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
  overlayClassName,
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
  const [needsUserGesture, setNeedsUserGesture] = useState(false);
  const [showPlayControl, setShowPlayControl] = useState(false);

  const fadeSeconds = useMemo(() => Math.max(0.6, fadeMs / 1000), [fadeMs]);

  useEffect(() => {
    if (videoFailed) return;

    const activeVideo = active === "a" ? videoARef.current : videoBRef.current;
    const inactiveVideo = active === "a" ? videoBRef.current : videoARef.current;

    if (!activeVideo || !inactiveVideo) return;

    const safePlay = async (video: HTMLVideoElement) => {
      try {
        await video.play();
        setNeedsUserGesture(false);
        return true;
      } catch (error) {
        const err = error as { name?: string; message?: string };

        // Autoplay blocked until user interaction.
        if (err?.name === "NotAllowedError") {
          setNeedsUserGesture(true);
          return false;
        }

        // Unsupported source/codec can reject play().
        if (err?.name === "NotSupportedError") {
          setVideoFailed(true);
          onVideoError?.();
          return false;
        }

        return false;
      }
    };

    const start = async () => {
      activeVideo.muted = true;
      activeVideo.playsInline = true;
      inactiveVideo.muted = true;
      inactiveVideo.playsInline = true;

      await safePlay(activeVideo);

      // Some browsers won't throw on autoplay failure; they just keep the video paused.
      // If after a short delay it's still not playing, show a manual play control.
      const checkTimer = window.setTimeout(() => {
        const v = active === "a" ? videoARef.current : videoBRef.current;
        if (!v) return;
        if (v.paused || v.readyState < 2) setShowPlayControl(true);
      }, 1200);

      const onPlaying = () => {
        setShowPlayControl(false);
        setNeedsUserGesture(false);
      };

      const onPause = () => {
        setShowPlayControl(true);
      };

      activeVideo.addEventListener("playing", onPlaying);
      activeVideo.addEventListener("pause", onPause);

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

      return () => {
        window.clearTimeout(checkTimer);
        activeVideo.removeEventListener("playing", onPlaying);
        activeVideo.removeEventListener("pause", onPause);
      };
    };

    let cleanup: (() => void) | undefined;
    void (async () => {
      cleanup = await start();
    })();

    return () => {
      if (rafIdRef.current) window.cancelAnimationFrame(rafIdRef.current);
      cleanup?.();
    };
  }, [active, fadeMs, fadeSeconds, videoFailed]);

  if (videoFailed) {
    return posterSrc ? (
      <div className={className}>
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          className={fallbackImgClassName}
        />
        {overlayClassName ? <div className={overlayClassName} /> : null}

        <div className="absolute bottom-4 right-4 z-20 rounded-full bg-background/80 px-4 py-2 text-sm font-medium text-foreground shadow-lg backdrop-blur">
          Video indisponibil
        </div>
      </div>
    ) : null;
  }

  const commonVideoProps = {
    muted: true,
    playsInline: true,
    autoPlay: true,
    controls: false,
    disablePictureInPicture: true,
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

      {overlayClassName ? <div className={overlayClassName} /> : null}

      {needsUserGesture ? (
        <button
          type="button"
          onClick={() => {
            void videoARef.current?.play();
            void videoBRef.current?.play();
            setNeedsUserGesture(false);
            setShowPlayControl(false);
          }}
          className="absolute bottom-4 right-4 z-20 rounded-full bg-background/80 px-4 py-2 text-sm font-medium text-foreground shadow-lg backdrop-blur hover:bg-background/90"
        >
          Pornește video
        </button>
      ) : showPlayControl ? (
        <button
          type="button"
          onClick={() => {
            const v = active === "a" ? videoARef.current : videoBRef.current;
            void v?.play();
            setShowPlayControl(false);
          }}
          className="absolute bottom-4 right-4 z-20 rounded-full bg-background/80 px-4 py-2 text-sm font-medium text-foreground shadow-lg backdrop-blur hover:bg-background/90"
        >
          Pornește video
        </button>
      ) : null}
    </div>
  );
}
