"use client";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import type { DynamicLoop } from "../hooks/use-dynamic-loop";

/**
 * The one line above the scrubber that owns the dynamic loop.
 *
 * It says one thing — how many transcripts the section covers — and offers the
 * one or two things you can do with it. Everything else about the section is
 * already on the scrubber: the band shows where it is, and the handle bubbles
 * say exactly when. Nothing here repeats any of that.
 */

const transcripts = (count: number) =>
  `${count} transcript${count === 1 ? "" : "s"}`;

const PILL =
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-150";

const QUIET_PILL = cn(
  PILL,
  "border border-black/10 bg-black/[0.03] hover:bg-black/[0.07]",
  "dark:border-white/15 dark:bg-white/[0.06] dark:hover:bg-white/[0.12]",
);

export const DynamicLoopBar = ({
  dynamicLoop,
  isPlaying,
  dimmed = false,
}: {
  dynamicLoop: DynamicLoop;
  isPlaying?: boolean;
  /**
   * True while a handle is being dragged. The strip steps back then, so the time
   * bubble that follows the handle is the only thing being read.
   */
  dimmed?: boolean;
}) => {
  const { mode, range } = dynamicLoop;
  const open = mode !== "off" && !!range;
  const selecting = mode === "selecting";
  const count = range ? Math.max(1, range.endIndex - range.startIndex + 1) : 0;

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="dynamic-loop"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.2, ease: "easeOut" },
          }}
          className="overflow-hidden"
        >
          <div
            className={cn(
              "flex items-center gap-3 px-4 pb-2 transition-opacity duration-200 sm:px-8",
              dimmed ? "opacity-25" : "opacity-100",
            )}
          >
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-indigo-600 dark:text-indigo-300">
              <Icons.loop className="text-xs text-indigo-500" />
              {selecting
                ? `${transcripts(count)} selected`
                : `Looping ${transcripts(count)}`}
            </span>

            <span className="ml-auto flex items-center gap-2">
              {selecting ? (
                <>
                  <button
                    type="button"
                    onClick={dynamicLoop.togglePreview}
                    aria-label={
                      isPlaying
                        ? "Pause the section preview"
                        : "Preview the section"
                    }
                    className={QUIET_PILL}
                  >
                    {isPlaying ? (
                      <Icons.pause className="text-[10px]" />
                    ) : (
                      <Icons.play className="text-[10px]" />
                    )}
                    {isPlaying ? "Pause" : "Preview"}
                  </button>

                  <button
                    type="button"
                    onClick={dynamicLoop.commit}
                    aria-label="Loop the selected transcripts"
                    className={cn(
                      PILL,
                      "bg-indigo-500 text-white shadow-[0_2px_10px_rgba(99,102,241,0.4)] hover:bg-indigo-600",
                    )}
                  >
                    <Icons.check className="text-[10px]" />
                    Loop
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={dynamicLoop.edit}
                  aria-label="Change the looped section"
                  className={QUIET_PILL}
                >
                  Change
                </button>
              )}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
