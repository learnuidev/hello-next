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
 * ...and where the first line waits before the audio reaches it, lower down so
 * the count-in has the top of the stage to itself.
 */
export const STAGE_INTRO_ANCHOR = 0.55;

/**
 * Room reserved above and below the lines (as a fraction of the stage height),
 * so the first and the last line can both reach the anchor.
 */
export const STAGE_TOP_SPACER = 0.62;
export const STAGE_BOTTOM_SPACER = 0.5;
