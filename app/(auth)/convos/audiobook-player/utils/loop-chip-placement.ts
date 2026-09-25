/**
 * Where the saved-loop chips go.
 *
 * Each chip belongs over the stretch of recording it names, so its horizontal
 * position is simply where that range starts. Two chips that would then sit on
 * top of each other are stacked into lanes instead, each lane one chip tall —
 * the arrangement a timeline uses for regions that overlap in time.
 *
 * All of it in pixels, because a chip is a fixed size rather than a fraction of
 * the bar, and pure, so the arithmetic can be reasoned about (and tested)
 * without a browser in the room.
 */

/** One chip's height, and the vertical step between stacked chips. */
export const LANE_HEIGHT = 26;
/** Horizontal breathing room between two chips in the same lane. */
export const CHIP_GAP = 8;
/** Widest a name may get, matching the truncation on it. */
export const MAX_NAME_WIDTH = 128;
/** Everything on a chip that is not the name: dot, duration, delete. */
export const CHIP_CHROME = 78;

export type LoopChip = {
  start: number;
  name: string;
};

export type PlacedLoopChip<T extends LoopChip> = {
  item: T;
  /** Left edge, in pixels from the start of the bar. */
  left: number;
  /** 0 is the lane nearest the scrubber; higher lanes stack upwards. */
  lane: number;
  width: number;
};

/**
 * How wide a name will be, without measuring it.
 *
 * Measured per character because a book's loop names are as likely to be Chinese
 * as English, and a Chinese character is nearly twice the width of a Latin one —
 * an estimate that guessed the same for both would either collide chips or
 * scatter them into lanes they do not need.
 */
const NAME_CHAR_WIDTH = (char: string) =>
  char.charCodeAt(0) > 0x2e80 ? 11 : 5.9;

export const estimateNameWidth = (name: string) =>
  Math.min(
    MAX_NAME_WIDTH,
    Math.max(28, [...name].reduce((sum, char) => sum + NAME_CHAR_WIDTH(char), 0)),
  );

/** How wide a chip will be, without measuring it. */
export const estimateChipWidth = (name: string) =>
  estimateNameWidth(name) + CHIP_CHROME;

/**
 * Places the chips. Ordered by where they start, so lanes fill left to right and
 * a chip always lands in the lowest lane that is free at its position.
 */
export const placeLoopChips = <T extends LoopChip>(
  chips: T[],
  { width, toRatio }: { width: number; toRatio: (time: number) => number },
): PlacedLoopChip<T>[] => {
  // Before the bar has been measured every chip lands at its left edge, stacked.
  // That is a real layout rather than none at all, so the chips exist in the
  // first paint — and the measurement, which happens before paint too, moves
  // them where they belong without anything being seen to jump.
  const laneEnds: number[] = [];

  return chips
    .slice()
    .sort((a, b) => a.start - b.start)
    .map((item) => {
      const chipWidth = estimateChipWidth(item.name);

      // Anchored at the start of its own range, but never off the bar.
      const left = Math.max(
        0,
        Math.min(toRatio(item.start) * width, Math.max(0, width - chipWidth)),
      );

      let lane = laneEnds.findIndex((end) => end + CHIP_GAP <= left);

      if (lane === -1) {
        lane = laneEnds.length;
      }

      laneEnds[lane] = left + chipWidth;

      return { item, left, lane, width: chipWidth };
    });
};

/** How tall the stack of lanes is, in pixels. */
export const lanesHeight = (placed: { lane: number }[]) =>
  placed.reduce((most, chip) => Math.max(most, chip.lane + 1), 0) * LANE_HEIGHT;
