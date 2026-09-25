/**
 * How a self-scrolling sheet behaves — shared by the sing-along stage and the
 * reader stage so both glide, settle and hand over to the reader the same way.
 *
 * The sheet is not scrolled by the browser: a frame loop drives `scrollTop`
 * itself, and the line being read is parked at a fixed fraction of the stage
 * height (its *anchor*) rather than wherever it happens to land.
 */

/** Spring that glides the sheet so the active line sits on its anchor. */
export const STAGE_SPRING_STIFFNESS = 90;
/** Damped to critical: settles crisply instead of bouncing past the line. */
export const STAGE_SPRING_DAMPING = 19;
/** Whatever the spring asks for, the sheet never moves faster than this. */
export const STAGE_MAX_SCROLL_SPEED = 1400;

/**
 * How long manual scrolling wins before auto-follow takes over again. Long
 * enough to read a passage by hand, short enough that the sheet is never
 * stranded once the reader stops touching it.
 */
export const STAGE_MANUAL_SCROLL_GRACE = 4000;

/**
 * Where the line being read is parked: above centre, so the lines still to come
 * get the space below it.
 */
export const STAGE_ANCHOR = 0.36;

/**
 * Desktop parks it higher still: near the top of the stage rather than above its
 * middle. The stage is far taller there, so lifting the line being read leaves
 * that much more of the page below it in view — and a desktop reader's eye sits
 * high on the screen, not at its middle.
 */
export const DESKTOP_STAGE_ANCHOR = 0.2;

/**
 * Where the sing-along stage's first lyric waits before the audio reaches it,
 * lower down so the count-in has the top of the stage to itself.
 *
 * The reader's sheet deliberately does not use this: it parks its first line at
 * its own anchor, the same one the line being read is parked at, so the page
 * opens where it will be read from.
 */
export const STAGE_INTRO_ANCHOR = 0.55;

/**
 * Room reserved above and below the lines (as a fraction of the stage height),
 * so the first and the last line can both reach the anchor.
 */
export const STAGE_TOP_SPACER = 0.62;
export const STAGE_BOTTOM_SPACER = 0.5;

/**
 * How far out of focus a line is, by how far it sits from the line being read:
 * the page curves away instead of snapping from sharp to blurred.
 *
 * A line one away is barely soft, and the blur grows a step per line until it
 * is capped — the cap matters twice over. It is what stops a line at the far
 * end of a book from being a grey smear, and it is what keeps this cheap: every
 * line further than the last step keeps the *same* string, so a line change
 * only rewrites the dozen lines around the playhead instead of the whole sheet.
 */
const BLUR_BY_DISTANCE = [0, 0.9, 1.8, 2.7, 3.6, 4.5, 5];

/** Distance in `filter` terms; 0 means in focus. */
export const stageBlur = (distance: number) => {
  const steps = Math.min(
    Math.abs(distance),
    BLUR_BY_DISTANCE.length - 1,
  );

  return BLUR_BY_DISTANCE[steps];
};

/** The `filter` a line wears at this distance — `undefined` when in focus. */
export const stageBlurFilter = (distance: number) => {
  const blur = stageBlur(distance);

  return blur > 0 ? `blur(${blur}px)` : undefined;
};
