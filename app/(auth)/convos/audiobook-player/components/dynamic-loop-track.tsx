"use client";

import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { formatTime } from "../../_play/utils";
import type { DynamicLoop, LoopBoundary } from "../hooks/use-dynamic-loop";

/**
 * The loop section, drawn on the scrubber.
 *
 * Two pieces, because the track clips its own contents and a handle must not be
 * clipped: `DynamicLoopFill` goes *inside* the track (the band, the marks of the
 * lines it covers, how far through it the playhead is), and
 * `DynamicLoopHandles` sits beside it, on top of everything.
 *
 * The handles are the section picker: drag one and it snaps to the start (or the
 * end) of the line it was dropped on, so a section is always a whole number of
 * lines — never half a sentence.
 */

/** How many line marks a section may draw inside itself. */
const MAX_TICKS = 240;

const clock = (seconds: number) => formatTime(Math.max(0, seconds));

/** Keeps a label from hanging off the end of the track. */
const labelAlignment = (ratio: number) => {
  if (ratio < 0.12) {
    return "left-0";
  }

  if (ratio > 0.88) {
    return "right-0";
  }

  return "left-1/2 -translate-x-1/2";
};

export const DynamicLoopFill = ({
  dynamicLoop,
  view,
  playedRef,
}: {
  dynamicLoop: DynamicLoop;
  /** The stretch of recording the track is showing. */
  view: { start: number; end: number };
  /** Written by the bar's frame loop: how far into the section we are. */
  playedRef?: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const range = dynamicLoop.range;
  /** Looping a committed section: the track *is* the section. */
  const zoomed = dynamicLoop.mode === "active";
  const span = Math.max(view.end - view.start, 0.001);

  // The lines the section covers, so the marks and the snapping agree.
  const ticks = useMemo(() => {
    if (!range) {
      return [];
    }

    return dynamicLoop.lines
      .filter(
        (line) => line.start > range.start + 0.05 && line.start < range.end,
      )
      .slice(0, MAX_TICKS);
  }, [dynamicLoop.lines, range]);

  if (!range || view.end <= view.start) {
    return null;
  }

  const tickLeft = (start: number) => `${((start - view.start) / span) * 100}%`;

  // Zoomed in, there is nothing to frame: no band to draw around the section and
  // nothing outside it to dim — the played fill is already the section's own
  // progress. Only the line marks are worth keeping.
  if (zoomed) {
    return (
      <>
        {ticks.map((line) => (
          <span
            key={line.id ?? line.index}
            className="absolute inset-y-0 w-px bg-black/15 dark:bg-white/25"
            style={{ left: tickLeft(line.start) }}
          />
        ))}
      </>
    );
  }

  const left = ((range.start - view.start) / span) * 100;
  const width = ((range.end - range.start) / span) * 100;

  return (
    <>
      {/* Everything outside the section steps back, so the section is what the
          eye lands on. */}
      <div
        className="absolute inset-y-0 left-0 bg-white/45 dark:bg-black/40"
        style={{ width: `${left}%` }}
      />
      <div
        className="absolute inset-y-0 right-0 bg-white/45 dark:bg-black/40"
        style={{ width: `${Math.max(0, 100 - left - width)}%` }}
      />

      <div
        className="absolute inset-y-0 overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
        style={{ left: `${left}%`, width: `${width}%` }}
      >
        {/* How far through the section the playhead has got. */}
        <div
          ref={playedRef}
          className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-white/35"
          style={{ transform: "scaleX(0)" }}
        />

        {ticks.map((line) => (
          <span
            key={line.id ?? line.index}
            className="absolute inset-y-0 w-px bg-white/45"
            style={{
              left: `${((line.start - range.start) / (range.end - range.start)) * 100}%`,
            }}
          />
        ))}
      </div>
    </>
  );
};

/** One draggable boundary. */
const LoopHandle = ({
  which,
  time,
  duration,
  dynamicLoop,
  dragging,
  onDraggingChange,
  ratioFromEvent,
}: {
  which: LoopBoundary;
  time: number;
  duration: number;
  dynamicLoop: DynamicLoop;
  dragging: LoopBoundary | null;
  onDraggingChange: (which: LoopBoundary | null) => void;
  ratioFromEvent: (clientX: number) => number;
}) => {
  const [focused, setFocused] = useState(false);

  const ratio = duration > 0 ? Math.max(0, Math.min(time / duration, 1)) : 0;
  const isDragging = dragging === which;
  const isStart = which === "start";

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label={isStart ? "Loop start" : "Loop end"}
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={Math.round(duration)}
      aria-valuenow={Math.round(time)}
      aria-valuetext={clock(time)}
      onPointerDown={(event) => {
        // The track underneath scrubs; a handle must not.
        event.stopPropagation();

        if (duration <= 0) {
          return;
        }

        event.currentTarget.setPointerCapture?.(event.pointerId);
        onDraggingChange(which);
      }}
      onPointerMove={(event) => {
        if (!isDragging) {
          return;
        }

        event.stopPropagation();
        dynamicLoop.setBoundary(which, ratioFromEvent(event.clientX) * duration);
      }}
      onPointerUp={(event) => {
        if (!isDragging) {
          return;
        }

        event.stopPropagation();
        onDraggingChange(null);
        dynamicLoop.settleBoundary(which);
      }}
      onPointerCancel={() => onDraggingChange(null)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={(event) => {
        const step = event.shiftKey ? 5 : 1;

        if (event.key === "ArrowLeft") {
          dynamicLoop.nudgeBoundary(which, -step);
        } else if (event.key === "ArrowRight") {
          dynamicLoop.nudgeBoundary(which, step);
        } else {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
      }}
      className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 touch-none cursor-ew-resize outline-none"
      style={{ left: `${ratio * 100}%` }}
    >
      <span
        className={cn(
          "block rounded-full bg-white shadow-[0_1px_6px_rgba(0,0,0,0.35)] ring-2 ring-indigo-500",
          "transition-transform duration-150 ease-out",
          isDragging
            ? "h-4 w-4 scale-110"
            : focused
              ? "h-4 w-4 scale-110 shadow-[0_0_0_4px_rgba(99,102,241,0.25)]"
              : "h-3.5 w-3.5 hover:scale-110",
        )}
      />

      {/* A generous hit area around a 14px dot. */}
      <span className="absolute -inset-x-2 -inset-y-3" />

      {(isDragging || focused) && (
        <span
          className={cn(
            "pointer-events-none absolute bottom-full mb-3 whitespace-nowrap rounded-md border border-black/5 bg-white/95 px-2 py-0.5 text-[11px] font-medium tabular-nums text-black shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-[rgb(28,29,31)]/95 dark:text-white",
            labelAlignment(ratio),
          )}
        >
          <span className="mr-1 text-indigo-500">
            {isStart ? "Start" : "End"}
          </span>
          {clock(time)}
        </span>
      )}
    </div>
  );
};

export const DynamicLoopHandles = ({
  dynamicLoop,
  duration,
  ratioFromEvent,
  onDraggingChange,
}: {
  dynamicLoop: DynamicLoop;
  duration: number;
  ratioFromEvent: (clientX: number) => number;
  onDraggingChange?: (which: LoopBoundary | null) => void;
}) => {
  const [dragging, setDragging] = useState<LoopBoundary | null>(null);
  const range = dynamicLoop.range;

  if (!range || dynamicLoop.mode !== "selecting") {
    return null;
  }

  return (
    <>
      <LoopHandle
        which="start"
        time={range.start}
        duration={duration}
        dynamicLoop={dynamicLoop}
        dragging={dragging}
        ratioFromEvent={ratioFromEvent}
        onDraggingChange={(next) => {
          setDragging(next);
          onDraggingChange?.(next);
        }}
      />
      <LoopHandle
        which="end"
        time={range.end}
        duration={duration}
        dynamicLoop={dynamicLoop}
        dragging={dragging}
        ratioFromEvent={ratioFromEvent}
        onDraggingChange={(next) => {
          setDragging(next);
          onDraggingChange?.(next);
        }}
      />
    </>
  );
};
