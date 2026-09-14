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
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { buildKaraokeChunks, findActiveChunkIndex } from "./karaoke-data";
import { KaraokeLine } from "./karaoke-line";
import { KaraokeStyles } from "./karaoke-styles";
import { useSmoothPlayhead } from "../../hooks/use-smooth-playhead";

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
const SPRING_STIFFNESS = 90;
/** Damped to critical: settles crisply instead of bouncing past the line. */
const SPRING_DAMPING = 19;
const MAX_SCROLL_SPEED = 1400;

/**
 * After a tap the sheet is held perfectly still until the seek has settled.
 * A tap changes the active line, the rendered range and the playhead at once,
 * and a slow seek can report its new position a few hundred milliseconds later.
 * Waiting for the highlight to stop moving — with a floor and a ceiling — means
 * the glide always starts from the line you tapped, in one clean movement.
 */
const TAP_HOLD_MIN_MS = 150;
const TAP_HOLD_MAX_MS = 700;
const TAP_HOLD_STABLE_FRAMES = 3;

/** How long manual scrolling wins before auto-follow takes over again. */
const MANUAL_SCROLL_GRACE = 4000;

/** While browsing by hand, the rendered range grows/slides in these steps. */
const BROWSE_STEP = 30;
const BROWSE_MAX = 100;

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
  /** Non-null while the reader is browsing: an explicit rendered range. */
  const [browseRange, setBrowseRange] = useState<{
    start: number;
    end: number;
  } | null>(null);
  const browseRangeRef = useRef<{ start: number; end: number } | null>(null);
  const reanchorRef = useRef(false);
  const holdRef = useRef<null | {
    until: number;
    expire: number;
    index: number;
    stable: number;
  }>(null);
  /** Range the last measured target belongs to (guards against stale targets). */
  const desiredKeyRef = useRef("");
  const settleFramesRef = useRef(0);
  const windowStartRef = useRef(0);
  const windowEndRef = useRef(0);
  const chunksRef = useRef<any[]>([]);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const manualScrollUntilRef = useRef(0);
  const flashTimerRef = useRef<any>(null);

  /** Content-space scrollTop that centres the active line (set pre-paint). */
  const desiredScrollRef = useRef<number | null>(null);
  /** Where we believe the scroll is, without reading it every frame. */
  const virtualScrollRef = useRef<number | null>(null);
  const resyncInRef = useRef(0);
  const positionedRef = useRef(false);
  const samplesRef = useRef<{ el: HTMLElement; top: number }[]>([]);

  const autoWindowStart = useMemo(() => {
    if (chunks.length === 0) {
      return 0;
    }

    const active = activeIndex < 0 ? 0 : activeIndex;
    const desired = Math.max(0, active - WINDOW_BEFORE);
    const quantised = Math.floor(desired / WINDOW_STEP) * WINDOW_STEP;
    const lastStart = Math.max(0, chunks.length - WINDOW_SIZE);

    return Math.min(quantised, lastStart);
  }, [activeIndex, chunks.length]);

  const windowStart = browseRange ? browseRange.start : autoWindowStart;
  const windowEnd = browseRange
    ? browseRange.end
    : Math.min(chunks.length, autoWindowStart + WINDOW_SIZE);

  const windowChunks = useMemo(
    () => chunks.slice(windowStart, windowEnd),
    [chunks, windowStart, windowEnd],
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
  // Measurements happen once per commit, before the browser paints; the frame
  // loop that follows them is pure arithmetic plus a single scrollTop write.
  // Two rules keep the result smooth:
  //
  // 1. Lines are addressed in *content* space (`offsetTop`), so the target
  //    position never depends on where the sheet currently happens to be
  //    rendered — a re-render can never leave the lyrics stranded.
  // 2. When the rendered window slides, the content above the active line
  //    changes height. That shift is detected on a *retained* line and baked
  //    into scrollTop in the same pre-paint pass, so nothing visibly moves —
  //    and, crucially, it never drags a reader who has scrolled away back to
  //    the singer.
  useLayoutEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    windowStartRef.current = windowStart;
    windowEndRef.current = windowEnd;
    browseRangeRef.current = browseRange;
    chunksRef.current = chunks;

    const lines = stage.querySelectorAll<HTMLElement>("[data-k-index]");
    const nextSamples: { el: HTMLElement; top: number }[] = [];

    for (let index = 0; index < lines.length; index += 4) {
      nextSamples.push({ el: lines[index], top: lines[index].offsetTop });
    }

    // Absorb any content shift before it can be painted.
    let shift = 0;

    for (const sample of samplesRef.current) {
      if (sample.el.isConnected) {
        shift = sample.el.offsetTop - sample.top;
        break;
      }
    }

    samplesRef.current = nextSamples;

    // Never compensate for a shift we are about to re-anchor anyway: when a
    // browsed range collapses, the content above the active line disappears and
    // scrollTop would slam into its clamp instead of holding still.
    if (shift !== 0 && !reanchorRef.current) {
      stage.scrollTop += shift;
      virtualScrollRef.current = null;
    }

    const active = stage.querySelector<HTMLElement>('[data-k-active="1"]');

    // The singer's line can be outside a browsed range; the loop must not chase
    // a target from before that range existed.
    if (!active) {
      desiredScrollRef.current = null;
      return;
    }

    const stageHeight = stage.clientHeight;
    const anchor =
      activeIndexRef.current < 0 ? stageHeight * 0.72 : stageHeight / 2;

    desiredScrollRef.current =
      active.offsetTop + active.offsetHeight / 2 - anchor;
    desiredKeyRef.current = `${windowStart}:${windowEnd}`;

    // First paint — or coming back from a range that no longer held the active
    // line — land on the current line instead of animating through the book.
    if (!positionedRef.current || reanchorRef.current) {
      positionedRef.current = true;
      reanchorRef.current = false;
      stage.scrollTop = desiredScrollRef.current;
      virtualScrollRef.current = desiredScrollRef.current;
    }
  });

  useEffect(() => {
    let frame = 0;
    let velocity = 0;
    let last = performance.now();

    const reduceMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /**
     * Keeps the rendered range one screen ahead of a browsing reader, so the
     * sheet never runs out of lyrics before the start or the end of the book.
     */
    const extendBrowseRange = (stage: HTMLDivElement) => {
      const total = chunksRef.current.length;
      const { start, end } = { start: windowStartRef.current, end: windowEndRef.current };
      const stageHeight = stage.clientHeight;

      if (!stageHeight || total === 0) {
        return;
      }

      const nearTop = stage.scrollTop < stageHeight * 0.9;
      const nearBottom =
        stage.scrollHeight - stage.scrollTop - stageHeight < stageHeight * 0.9;

      const next = (() => {
        if (nearTop && start > 0) {
          const nextStart = Math.max(0, start - BROWSE_STEP);

          return {
            start: nextStart,
            end: Math.min(total, nextStart + BROWSE_MAX),
          };
        }

        if (nearBottom && end < total) {
          const nextEnd = Math.min(total, end + BROWSE_STEP);

          return { start: Math.max(0, nextEnd - BROWSE_MAX), end: nextEnd };
        }

        return null;
      })();

      if (!next) {
        return;
      }

      setBrowseRange((previous) => {
        if (
          previous &&
          previous.start === next.start &&
          previous.end === next.end
        ) {
          return previous;
        }

        return next;
      });
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);

      const stage = stageRef.current;
      const dt = Math.min(Math.max((now - last) / 1000, 0.001), 0.05);
      last = now;

      if (!stage) {
        return;
      }

      if (now < manualScrollUntilRef.current) {
        if (followingRef.current) {
          followingRef.current = false;
          setFollowing(false);
        }

        // Cheap (a few layout reads, no writes), so run it every frame and the
        // sheet is always one screen ahead of the reader.
        extendBrowseRange(stage);

        velocity = 0;
        virtualScrollRef.current = null;
        return;
      }

      if (!followingRef.current) {
        followingRef.current = true;
        setFollowing(true);

        // Coming back to auto-follow: the singing line may have left the
        // browsed range. Add it rather than teleporting — adding content never
        // moves what is already on screen, so the sheet can glide there from
        // wherever the reader is looking.
        if (!stage.querySelector('[data-k-active="1"]')) {
          const index = activeIndexRef.current;
          const total = chunksRef.current.length;
          const start = windowStartRef.current;
          const end = windowEndRef.current;
          const reach = WINDOW_SIZE * 2;

          if (
            index >= 0 &&
            total > 0 &&
            index >= start - reach &&
            index <= end + reach
          ) {
            settleFramesRef.current = 0;
            setBrowseRange({
              start: Math.min(start, Math.max(0, index - WINDOW_BEFORE)),
              end: Math.max(end, Math.min(total, index + WINDOW_AFTER)),
            });
            return;
          }

          // Far away: one clean jump back to the singer.
          reanchorRef.current = true;
          setBrowseRange(null);
          return;
        }
      }

      const desired = desiredScrollRef.current;

      if (desired === null) {
        return;
      }

      // Settling window after a tap: stay exactly where we are (tracking the
      // real scroll position) until the highlighted line stops changing, so the
      // animation starts from under the finger.
      if (holdRef.current) {
        const hold = holdRef.current;
        const index = activeIndexRef.current;

        if (index === hold.index) {
          hold.stable += 1;
        } else {
          hold.index = index;
          hold.stable = 0;
        }

        const ready =
          now >= hold.until && hold.stable >= TAP_HOLD_STABLE_FRAMES;

        if (!ready && now < hold.expire) {
          velocity = 0;
          virtualScrollRef.current = stage.scrollTop;
          return;
        }

        holdRef.current = null;
        velocity = 0;
        virtualScrollRef.current = stage.scrollTop;
      }

      // Hand the browsed range back to the tight auto window — but only once the
      // sheet has been still *and* the target was measured against the range we
      // are about to replace. Collapsing mid-glide is what made the sheet appear
      // to jump instead of animating from the line that was tapped.
      if (browseRangeRef.current) {
        const settled =
          virtualScrollRef.current !== null &&
          Math.abs(desired - virtualScrollRef.current) < 1.5;

        settleFramesRef.current = settled
          ? settleFramesRef.current + 1
          : 0;

        const fresh =
          desiredKeyRef.current ===
          `${windowStartRef.current}:${windowEndRef.current}`;

        if (fresh && settleFramesRef.current > 12) {
          settleFramesRef.current = 0;
          reanchorRef.current = true;
          setBrowseRange(null);
        }
      }

      // Trust our own bookkeeping between syncs: reading scrollTop every frame
      // would force a style flush right after writing it.
      if (virtualScrollRef.current === null || resyncInRef.current <= 0) {
        virtualScrollRef.current = stage.scrollTop;
        resyncInRef.current = 12;
      }

      resyncInRef.current -= 1;

      const error = desired - virtualScrollRef.current;

      if (Math.abs(error) < 0.4 && Math.abs(velocity) < 8) {
        velocity = 0;
        virtualScrollRef.current = desired;
        return;
      }

      if (reduceMotion) {
        velocity = 0;
        virtualScrollRef.current = desired;
        stage.scrollTop = desired;
        return;
      }

      // Targets further than this cannot come from a line the reader tapped;
      // treat them as a jump rather than a long high-speed flight.
      if (Math.abs(error) > stage.clientHeight * 1.5) {
        velocity = 0;
        virtualScrollRef.current = desired;
        stage.scrollTop = desired;
        return;
      }

      const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
      const step = dt / steps;

      for (let index = 0; index < steps; index++) {
        const accel = error * SPRING_STIFFNESS - velocity * SPRING_DAMPING;

        velocity += accel * step;
        velocity = Math.max(
          Math.min(velocity, MAX_SCROLL_SPEED),
          -MAX_SCROLL_SPEED,
        );
      }

      // Always glide: a click on a line half a screen away travels from what
      // the reader is looking at instead of teleporting there.
      virtualScrollRef.current += velocity * dt;
      stage.scrollTop = virtualScrollRef.current;
    };

    frame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frame);
  }, []);

  // The spacer that lets the first and last lines reach the middle depends on
  // the stage height, so read it before the first paint and keep it in sync.
  useLayoutEffect(() => {
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

      // Move the playhead now instead of waiting for the next progress tick:
      // until that arrives, the reported time still points at the old line and
      // the sheet would start gliding the wrong way before correcting itself.
      timeRef.current = time;

      // Let the seek land before the sheet moves at all, so the glide starts
      // from the line that was tapped.
      const now = performance.now();

      holdRef.current = {
        until: now + TAP_HOLD_MIN_MS,
        expire: now + TAP_HOLD_MAX_MS,
        index: activeIndexRef.current,
        stable: 0,
      };
      settleFramesRef.current = 0;

      // Taking over the sheet: resume following the audio right away.
      manualScrollUntilRef.current = 0;

      setFlashKey(key ?? null);

      if (flashTimerRef.current) {
        clearTimeout(flashTimerRef.current);
      }

      flashTimerRef.current = setTimeout(() => setFlashKey(null), 560);
    },
    [seekAndPlay, timeRef],
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

  // Driven by the data as well as the language: content can arrive with a
  // different language code ("zh-CN") or only carry a line-level reading.
  const showRoman =
    showPinyin &&
    (isNonRomanLang(lang) || chunks.some((chunk) => chunk.hasRoman));
  const isIntro = activeIndex < 0;
  const spacer = Math.max(stageHeight / 2, 0);

  const cssVars = {
    "--k-sung": isDark ? "#ffffff" : "#0b0b0f",
    "--k-unsung": isDark ? "rgba(255,255,255,0.4)" : "rgba(11,11,15,0.34)",
    "--k-muted": isDark ? "rgba(255,255,255,0.62)" : "rgba(11,11,15,0.6)",
    "--k-glow-rgb": isDark ? "255,255,255" : "11,11,15",
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
