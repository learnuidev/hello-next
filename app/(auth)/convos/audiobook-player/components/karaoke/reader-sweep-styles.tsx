"use client";

/**
 * The read-along sweep: the reader's version of the sing-along animation.
 *
 * The contract is exactly the one `sweep.ts` writes — `--p` for the fill front,
 * `--pop` for the swell — so both views animate from the same numbers and the
 * same tuning. Two things are deliberately different here:
 *
 * 1. The fill is built from `currentColor`, so a character keeps the colour it
 *    already has (its tone colour, or its unknown-word styling) as it fills.
 *    The sing-along view paints a whole token in one colour because it renders
 *    a token as a single box; the reader paints every character on its own.
 * 2. The unsung half is only *partly* damped. The reader already fades every
 *    line that is not being read to 50% opacity, so dimming the rest of the
 *    current line as hard as a lyric sheet would make the line you are reading
 *    look quieter than the ones around it.
 */

/** How much of a character's own colour survives until it is read. */
const UNSUNG_MIX = "60%";
/** Same value, spelled out for browsers without `color-mix()`. */
const UNSUNG_FALLBACK = "rgba(127, 127, 127, 0.6)";

export const ReaderSweepStyles = () => (
  <style>{`
  .mn-r-sweep {
    --p: 0;
    --pop: 0;
    display: inline-block;
    /* The fill front, left to right. */
    background-image: linear-gradient(
      to right,
      currentColor calc(var(--p) * 100%),
      ${UNSUNG_FALLBACK} 0
    );
    background-image: linear-gradient(
      to right,
      currentColor calc(var(--p) * 100%),
      color-mix(in srgb, currentColor ${UNSUNG_MIX}, transparent) 0
    );
    -webkit-background-clip: text;
    background-clip: text;
    /* Only the painted fill is hidden — never the colour itself, because the
       gradient above is built from it. */
    -webkit-text-fill-color: transparent;
    /* The same barely-there swell as a sung syllable: a 2% growth and three
       quarters of a pixel of lift, anchored to the baseline. */
    transform: translate3d(0, calc(var(--pop) * -0.75px), 0) scale(calc(1 + var(--pop) * 0.02));
    transform-origin: 50% 85%;
    /* The glow rides the fill front: nothing until the character is actually
       being read. */
    text-shadow: 0 0 calc(14px * var(--pop)) color-mix(in srgb, currentColor 30%, transparent);
    /* The frame loop owns the transform; a transition on it would smear every
       frame into the next one. */
    transition: none;
  }
`}</style>
);
