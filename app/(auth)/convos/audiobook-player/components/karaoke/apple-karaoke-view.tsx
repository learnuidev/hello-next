"use client";

import { isNonRomanLang } from "@/components/_select-character/utils/is-non-roman-lang";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { buildKaraokeChunks, findActiveChunkIndex } from "./karaoke-data";
import { KaraokeLine } from "./karaoke-line";
import { KaraokeStyles } from "./karaoke-styles";
import { useSmoothPlayhead } from "./use-smooth-playhead";

type AppleKaraokeViewProps = {
  transcriptions?: any[];
  /** Used when a caller only has the transcription currently being played. */
  fallbackTranscription?: any;
  lang?: string;
  currentTime: number;
  isPlaying: boolean;
  playerRef?: { current: any } | null;
  coverUrl?: string;
  /** Narrow column (video visible) instead of the full-width focus layout. */
  compact?: boolean;
  className?: string;
  seekAndPlay?: (time: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
};

/** Lines kept mounted around the active one — long books stay cheap. */
const WINDOW_BEFORE = 7;
const WINDOW_AFTER = 22;
const WINDOW_SIZE = WINDOW_BEFORE + WINDOW_AFTER;
const WINDOW_STEP = 4;

/** Spring that glides the sheet so the active line sits dead centre. */
const SPRING_STIFFNESS = 60;
const SPRING_DAMPING = 13;
const MAX_SCROLL_SPEED = 2600;

/** How long manual scrolling wins before auto-follow takes over again. */
const MANUAL_SCROLL_GRACE = 4000;

export function AppleKaraokeView({
  transcriptions,
  fallbackTranscription,
  lang = "",
  currentTime,
  isPlaying,
  playerRef,
  coverUrl,
  compact = false,
  className,
  seekAndPlay,
  onPlay,
  onPause,
}: AppleKaraokeViewProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const showEn = useBrightModeStore((state) => state.showEn);
  const showPinyin = useBrightModeStore((state) => state.showPinyin);
  const { showChinglish } = useChinglishState();

  const sourceTranscriptions = useMemo(() => {
    const list = (transcriptions || []).filter(Boolean);

    if (list.length > 0) {
      return list;
    }

    return fallbackTranscription ? [fallbackTranscription] : [];
  }, [transcriptions, fallbackTranscription]);

  const chunks = useMemo(
    () => buildKaraokeChunks(sourceTranscriptions as any[], lang),
    [sourceTranscriptions, lang],
  );

  const timeRef = useSmoothPlayhead({ playerRef, currentTime, isPlaying });

  const [activeIndex, setActiveIndex] = useState(-1);
  const activeIndexRef = useRef(-2);
  const [countdown, setCountdown] = useState(0);
  const countdownRef = useRef(-1);
  const [inGap, setInGap] = useState(false);
  const inGapRef = useRef(false);
  const [flashKey, setFlashKey] = useState<string | null>(null);
  const [stageHeight, setStageHeight] = useState(0);
  const [following, setFollowing] = useState(true);
  const followingRef = useRef(true);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const manualScrollUntilRef = useRef(0);
  const flashTimerRef = useRef<any>(null);

  const windowStart = useMemo(() => {
    if (chunks.length === 0) {
      return 0;
    }

    const active = activeIndex < 0 ? 0 : activeIndex;
    const desired = Math.max(0, active - WINDOW_BEFORE);
    const quantised = Math.floor(desired / WINDOW_STEP) * WINDOW_STEP;
    const lastStart = Math.max(0, chunks.length - WINDOW_SIZE);

    return Math.min(quantised, lastStart);
  }, [activeIndex, chunks.length]);

  const windowStartRef = useRef(windowStart);

  const windowChunks = useMemo(
    () => chunks.slice(windowStart, windowStart + WINDOW_SIZE),
    [chunks, windowStart],
  );

  // ── Playhead → active chunk / count-in / instrumental-gap tracking ─────────
  useEffect(() => {
    if (chunks.length === 0) {
      return;
    }

    let frame = 0;
    const firstStart = chunks[0].start;

    const loop = () => {
      frame = requestAnimationFrame(loop);

      const time = timeRef.current;
      const index = findActiveChunkIndex(chunks, time);

      if (index !== activeIndexRef.current) {
        activeIndexRef.current = index;
        setActiveIndex(index);
      }

      if (index < 0) {
        const remaining = Math.max(0, Math.ceil(firstStart - time));

        if (remaining !== countdownRef.current) {
          countdownRef.current = remaining;
          setCountdown(remaining);
        }
      } else {
        const next = chunks[index + 1];
        const gap =
          !!next && time > chunks[index].end + 0.35 && next.start - time > 2.2;

        if (gap !== inGapRef.current) {
          inGapRef.current = gap;
          setInGap(gap);
        }
      }
    };

    frame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frame);
  }, [chunks, timeRef]);

  // ── Auto-follow ───────────────────────────────────────────────────────────
  // Everything is derived from live DOM geometry every frame: the position of
  // the active line's text relative to the middle of the stage. Nothing is
  // cached, so wrapping, fonts or a translation appearing can never leave the
  // lyrics stranded off-screen.
  useEffect(() => {
    let frame = 0;
    let velocity = 0;
    let last = performance.now();
    let lastWindowStart = Number.NaN;

    const reduceMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const centerOffset = (stage: HTMLDivElement, line: HTMLElement) => {
      const stageRect = stage.getBoundingClientRect();
      const textEl = (line.firstElementChild as HTMLElement) || line;
      const rect = textEl.getBoundingClientRect();

      // During the count-in the first lines sit low so the ring has room.
      const anchor =
        activeIndexRef.current < 0
          ? stageRect.top + stageRect.height * 0.72
          : stageRect.top + stageRect.height / 2;

      return rect.top + rect.height / 2 - anchor;
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);

      const stage = stageRef.current;
      const dt = Math.min(Math.max((now - last) / 1000, 0.001), 0.05);
      last = now;

      if (!stage) {
        return;
      }

      const active = stage.querySelector<HTMLElement>('[data-k-active="1"]');

      if (!active) {
        return;
      }

      let offset = centerOffset(stage, active);

      // The rendered window slides in blocks; absorb that jump instantly so
      // nothing visibly moves at the moment the DOM changes under us.
      if (windowStartRef.current !== lastWindowStart) {
        lastWindowStart = windowStartRef.current;

        if (Math.abs(offset) < stage.clientHeight * 3) {
          stage.scrollTop += offset;
          return;
        }
      }

      if (now < manualScrollUntilRef.current) {
        if (followingRef.current) {
          followingRef.current = false;
          setFollowing(false);
        }

        return;
      }

      if (!followingRef.current) {
        followingRef.current = true;
        setFollowing(true);
      }

      if (Math.abs(offset) < 0.4 && Math.abs(velocity) < 8) {
        velocity = 0;
        return;
      }

      if (reduceMotion) {
        stage.scrollTop += offset;
        velocity = 0;
        return;
      }

      const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
      const step = dt / steps;

      for (let index = 0; index < steps; index++) {
        const accel = offset * SPRING_STIFFNESS - velocity * SPRING_DAMPING;

        velocity += accel * step;
        velocity = Math.max(
          Math.min(velocity, MAX_SCROLL_SPEED),
          -MAX_SCROLL_SPEED,
        );
      }

      stage.scrollTop += velocity * dt;

      // Re-read after writing: if the scroll was clamped (start or end of the
      // sheet), stop pushing instead of building up velocity against a wall.
      offset = centerOffset(stage, active);

      if (Math.abs(offset) < 0.4) {
        velocity = 0;
      }
    };

    frame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    windowStartRef.current = windowStart;

    // Keep the scroll position stable across a window slide.
    const stage = stageRef.current;

    if (stage) {
      stage.dataset.windowStart = `${windowStart}`;
    }
  }, [windowStart]);

  // Re-measure the stage whenever it resizes (layout, video toggle, rotation).
  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    setStageHeight(stage.clientHeight);

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => {
      setStageHeight(stage.clientHeight);
    });

    observer.observe(stage);

    return () => observer.disconnect();
  }, [compact]);

  // Keep the spacer height honest even if the element mounts before layout.
  useEffect(() => {
    const stage = stageRef.current;

    if (stage && stage.clientHeight !== stageHeight) {
      setStageHeight(stage.clientHeight);
    }
  });

  useEffect(() => {
    return () => {
      if (flashTimerRef.current) {
        clearTimeout(flashTimerRef.current);
      }
    };
  }, []);

  const pauseFollowing = useCallback((duration = MANUAL_SCROLL_GRACE) => {
    manualScrollUntilRef.current = performance.now() + duration;
  }, []);

  const handleSeek = useCallback(
    (time: number, key?: string) => {
      if (!Number.isFinite(time)) {
        return;
      }

      seekAndPlay?.(time);

      // Taking over the sheet: resume following the audio right away.
      manualScrollUntilRef.current = 0;

      setFlashKey(key ?? null);

      if (flashTimerRef.current) {
        clearTimeout(flashTimerRef.current);
      }

      flashTimerRef.current = setTimeout(() => setFlashKey(null), 560);
    },
    [seekAndPlay],
  );

  if (chunks.length === 0) {
    return (
      <div
        className={cn(
          "relative flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-[28px] border border-white/5 text-center",
          className,
        )}
      >
        <KaraokeStyles />
        <Icons.karaoke className="text-3xl opacity-40" />
        <p className="text-sm text-gray-500">
          No timed transcriptions yet — karaoke needs word timings.
        </p>
      </div>
    );
  }

  const showRoman = showPinyin && isNonRomanLang(lang);
  const isIntro = activeIndex < 0;
  const spacer = Math.max(stageHeight / 2, 0);

  const cssVars = {
    "--k-sung": isDark ? "#ffffff" : "#0b0b0f",
    "--k-unsung": isDark ? "rgba(255,255,255,0.32)" : "rgba(11,11,15,0.28)",
    "--k-muted": isDark ? "rgba(255,255,255,0.62)" : "rgba(11,11,15,0.6)",
    "--k-glow": isDark ? "rgba(255,255,255,0.3)" : "rgba(11,11,15,0.16)",
    "--k-flash": isDark ? "rgba(255,255,255,0.12)" : "rgba(11,11,15,0.08)",
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-[28px]",
        compact
          ? "min-h-[360px] shadow-[0_18px_60px_-30px_rgba(0,0,0,0.7)]"
          : "min-h-[520px] shadow-[0_30px_90px_-40px_rgba(0,0,0,0.8)]",
        className,
      )}
      style={cssVars}
    >
      <KaraokeStyles />

      {/* Ambient artwork, blurred and drifting like the Music app backdrop */}
      <div className="pointer-events-none absolute inset-0">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt=""
            className="mn-k-kenburns absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: isDark ? 0.45 : 0.55,
              filter: "blur(38px) saturate(1.35)",
            }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 20% 0%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(120% 90% at 90% 100%, rgba(236,72,153,0.28), transparent 60%)",
            }}
          />
        )}

        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 38%, rgba(0,0,0,0.7) 100%)"
              : "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.36) 38%, rgba(255,255,255,0.68) 100%)",
          }}
        />

        <div
          className="mn-k-breathe absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(255,255,255,0.16), transparent 62%)"
              : "radial-gradient(circle, rgba(255,255,255,0.9), transparent 62%)",
          }}
        />

        <div
          key={activeIndex}
          className="mn-k-beat absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(255,255,255,0.22), transparent 60%)"
              : "radial-gradient(circle, rgba(120,120,255,0.22), transparent 60%)",
          }}
        />
      </div>

      {/* Lyric sheet: a real scroll container, so you can browse it by hand */}
      <div
        ref={stageRef}
        onWheel={() => pauseFollowing()}
        onTouchStart={() => pauseFollowing()}
        onPointerDown={() => pauseFollowing()}
        className={cn(
          "mn-k-stage mn-k-scroll relative z-10 overflow-y-auto overscroll-contain",
          compact
            ? "h-[46vh] min-h-[300px] max-h-[420px]"
            : "h-[58vh] min-h-[400px] max-h-[640px]",
        )}
      >
        <div style={{ height: spacer }} />

        {windowChunks.map((chunk, index) => {
          const globalIndex = windowStart + index;
          const distance = globalIndex - activeIndex;
          const isLineActive = distance === 0;
          const showsGapDots = inGap && globalIndex === activeIndex + 1;

          const translation =
            showEn && chunk.isFirstOfParent
              ? showChinglish
                ? chunk.parent?.chinglish || chunk.parent?.en
                : chunk.parent?.en
              : undefined;

          return (
            <div key={chunk.key}>
              {showsGapDots && (
                <div className="flex items-center justify-center gap-1 py-1">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="mn-k-dot h-1.5 w-1.5 rounded-full"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(255,255,255,0.85)"
                          : "rgba(11,11,15,0.7)",
                        animationDelay: `${dot * 0.16}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              <KaraokeLine
                chunk={chunk}
                globalIndex={globalIndex}
                distance={distance}
                isActive={isLineActive}
                isPast={distance < 0}
                isFlashing={flashKey === chunk.key}
                showRoman={showRoman}
                showTranslation={!!translation}
                compact={compact}
                translation={translation}
                timeRef={timeRef}
                onSeekToken={handleSeek}
              />
            </div>
          );
        })}

        <div style={{ height: spacer }} />
      </div>

      {/* Count-in + first-play affordance */}
      {isIntro && (
        <div className="pointer-events-none absolute inset-x-0 top-[8%] z-20 flex flex-col items-center gap-3">
          <div className="relative flex h-20 w-20 items-center justify-center">
            {[0, 0.8, 1.6].map((delay) => (
              <span
                key={delay}
                className="mn-k-ring absolute inset-0 rounded-full border"
                style={{
                  borderColor: isDark
                    ? "rgba(255,255,255,0.35)"
                    : "rgba(11,11,15,0.25)",
                  animationDelay: `${delay}s`,
                }}
              />
            ))}
            <span className="mn-k-float text-4xl opacity-90">
              <Icons.music />
            </span>
          </div>

          <p className="text-[0.7rem] uppercase tracking-[0.4em] text-gray-500">
            starting in
          </p>

          <p
            className="text-5xl font-semibold tabular-nums"
            style={{ color: isDark ? "#fff" : "#0b0b0f" }}
          >
            {Math.max(countdown, 1)}
          </p>
        </div>
      )}

      {!isPlaying && currentTime === 0 && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <button
            onClick={() => onPlay?.()}
            className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 text-3xl backdrop-blur-md transition hover:scale-105 hover:bg-white/20"
            style={{ color: isDark ? "#fff" : "#0b0b0f" }}
          >
            <Icons.play />
          </button>
        </div>
      )}

      {/* Back to the current line, after browsing the sheet by hand */}
      {!isIntro && !following && (
        <button
          onClick={() => {
            manualScrollUntilRef.current = 0;
          }}
          className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-xs backdrop-blur-md transition hover:bg-black/50"
          style={{ color: isDark ? "#fff" : "#0b0b0f" }}
        >
          Back to current line
        </button>
      )}

      {/* Transport, so the view works before the auto-hiding dock comes back */}
      <div
        className={cn(
          "absolute bottom-3 right-4 z-30 flex items-center gap-2 transition-opacity duration-300",
          isPlaying && "opacity-0 group-hover:opacity-100",
        )}
      >
        <button
          onClick={() => (isPlaying ? onPause?.() : onPlay?.())}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/25 text-sm backdrop-blur-md transition hover:bg-black/40"
          style={{ color: isDark ? "#fff" : "#0b0b0f" }}
        >
          {isPlaying ? <Icons.pause /> : <Icons.play />}
        </button>
      </div>
    </div>
  );
}
