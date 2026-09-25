"use client";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SavedLoop, useSavedLoopsStore } from "../stores/use-saved-loops-store";
import { loopColor } from "../utils/loop-colors";
import {
  LANE_HEIGHT,
  lanesHeight,
  placeLoopChips,
} from "../utils/loop-chip-placement";
import { LoopColorPicker } from "./loop-color-picker";
import { LoopNameField } from "./loop-name-field";

/**
 * The saved loops, sitting directly above their own ranges on the scrubber.
 *
 * Not a list beside the bar — a marker over the stretch of recording it stands
 * for, in its own colour, the way a region is labelled on a timeline. Two chips
 * that would collide stack upwards instead of overprinting, and each of them
 * claims exactly the width of what it names.
 *
 * They are always there, whatever the player is doing: saving a loop is how you
 * say "I will want this again", and a loop you have to enter a mode to find is a
 * loop you will not use.
 */

/**
 * Measuring has to happen before the browser paints, or the chips would appear a
 * frame after the bar they belong to. The server has no layout to measure, so it
 * falls back to the ordinary effect there.
 */
const useMeasureEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const clock = (seconds: number) => {
  const total = Math.max(1, Math.round(seconds));

  if (total < 60) {
    return `${total}s`;
  }

  return `${Math.floor(total / 60)}m ${total % 60}s`;
};

export const SavedLoopsOverlay = ({
  contentId,
  view,
  toRatio,
  activeRange,
  mode,
  onLoad,
  onStop,
  onEditRange,
}: {
  contentId?: string;
  /**
   * The stretch of recording the chips are laid out over. Always the whole of
   * it: a chip is how you find a loop, so the row must not disappear into the
   * one loop the track below it happens to be showing.
   */
  view: { start: number; end: number };
  /** Where a moment sits inside that stretch, 0 → 1. */
  toRatio: (time: number) => number;
  /** The section on screen, so its own chip can read as the current one. */
  activeRange?: { start: number; end: number } | null;
  /** Which state the player is in: only a looping section can be toggled off. */
  mode?: string;
  onLoad: (loop: SavedLoop) => void;
  onStop?: () => void;
  /**
   * Move the chip's own boundaries: opens the section picker on this loop, so
   * the reader drags the ends of the loop they already have rather than
   * choosing a section and starting again.
   */
  onEditRange?: (loop: SavedLoop) => void;
}) => {
  const allLoops = useSavedLoopsStore((state) => state.loops);
  const renameLoop = useSavedLoopsStore((state) => state.renameLoop);
  const recolorLoop = useSavedLoopsStore((state) => state.recolorLoop);
  const removeLoop = useSavedLoopsStore((state) => state.removeLoop);

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [width, setWidth] = useState(0);
  const laneRef = useRef<HTMLDivElement>(null);

  // Chips are placed in pixels — a chip is a fixed size, not a fraction of the
  // bar — so the bar has to be measured before anything can be laid out.
  useMeasureEffect(() => {
    const element = laneRef.current;

    if (!element) {
      return;
    }

    setWidth(element.clientWidth);

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const measure = () => setWidth(element.clientWidth);

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /** Only the loops in the stretch the row is laid out over: every one of them,
   *  because the row is the whole recording even when the track is zoomed. */
  const loops = useMemo(
    () =>
      allLoops
        .filter(
          (loop) =>
            loop.contentId === contentId &&
            loop.end > view.start &&
            loop.start < view.end,
        )
        .sort((a, b) => a.start - b.start),
    [allLoops, contentId, view.start, view.end],
  );

  /** Each chip over its own range, stacked when two of them would collide. */
  const placed = useMemo(
    () => placeLoopChips(loops, { width, toRatio }),
    [loops, toRatio, width],
  );

  const height = lanesHeight(placed);

  return (
    <div
      ref={laneRef}
      // The room the chips take, in the bar's own flow, so nothing above them is
      // ever covered. Empty — and so weightless — until a loop is saved.
      style={{ height: height ? height + 2 : 0 }}
      className="relative w-full"
    >
      {placed.map(({ item: loop, left, lane }) => {
          const isCurrent =
            !!activeRange &&
            Math.abs(activeRange.start - loop.start) < 0.05 &&
            Math.abs(activeRange.end - loop.end) < 0.05;

          // A chip is a switch: once its loop is running, pressing it again
          // stops it. While a section is only being picked it is not running
          // yet, so pressing starts it instead.
          const isLooping =
            isCurrent && (mode === "quiet" || mode === "active");

          const color = loopColor(loop.color);

          if (renamingId === loop.id) {
            return (
              <div
                key={loop.id}
                className="absolute"
                style={{ left, bottom: lane * LANE_HEIGHT }}
              >
                <LoopNameField
                  initial={loop.name}
                  onCommit={(name) => {
                    renameLoop(loop.id, name);
                    setRenamingId(null);
                  }}
                  onCancel={() => setRenamingId(null)}
                />
              </div>
            );
          }

          return (
            <span
              key={loop.id}
              style={{ left, bottom: lane * LANE_HEIGHT }}
              className={cn(
                "absolute inline-flex h-6 items-center gap-1.5 rounded-full border pl-1.5 pr-1.5 text-[11px] backdrop-blur-md transition-colors duration-150",
                isCurrent
                  ? color.activeChip
                  : cn(color.chip, "hover:brightness-[0.97]"),
              )}
            >
              <LoopColorPicker
                color={loop.color}
                onPick={(next) => recolorLoop(loop.id, next)}
              />

              {/* A toggle: the chip that is looping is the one you press to
                  stop. Anything else starts looping where it points. */}
              <button
                type="button"
                aria-pressed={isLooping}
                onClick={() => (isLooping ? onStop?.() : onLoad(loop))}
                onDoubleClick={() => setRenamingId(loop.id)}
                title={
                  isLooping
                    ? `Stop looping ${loop.name}`
                    : `Loop ${loop.name} · lines ${loop.startIndex + 1}–${
                        loop.endIndex + 1
                      }`
                }
                className="inline-flex max-w-[8rem] items-center gap-1.5 truncate font-medium"
              >
                {isLooping && <Icons.pause className="text-[9px]" />}
                {loop.name}
              </button>

              <span className="tabular-nums opacity-40">
                {clock(loop.end - loop.start)}
              </span>

              {/* The other half of "update this loop": the name is changed by
                  double-clicking it, the range by opening the picker on it. */}
              {onEditRange && (
                <button
                  type="button"
                  aria-label={`Change the range of ${loop.name}`}
                  title={`Change the range of ${loop.name} · lines ${
                    loop.startIndex + 1
                  }–${loop.endIndex + 1}`}
                  onClick={() => onEditRange(loop)}
                  className="rounded-full p-0.5 opacity-30 transition hover:bg-black/5 hover:opacity-80 dark:hover:bg-white/10"
                >
                  <Icons.timeline className="text-[9px]" />
                </button>
              )}

              <button
                type="button"
                aria-label={`Delete ${loop.name}`}
                onClick={() => removeLoop(loop.id)}
                className="rounded-full p-0.5 opacity-30 transition hover:bg-black/5 hover:opacity-80 dark:hover:bg-white/10"
              >
                <Icons.xMark className="text-[9px]" />
              </button>
            </span>
          );
        })}
    </div>
  );
};
