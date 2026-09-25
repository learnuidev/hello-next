"use client";

/**
 * Every animation of the reader view lives here as plain CSS, so the hot paths
 * can be driven by a frame loop writing a couple of custom properties per
 * element — no re-renders, no animation library in the middle.
 *
 * Two things are shared with the sing-along view and deliberately kept in step:
 *
 * 1. The sweep contract. `sweep.ts` writes `--p` (the fill front) and `--pop`
 *    (the swell) and `reader-styles` turns them into paint, exactly as
 *    `karaoke-styles.tsx` does for a sung syllable. What differs is the colour:
 *    the reader's fill is built from `currentColor`, so a character keeps the
 *    colour it already has (its tone colour, its unknown-word styling) while it
 *    fills, and only *partly* damps the part that has not been read — the reader
 *    already fades every other line to 50% opacity, so a hard lyric-sheet dim
 *    would make the line being read look quieter than its neighbours.
 *
 * 2. The sheet. The reader scrolls itself the way the lyric sheet does: the
 *    stage hides its scrollbar, refuses the browser's own scroll anchoring (the
 *    follow loop owns the position) and fades its top and bottom edges so lines
 *    arrive and leave the anchor instead of being cut off.
 *
 * The out-of-focus blur of the other lines is *not* here: it changes with how
 * far each line sits from the one being read, which is a per-line value and so
 * lives with the stage that computes it (`stage-tuning.ts`).
 */

/** How much of a character's own colour survives until it is read. */
const UNSUNG_MIX = "60%";
/** Same value, spelled out for browsers without `color-mix()`. */
const UNSUNG_FALLBACK = "rgba(127, 127, 127, 0.6)";

export const ReaderStyles = () => (
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

  /* One text scale for everything that can be resized.
     Each surface keeps its own base size and multiplies it by --r-scale, set
     from the font size control on the view's container, so one control moves
     the reader, the paragraph view and the sing-along lyric together.

     The paragraph view keeps no base size of its own: it sizes a line exactly
     the way the read view sizes the same line — .mn-r-text-char when it is read
     word by word, and the size CharacterItem already carries otherwise — so
     turning read mode on and off inside it never resizes the page. */
  .mn-r-text-char {
    font-size: calc(1.5rem * var(--r-scale, 1));
  }

  .mn-r-text-base {
    font-size: calc(1rem * var(--r-scale, 1));
  }

  .mn-r-text-guide {
    font-size: calc(0.875rem * var(--r-scale, 1));
  }

  /* The metrics that have to come with the text.
     A line keeps its own leading, and the gaps between lines and between
     paragraphs are part of the same scale — growing the text must never crowd
     it, and shrinking it must not leave it swimming in space. Every one of
     these is written so that it means exactly what it replaced at scale 1. */
  .mn-r-leading-line {
    line-height: calc(3.25rem * var(--r-scale, 1));
  }

  /* The space between a word's reading and the word itself.
     It is part of the text scale — a bigger word keeps its reading further off
     — with a floor, so a small text size can never leave the guide touching the
     character it belongs to. The guide also carries its own line box, so tone
     marks are never clipped by the character below. */
  .mn-r-guide-gap {
    line-height: 1.5;
    margin-bottom: 0.1875rem;
    margin-bottom: max(0.0625rem, calc(0.1875rem * var(--r-scale, 1)));
  }

  .mn-r-line-gap {
    margin-bottom: calc(1rem * var(--r-scale, 1));
  }

  .mn-r-paragraph-gap > * + * {
    margin-top: calc(2rem * var(--r-scale, 1));
  }

  .mn-r-tile {
    padding: calc(0.25rem * var(--r-scale, 1));
  }

  @media (min-width: 640px) {
    .mn-r-text-char {
      font-size: calc(1.875rem * var(--r-scale, 1));
    }

    .mn-r-text-guide {
      font-size: calc(1rem * var(--r-scale, 1));
    }
  }

  .mn-r-stage {
    /* The follow loop measures line positions against this element, so it has
       to be the offset parent. */
    position: relative;
    scroll-behavior: auto;
    /* The follow loop owns the scroll position; the browser's scroll anchoring
       would otherwise fight it whenever lines arrive. */
    overflow-anchor: none;
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      #000 10%,
      #000 90%,
      transparent 100%
    );
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      #000 10%,
      #000 90%,
      transparent 100%
    );
  }

  .mn-r-stage::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
`}</style>
);
