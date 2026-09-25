"use client";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import {
  DynamicLoopMode,
  HOLD_TO_START_MS,
  HOLD_TO_STOP_MS,
} from "../hooks/use-dynamic-loop";
import { useHoldGesture } from "../hooks/use-hold-gesture";
import { HoldRing, HoldRingTone } from "./hold-ring";

/** How long the guidance stays up on its own after the mode changes. */
const HINT_LINGER_MS = 2800;

/**
 * One button, four meanings — and the only way into the dynamic loop.
 *
 *   tap                  the plain single line loop, exactly as it always was
 *   hold 1s (off)        open the section picker
 *   tap (picking)        keep the section and start looping it
 *   hold 1s (on)         drop the loop and go back where you were
 *
 * A hold is invisible, so the button explains itself: a pill above it says what
 * the hold will do while the pointer is on it, for a moment after the mode
 * changes, and while the ring is filling.
 */
export const LoopButton = ({
  mode,
  lineLoop,
  canLoop,
  selectionCount = 0,
  onTap,
  onEnter,
  onExit,
  className,
}: {
  mode: DynamicLoopMode;
  /** The single line loop the player has always had, or starred transcripts. */
  lineLoop: boolean;
  /** False until the content has timings and the player is ready. */
  canLoop: boolean;
  /** How many transcripts the reader has starred. */
  selectionCount?: number;
  onTap: () => void;
  onEnter: () => void;
  onExit: () => void;
  className?: string;
}) => {
  const dynamic = mode !== "off";
  const quiet = mode === "quiet";
  const tone: HoldRingTone = dynamic && !quiet ? "stop" : "start";

  const { progressRef, holding, burst, handlers } = useHoldGesture({
    holdMs: dynamic ? HOLD_TO_STOP_MS : HOLD_TO_START_MS,
    holdDisabled: !dynamic && !canLoop,
    // A quiet section has not been "unlocked" yet: holding it opens the picker
    // on it, which is the only way to change or save it. A section already being
    // edited or looped is left by holding, which puts the playhead back.
    onComplete: dynamic && !quiet ? onExit : onEnter,
    onTap,
  });

  // The mode just changed, so say what is possible now — then get out of the
  // way again.
  const [lingering, setLingering] = useState(false);
  const previousModeRef = useRef(mode);

  useEffect(() => {
    if (previousModeRef.current === mode) {
      return;
    }

    previousModeRef.current = mode;

    if (mode === "off") {
      setLingering(false);
      return;
    }

    setLingering(true);

    const timer = setTimeout(() => setLingering(false), HINT_LINGER_MS);

    return () => clearTimeout(timer);
  }, [mode]);

  const starred = `${selectionCount} transcript${
    selectionCount === 1 ? "" : "s"
  }`;

  const hint = holding
    ? dynamic && !quiet
      ? "Keep holding to go back"
      : "Keep holding to pick a section"
    : quiet
      ? "Looping this section · tap to stop"
      : mode === "selecting"
      ? "Drag the handles · tap lines to extend"
      : mode === "active"
        ? "Looping this section · hold to go back"
        : selectionCount > 0
          ? `Hold 1s to loop and name ${starred}`
          : canLoop
            ? "Hold 1s to loop a section"
            : "Loop this line";

  const label =
    quiet
      ? "Looping a saved section. Tap to stop, or press and hold to change it."
      : mode === "selecting"
      ? "Choosing a loop section. Press and hold to go back where you were."
      : mode === "active"
        ? "Looping a section. Tap to change it, press and hold to go back where you were."
        : selectionCount > 0
          ? `Your ${starred} are looping. Press and hold for a second to loop them as a section you can name and save.`
          : canLoop
            ? "Loop this line. Press and hold for a second to loop a section."
            : "Loop this line.";

  const showHint = holding || lingering;

  return (
    <div className={cn("group/loop relative", className)}>
      <button
        type="button"
        aria-label={label}
        aria-pressed={dynamic || lineLoop}
        {...handlers}
        className={cn(
          // `touch-none` keeps the browser from scrolling the page out from
          // under a hold; `select-none` keeps it from selecting the icon.
          "relative grid h-11 w-11 touch-none select-none place-items-center rounded-full",
          "transition-transform duration-200 ease-out",
          holding && "scale-90",
        )}
      >
        <HoldRing
          progressRef={progressRef}
          active={holding}
          burst={burst}
          tone={tone}
        />

        <Icons.loop
          className={cn(
            "relative text-xl transition-colors duration-200",
            // Any section at all — picked, committed, or looping quietly in the
            // regular view — wears the dynamic loop's colour. The rose is the
            // old single line loop, and only that.
            dynamic
              ? "text-indigo-500 drop-shadow-[0_0_6px_rgba(99,102,241,0.55)]"
              : lineLoop
                ? "text-rose-500"
                : "text-gray-500 group-hover/loop:text-gray-800 dark:group-hover/loop:text-gray-200",
          )}
        />
      </button>

      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium shadow-lg backdrop-blur-md transition-all duration-200",
          "border-black/5 bg-white/95 text-black dark:border-white/10 dark:bg-[rgb(28,29,31)]/95 dark:text-white",
          tone === "stop" && holding && "text-amber-600 dark:text-amber-400",
          tone === "start" && holding && "text-indigo-600 dark:text-indigo-400",
          showHint
            ? "translate-y-0 opacity-100"
            : "translate-y-1 opacity-0 group-hover/loop:translate-y-0 group-hover/loop:opacity-100",
        )}
      >
        {hint}
      </span>
    </div>
  );
};
