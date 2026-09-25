"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  applySweepFrame,
  createSweepRuntime,
  getGlyphProgress,
  getSweepProgress,
  releaseSweep,
  SweepTarget,
  SweepTiming,
} from "../components/karaoke/sweep";

/**
 * The data attributes the sweep reads back off the DOM — written by
 * `CharacterItem` when it is handed a `sweepSlot`, so every animated character
 * says which word it belongs to and where it sits inside that word:
 *
 *   `data-r-word`   index into the line's timings
 *   `data-r-glyph`  this character's place inside the word (0-based)
 *   `data-r-glyphs` how many characters the word is painted with
 *
 * The reader renders a whole book, so its characters are addressed by position
 * in a couple of integers rather than by a ref per character: a line becoming
 * the one being read is then a single DOM query, not a re-render.
 */
const WORD_ATTRIBUTE = "data-r-word";

type SweepSlot = {
  el: HTMLElement;
  timing: SweepTiming;
  /** This character's place inside its word, and how many there are. */
  glyph: number;
  glyphs: number;
};

/**
 * Runs the read-along sweep for one transcription.
 *
 * Only the line being read animates: a `requestAnimationFrame` loop walks the
 * characters of that one line and writes the same `--p` / `--pop` the
 * sing-along view writes, so the fill, the swell and the glow of a character
 * being read are the ones from the karaoke view, over the reader's own layout.
 *
 * Attach the returned ref to the element that wraps the line's characters, and
 * mark every animatable character with a `sweepSlot` and the `mn-r-sweep`
 * class, which is what turns those two numbers into paint.
 */
export const useReadModeSweep = <T extends HTMLElement = HTMLDivElement>({
  active,
  timeRef,
  timings,
}: {
  /** True while this transcription is the one being read. */
  active: boolean;
  /** The ~60fps playhead from `useSmoothPlayhead`. */
  timeRef?: React.MutableRefObject<number> | null;
  /** Start / end of every word on the line, indexed by `data-r-word`. */
  timings: (SweepTiming | null)[];
}) => {
  const containerRef = useRef<T | null>(null);

  // The reader re-renders on every progress tick, so a caller's array is a new
  // identity ten times a second. The loop only cares about the *timings*, and
  // restarting it would throw away the swell it is midway through — so the
  // effect is keyed on the values instead, and reads the timings through a ref
  // that this first effect keeps fresh.
  const signature = useMemo(
    () =>
      timings
        .map((timing) => (timing ? `${timing.start}:${timing.end}` : "-"))
        .join("|"),
    [timings],
  );

  const timingsRef = useRef(timings);

  // Declared before the frame loop below on purpose: effects of one commit run
  // in order, so the loop always starts from the timings of the same render.
  useEffect(() => {
    timingsRef.current = timings;
  });

  useEffect(() => {
    const container = containerRef.current;

    if (!active || !container || !timeRef) {
      return;
    }

    const slots = Array.from(
      container.querySelectorAll<HTMLElement>(`[${WORD_ATTRIBUTE}]`),
    )
      .map((el): SweepSlot | null => {
        const timing = timingsRef.current[Number(el.dataset.rWord)];

        if (!timing) {
          return null;
        }

        return {
          el,
          timing,
          glyph: Number(el.dataset.rGlyph) || 0,
          glyphs: Math.max(Number(el.dataset.rGlyphs) || 1, 1),
        };
      })
      .filter((slot): slot is SweepSlot => !!slot);

    if (slots.length === 0) {
      return;
    }

    const targets: SweepTarget[] = slots.map((slot) => ({
      el: slot.el,
      progress: 0,
    }));
    const runtime = createSweepRuntime(slots.length);

    let frame = 0;

    const loop = () => {
      frame = requestAnimationFrame(loop);

      const time = timeRef.current;

      for (let index = 0; index < slots.length; index++) {
        const { timing, glyph, glyphs } = slots[index];

        // A word is usually several characters, and the reader paints each one
        // separately (they carry their own colours), so the word's sweep is
        // split between them. That keeps the fill travelling left to right
        // across the word instead of every character lighting up at once.
        targets[index].progress = getGlyphProgress(
          getSweepProgress(time, timing.start, timing.end),
          glyph,
          glyphs,
        );
      }

      applySweepFrame(targets, runtime);
    };

    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      releaseSweep(targets);
    };
  }, [active, signature, timeRef]);

  return containerRef;
};
