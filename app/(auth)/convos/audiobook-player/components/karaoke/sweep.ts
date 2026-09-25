/**
 * The sweep itself: one frame of the Apple-Music-Sing animation.
 *
 * Both the sing-along view (`karaoke-line.tsx`) and the reader view when read
 * mode is on (`../../hooks/use-read-mode-sweep.ts`) animate the very same way —
 * a `requestAnimationFrame` loop measures how far the playhead has travelled
 * through one glyph and writes two custom properties onto its element:
 *
 *   `--p`   how much of the glyph is sung (0 → 1), which paints the fill front
 *   `--pop` the swell of the glyph being sung right now (0 → 1)
 *
 * The CSS that turns those two numbers into the gradient fill, the lift and the
 * glow lives in `karaoke-styles.tsx` / `reader-sweep-styles.tsx`; the *tuning*
 * lives here, so the two views can never drift apart.
 */

/** Progress is quantised to this many steps, so a still glyph writes nothing. */
export const SWEEP_STEPS = 400;
/** The swell eases in slowly and out even more slowly, so it never snaps back. */
export const SWEEP_POP_APPROACH = 0.085;
export const SWEEP_POP_RELEASE = 0.055;
/** Below this the swell counts as zero and the composited layer is released. */
const SWEEP_POP_FLOOR = 0.004;
/** ...and the value written to `--pop` is rounded this finely. */
const SWEEP_POP_STEPS = 100;

/** One glyph of one line, with how far the playhead has sung through it. */
export type SweepTarget = {
  el: HTMLElement;
  /** 0 → not sung yet, 1 → fully sung, anything between is mid-fill. */
  progress: number;
};

/**
 * Per-glyph bookkeeping. Arrays are allocated once per line — never per frame —
 * and every write is guarded by a comparison against the last value, because a
 * redundant `style.setProperty` on a few hundred glyphs is what makes a lyric
 * sheet stutter.
 */
export type SweepRuntime = {
  /** The eased swell, carried between frames. */
  pop: Float32Array;
  lastProgress: Float32Array;
  lastPop: Float32Array;
  /** 1 while this glyph is the one moving, so only it is promoted. */
  promoted: Uint8Array;
};

export const createSweepRuntime = (count: number): SweepRuntime => ({
  pop: new Float32Array(count),
  // -1 rather than 0: the first frame must write even at rest, so a glyph that
  // was animated before always lands in a clean state.
  lastProgress: new Float32Array(count).fill(-1),
  lastPop: new Float32Array(count).fill(-1),
  promoted: new Uint8Array(count),
});

/**
 * Writes one frame of the sweep for every target.
 *
 * The swell is deliberately asymmetric: it takes about 250ms to build while a
 * glyph is being sung and releases even slower, so the character you are on
 * never snaps back the moment it is sung.
 */
export const applySweepFrame = (
  targets: SweepTarget[],
  runtime: SweepRuntime,
) => {
  for (let index = 0; index < targets.length; index++) {
    const { el, progress } = targets[index];

    const roundedProgress = Math.round(progress * SWEEP_STEPS) / SWEEP_STEPS;

    if (roundedProgress !== runtime.lastProgress[index]) {
      runtime.lastProgress[index] = roundedProgress;
      el.style.setProperty("--p", `${roundedProgress}`);
    }

    const popTarget = progress > 0 && progress < 1 ? 1 : 0;
    const approach =
      popTarget > runtime.pop[index] ? SWEEP_POP_APPROACH : SWEEP_POP_RELEASE;

    runtime.pop[index] += (popTarget - runtime.pop[index]) * approach;

    const pop = runtime.pop[index] < SWEEP_POP_FLOOR ? 0 : runtime.pop[index];
    const roundedPop = Math.round(pop * SWEEP_POP_STEPS) / SWEEP_POP_STEPS;

    if (roundedPop !== runtime.lastPop[index]) {
      runtime.lastPop[index] = roundedPop;
      el.style.setProperty("--pop", `${roundedPop}`);
    }

    // Promote only the glyph that is actually moving, so a sheet keeps one or
    // two composited layers instead of hundreds.
    const promoted = roundedPop > 0 ? 1 : 0;

    if (promoted !== runtime.promoted[index]) {
      runtime.promoted[index] = promoted;
      el.style.willChange = promoted ? "transform" : "";
    }
  }
};

/** Drops the compositor promotion of every glyph the loop was driving. */
export const releaseSweep = (targets: SweepTarget[]) => {
  targets.forEach(({ el }) => {
    el.style.willChange = "";
  });
};

/**
 * How far the playhead has sung through one timed unit. Shared by both views so
 * "the word being spoken right now" means exactly the same thing in each.
 */
export const getSweepProgress = (
  time: number,
  start: number,
  end: number,
): number => {
  if (time <= start) {
    return 0;
  }

  if (time >= end) {
    return 1;
  }

  return (time - start) / Math.max(end - start, 0.001);
};

/**
 * Splits one word's sweep between the glyphs it is painted with, so the fill
 * still travels left to right across the word instead of every character
 * lighting up at once.
 *
 * Only the reader needs this: the sing-along view animates a whole token as a
 * single box, while the reader paints each character on its own because every
 * character carries its own tone colour.
 */
export const getGlyphProgress = (
  progress: number,
  glyph: number,
  glyphCount: number,
): number => {
  if (glyphCount <= 1) {
    return progress;
  }

  return Math.min(Math.max(progress * glyphCount - glyph, 0), 1);
};

/** One timed unit of a line, in seconds. */
export type SweepTiming = { start: number; end: number };
