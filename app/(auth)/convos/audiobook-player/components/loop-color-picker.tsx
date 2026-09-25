"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  LOOP_COLORS,
  LOOP_COLOR_KEYS,
  LoopColorKey,
  loopColor,
} from "../utils/loop-colors";

/**
 * Picking a colour for a saved loop.
 *
 * Six swatches, one row, no menu to open twice: the chip's own dot is the
 * handle, and pressing it shows them above the bar. That is the whole control —
 * a colour is a glance, not a setting worth a dialog.
 */
export const LoopColorPicker = ({
  color,
  onPick,
  className,
}: {
  color?: LoopColorKey | string | null;
  onPick: (color: LoopColorKey) => void;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const current = loopColor(color);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Colour: ${current.label}. Change it.`}
          title={`${current.label} — click to change`}
          className={cn(
            "grid h-4 w-4 shrink-0 place-items-center rounded-full transition-transform duration-150 hover:scale-110",
            className,
          )}
        >
          <span className={cn("h-2.5 w-2.5 rounded-full", current.dot)} />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="center"
        side="top"
        sideOffset={6}
        className="w-auto rounded-full border border-black/5 bg-white/95 p-1.5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-[rgb(28,29,31)]/95"
      >
        <div className="flex items-center gap-1">
          {LOOP_COLOR_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              aria-label={LOOP_COLORS[key].label}
              title={LOOP_COLORS[key].label}
              onClick={() => {
                onPick(key);
                setOpen(false);
              }}
              className={cn(
                "grid h-5 w-5 place-items-center rounded-full transition-transform duration-150 hover:scale-110",
                key === color &&
                  "ring-2 ring-black/20 ring-offset-1 ring-offset-white dark:ring-white/30 dark:ring-offset-[rgb(28,29,31)]",
              )}
            >
              <span
                className={cn("h-3.5 w-3.5 rounded-full", LOOP_COLORS[key].dot)}
              />
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
