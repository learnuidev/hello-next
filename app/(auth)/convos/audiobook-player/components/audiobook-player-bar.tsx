"use client";

import { formatTime } from "../../_play/utils";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSmoothPlayhead } from "../hooks/use-smooth-playhead";
import type { DynamicLoop, LoopBoundary } from "../hooks/use-dynamic-loop";
import { DynamicLoopBar } from "./dynamic-loop-bar";
import {
  DynamicLoopFill,
  DynamicLoopHandles,
} from "./dynamic-loop-track";

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
  dynamicLoop,
}: {
  currentTime: number;
  duration: number;
  handleSeekChange: (value: number[]) => void;
  /** Used to draw where there is audio/lyrics and where the file is empty. */
  transcriptions?: any[];
  playerRef?: { current: any } | null;
  isPlaying?: boolean;
  /**
   * The dynamic loop, when the player has one. Everything the section picker
   * draws — the band, the two handles and the strip above the track — belongs to
   * this object, and the bar is only its surface.
   */
  dynamicLoop?: DynamicLoop | null;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  /** The played part of the looped section, inside the band. */
  const playedRef = useRef<HTMLDivElement>(null);
  const [hoverRatio, setHoverRatio] = useState<number | null>(null);
  const [dragRatio, setDragRatio] = useState<number | null>(null);
  const dragRatioRef = useRef<number | null>(null);
  /** Which section handle is under the finger, if any. */
  const [draggingBoundary, setDraggingBoundary] = useState<LoopBoundary | null>(
    null,
  );

  const range = dynamicLoop?.range ?? null;
  const pickingSection = !!range && dynamicLoop?.mode !== "off";

  // Read by the frame loop, which must not be resubscribed when the section
  // moves a handle's width.
  const sectionRef = useRef<{ start: number; end: number } | null>(null);

  useEffect(() => {
    sectionRef.current = range ? { start: range.start, end: range.end } : null;
  }, [range?.start, range?.end, range]);

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

      // How far through the looped section the playhead has got.
      const section = sectionRef.current;

      if (playedRef.current && section) {
        const span = section.end - section.start;

        const played =
          span > 0
            ? Math.max(
                0,
                Math.min((timeRef.current - section.start) / span, 1),
              )
            : 0;

        playedRef.current.style.transform = `scaleX(${played.toFixed(5)})`;
      }
    };

    frame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frame);
  }, [safeDuration, timeRef]);

  // ── Drag to scrub; the seek is committed on release ───────────────────────
  // Pointer capture (rather than window listeners) keeps this correct even for
  // a click faster than a React re-render.
  const finishDrag = useCallback(
    (clientX: number) => {
      if (dragRatioRef.current === null) {
        return;
      }

      const ratio = ratioFromEvent(clientX);

      dragRatioRef.current = null;
      setDragRatio(null);
      setHoverRatio(null);
      handleSeekChange([ratioToTime(ratio)]);
    },
    [handleSeekChange, ratioFromEvent, ratioToTime],
  );

  const previewRatio = dragRatio ?? hoverRatio;
  const previewTime = previewRatio !== null ? ratioToTime(previewRatio) : null;

  return (
    <div className="px-4 sm:px-8 sm:pt-4">
      {/* Rendered in every mode: the strip animates itself in and out, so
          closing the loop is a collapse rather than a disappearance. */}
      {dynamicLoop && (
        <DynamicLoopBar
          dynamicLoop={dynamicLoop}
          isPlaying={isPlaying}
          dimmed={!!draggingBoundary}
        />
      )}

      <div className="flex items-center gap-4">
        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(safeDuration)}
          aria-valuenow={Math.round(previewTime ?? currentTime ?? 0)}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture?.(event.pointerId);

            const ratio = ratioFromEvent(event.clientX);

            dragRatioRef.current = ratio;
            setDragRatio(ratio);
            setHoverRatio(ratio);
          }}
          onPointerMove={(event) => {
            const ratio = ratioFromEvent(event.clientX);

            if (dragRatioRef.current !== null) {
              dragRatioRef.current = ratio;
              setDragRatio(ratio);
            }

            setHoverRatio(ratio);
          }}
          onPointerUp={(event) => {
            event.currentTarget.releasePointerCapture?.(event.pointerId);
            finishDrag(event.clientX);
          }}
          onPointerCancel={(event) => {
            dragRatioRef.current = null;
            setDragRatio(null);
            setHoverRatio(null);
          }}
          onPointerLeave={() => {
            if (dragRatioRef.current === null) {
              setHoverRatio(null);
            }
          }}
          onKeyDown={(event) => {
            const step = event.shiftKey ? 10 : 5;

            if (event.key === "ArrowRight") {
              handleSeekChange([
                Math.min((currentTime || 0) + step, safeDuration),
              ]);
            } else if (event.key === "ArrowLeft") {
              handleSeekChange([Math.max((currentTime || 0) - step, 0)]);
            } else {
              return;
            }

            event.preventDefault();
          }}
          className="group relative w-full cursor-pointer touch-none select-none py-2"
        >
          {/* Track — the whole recording. It thickens while a section is being
              chosen, the way a scrubber grows into a range editor. */}
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-full bg-black/10 transition-[height] duration-200 dark:bg-white/[0.14]",
              pickingSection ? "h-2.5" : "h-1.5 group-hover:h-2",
            )}
          >
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

            {/* The looped section, drawn over everything the track knows. */}
            {dynamicLoop && (
              <DynamicLoopFill
                dynamicLoop={dynamicLoop}
                duration={safeDuration}
                playedRef={playedRef}
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

          {/* The two ends of the section, while it is being chosen. */}
          {dynamicLoop && (
            <DynamicLoopHandles
              dynamicLoop={dynamicLoop}
              duration={safeDuration}
              ratioFromEvent={ratioFromEvent}
              onDraggingChange={(which) => {
                setDraggingBoundary(which);

                // A handle drag owns the pointer: drop the scrub preview so the
                // two do not draw over each other.
                if (which) {
                  dragRatioRef.current = null;
                  setDragRatio(null);
                  setHoverRatio(null);
                }
              }}
            />
          )}

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
    </div>
  );
};
