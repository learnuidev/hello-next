"use client";

import { formatTime } from "../../_play/utils";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSmoothPlayhead } from "../hooks/use-smooth-playhead";

/** Gaps at least this long read as "no audio here" on the scrubber. */
const EMPTY_GAP_SECONDS = 2;

type Range = { start: number; end: number };

/** Merges the transcription spans so overlapping lines don't stack up. */
const toRanges = (transcriptions: any[] | undefined, duration: number) => {
  const spans: Range[] = (transcriptions || [])
    .filter(Boolean)
    .map((line: any) => ({
      start: Math.max(0, Number(line.start) || 0),
      end: Math.min(duration, Number(line.end) || 0),
    }))
    .filter((span) => span.end > span.start)
    .sort((a, b) => a.start - b.start);

  const merged: Range[] = [];

  spans.forEach((span) => {
    const last = merged[merged.length - 1];

    if (last && span.start <= last.end + 0.001) {
      last.end = Math.max(last.end, span.end);
      return;
    }

    merged.push({ ...span });
  });

  return merged;
};

export const AudiobookPlayerBar = ({
  duration,
  currentTime,
  handleSeekChange,
  transcriptions,
  playerRef,
  isPlaying,
}: {
  currentTime: number;
  duration: number;
  handleSeekChange: (value: number[]) => void;
  /** Used to draw where there is audio/lyrics and where the file is empty. */
  transcriptions?: any[];
  playerRef?: { current: any } | null;
  isPlaying?: boolean;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const [hoverRatio, setHoverRatio] = useState<number | null>(null);
  const [dragRatio, setDragRatio] = useState<number | null>(null);
  const dragRatioRef = useRef<number | null>(null);

  const safeDuration = duration > 0 ? duration : 0;

  const timeRef = useSmoothPlayhead({
    playerRef,
    currentTime,
    isPlaying: !!isPlaying,
  });

  const { contentRanges, emptyRanges, firstStart } = useMemo(() => {
    if (!safeDuration) {
      return { contentRanges: [] as Range[], emptyRanges: [] as Range[], firstStart: 0 };
    }

    const content = toRanges(transcriptions, safeDuration);
    const empty: Range[] = [];
    let cursor = 0;

    content.forEach((range) => {
      if (range.start - cursor >= EMPTY_GAP_SECONDS) {
        empty.push({ start: cursor, end: range.start });
      }

      cursor = Math.max(cursor, range.end);
    });

    if (safeDuration - cursor >= EMPTY_GAP_SECONDS) {
      empty.push({ start: cursor, end: safeDuration });
    }

    return {
      contentRanges: content,
      emptyRanges: empty,
      firstStart: content[0]?.start ?? 0,
    };
  }, [transcriptions, safeDuration]);

  const ratioToTime = useCallback(
    (ratio: number) => Math.max(0, Math.min(ratio, 1)) * safeDuration,
    [safeDuration],
  );

  const ratioFromEvent = useCallback((clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();

    if (!rect || rect.width === 0) {
      return 0;
    }

    return Math.max(0, Math.min((clientX - rect.left) / rect.width, 1));
  }, []);

  // ── Fill + knob follow a 60fps playhead, written straight to the DOM ──────
  useEffect(() => {
    let frame = 0;

    const loop = () => {
      frame = requestAnimationFrame(loop);

      if (!safeDuration) {
        return;
      }

      const ratio = Math.max(
        0,
        Math.min((dragRatioRef.current ?? timeRef.current) / safeDuration, 1),
      );

      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${ratio.toFixed(5)})`;
      }

      if (knobRef.current) {
        knobRef.current.style.transform = `translate3d(${(
          ratio * (trackRef.current?.clientWidth ?? 0)
        ).toFixed(2)}px, -50%, 0)`;
      }
    };

    frame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frame);
  }, [safeDuration, timeRef]);

  // ── Drag to scrub; the seek is committed on release ───────────────────────
  useEffect(() => {
    if (dragRatio === null) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      const ratio = ratioFromEvent(event.clientX);

      dragRatioRef.current = ratio;
      setDragRatio(ratio);
      setHoverRatio(ratio);
    };

    const onUp = (event: PointerEvent) => {
      const ratio = ratioFromEvent(event.clientX);

      dragRatioRef.current = null;
      setDragRatio(null);
      handleSeekChange([ratioToTime(ratio)]);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragRatio, handleSeekChange, ratioFromEvent, ratioToTime]);

  const previewRatio = dragRatio ?? hoverRatio;
  const previewTime = previewRatio !== null ? ratioToTime(previewRatio) : null;

  return (
    <div className="flex items-center gap-4 px-4 sm:px-8 sm:pt-4">
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={Math.round(safeDuration)}
        aria-valuenow={Math.round(previewTime ?? currentTime ?? 0)}
        onPointerDown={(event) => {
          const ratio = ratioFromEvent(event.clientX);

          dragRatioRef.current = ratio;
          setDragRatio(ratio);
        }}
        onPointerMove={(event) => {
          if (dragRatioRef.current === null) {
            setHoverRatio(ratioFromEvent(event.clientX));
          }
        }}
        onPointerLeave={() => {
          if (dragRatioRef.current === null) {
            setHoverRatio(null);
          }
        }}
        onKeyDown={(event) => {
          const step = event.shiftKey ? 10 : 5;

          if (event.key === "ArrowRight") {
            handleSeekChange([Math.min((currentTime || 0) + step, safeDuration)]);
          } else if (event.key === "ArrowLeft") {
            handleSeekChange([Math.max((currentTime || 0) - step, 0)]);
          } else {
            return;
          }

          event.preventDefault();
        }}
        className="group relative w-full cursor-pointer touch-none select-none py-2"
      >
        {/* Track — the whole recording */}
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-black/10 transition-[height] duration-200 group-hover:h-2 dark:bg-white/[0.14]">
          {/* Played portion */}
          <div
            ref={fillRef}
            className="absolute inset-y-0 left-0 w-full origin-left bg-black/80 dark:bg-white"
            style={{ transform: "scaleX(0)" }}
          />

          {/* Nothing to hear here — punched through whatever is underneath */}
          {emptyRanges.map((range) => (
            <div
              key={`empty-${range.start}`}
              className="absolute inset-y-0 bg-white/75 dark:bg-black/40"
              style={{
                left: `${(range.start / safeDuration) * 100}%`,
                width: `${((range.end - range.start) / safeDuration) * 100}%`,
              }}
            />
          ))}

          {/* Where the audio actually starts */}
          {firstStart > 0.5 && (
            <div
              className="absolute -inset-y-1 w-[2px] rounded-full bg-black/30 dark:bg-white/50"
              style={{ left: `${(firstStart / safeDuration) * 100}%` }}
            />
          )}
        </div>

        {/* Scrub preview */}
        {hoverRatio !== null && (
          <div
            className="pointer-events-none absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-black/25 dark:bg-white/25"
            style={{ width: `${(hoverRatio * 100).toFixed(2)}%` }}
          />
        )}

        {/* Knob — appears under the pointer, like the Music app. The position
            lives on the wrapper so the scale transition stays independent. */}
        <div
          ref={knobRef}
          className="pointer-events-none absolute left-0 top-1/2 h-0 w-0"
        >
          <div
            className={cn(
              "-ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.35)] transition-transform duration-200",
              previewRatio === null
                ? "scale-0 group-hover:scale-100"
                : dragRatio !== null
                  ? "scale-125"
                  : "scale-100",
            )}
          />
        </div>

        {/* Time bubble */}
        {hoverRatio !== null && safeDuration > 0 && (
          <div
            className="pointer-events-none absolute -top-6 -translate-x-1/2 rounded-md border border-black/5 bg-white/95 px-2 py-0.5 text-[11px] font-medium tabular-nums text-black shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-[rgb(28,29,31)]/95 dark:text-white"
            style={{ left: `${(hoverRatio * 100).toFixed(2)}%` }}
          >
            {formatTime(previewTime ?? 0)}
          </div>
        )}
      </div>
    </div>
  );
};
