"use client";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { DynamicLoop } from "../hooks/use-dynamic-loop";
import { useSavedLoopsStore } from "../stores/use-saved-loops-store";
import { LoopNameField } from "./loop-name-field";

/**
 * The one line above the scrubber that owns the dynamic loop.
 *
 * It says one thing — how many transcripts the section covers — and offers the
 * one or two things you can do with it. Everything else about the section is
 * already on the scrubber: the band shows where it is, and the handle bubbles
 * say exactly when. Nothing here repeats any of that.
 *
 * Saving is the exception: a loop worth looping twice is worth naming, so the
 * name is asked for in place, written and selected, the way a DAW asks for it.
 * Moving a loop that is already saved is that same gesture — the picker opens on
 * its own boundaries — except that the name is already known, so the strip
 * offers Update instead of asking for one.
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
  contentId,
  dimmed = false,
  editingLoop = null,
  onUpdateRange,
}: {
  dynamicLoop: DynamicLoop;
  isPlaying?: boolean;
  /** Which content the loops are saved against. */
  contentId?: string;
  /**
   * True while a handle is being dragged. The strip steps back then, so the time
   * bubble that follows the handle is the only thing being read.
   */
  dimmed?: boolean;
  /**
   * The saved loop whose range is being moved, when one is. The strip asks for
   * no name then: the loop already has one, and nothing about it is changing
   * except where it sits.
   */
  editingLoop?: { id: string; name: string } | null;
  /** Keeps the section's new boundaries for that loop. */
  onUpdateRange?: () => void;
}) => {
  const { mode, range, lines } = dynamicLoop;
  // A section looping quietly in the regular view has nothing to show here: the
  // strip is the picker, and nobody asked to pick anything.
  const open = (mode === "selecting" || mode === "active") && !!range;
  const selecting = mode === "selecting";
  const count = range ? Math.max(1, range.endIndex - range.startIndex + 1) : 0;

  const saveLoop = useSavedLoopsStore((state) => state.saveLoop);
  const [naming, setNaming] = useState(false);

  // A name to start from: the first line of the section says what it is far
  // better than "Loop 3" does, and it is already selected if you disagree.
  const suggested = (() => {
    const first = range ? lines[range.startIndex]?.text?.trim() : "";

    return first ? first.slice(0, 26) : "Untitled loop";
  })();

  return (
    <AnimatePresence initial={false}>
      {open && range && (
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
              "flex flex-wrap items-center gap-3 px-4 pb-2 transition-opacity duration-200 sm:px-8 sm:pb-8",
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

              {/* Save belongs to the picker: it is what you do with a section
                  you have just chosen, and the Change button is how you get
                  back to choosing one. A section already looping has nothing
                  new to save until you change it.

                  Moving a loop that already exists is the same gesture with a
                  different ending: the boundaries are kept for the loop you
                  opened the picker on, which is why it says Update and asks for
                  no name. */}
              {selecting &&
                (editingLoop && onUpdateRange ? (
                  <button
                    type="button"
                    onClick={onUpdateRange}
                    aria-label={`Update the range of ${editingLoop.name}`}
                    title={`Keep these boundaries for ${editingLoop.name}`}
                    className={QUIET_PILL}
                  >
                    <Icons.check className="text-[10px]" />
                    <span className="max-w-[8rem] truncate">
                      Update {editingLoop.name}
                    </span>
                  </button>
                ) : naming ? (
                  <LoopNameField
                    initial={suggested}
                    onCommit={(name) => {
                      saveLoop({
                        contentId: contentId || "unknown",
                        name,
                        start: range.start,
                        end: range.end,
                        startIndex: range.startIndex,
                        endIndex: range.endIndex,
                      });
                      setNaming(false);
                    }}
                    onCancel={() => setNaming(false)}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setNaming(true)}
                    aria-label="Save this loop"
                    className={QUIET_PILL}
                  >
                    <Icons.bookmark className="text-[10px]" />
                    Save
                  </button>
                ))}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
