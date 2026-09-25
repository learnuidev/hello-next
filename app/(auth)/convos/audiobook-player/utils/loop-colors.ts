/**
 * The colours a saved loop can wear.
 *
 * Whole class names, never assembled from parts: Tailwind reads this file, not
 * the browser, and a colour built out of a template string is a colour that
 * never gets compiled.
 */

export type LoopColorKey =
  | "indigo"
  | "rose"
  | "amber"
  | "emerald"
  | "sky"
  | "violet";

type LoopColor = {
  label: string;
  /** The swatch itself. */
  dot: string;
  /** A chip at rest. */
  chip: string;
  /** The chip that is looping. */
  activeChip: string;
  /** The band on the scrubber, and the played part of a zoomed section. */
  gradient: string;
  solid: string;
  glow: string;
};

export const LOOP_COLORS: Record<LoopColorKey, LoopColor> = {
  indigo: {
    label: "Indigo",
    dot: "bg-indigo-500",
    chip: "border-indigo-500/35 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300",
    activeChip:
      "border-indigo-500/50 bg-indigo-500/20 text-indigo-700 dark:text-indigo-200",
    gradient: "from-indigo-500 to-violet-500",
    solid: "bg-indigo-500",
    glow: "shadow-[0_0_12px_rgba(99,102,241,0.5)]",
  },
  rose: {
    label: "Rose",
    dot: "bg-rose-500",
    chip: "border-rose-500/35 bg-rose-500/10 text-rose-600 dark:text-rose-300",
    activeChip:
      "border-rose-500/50 bg-rose-500/20 text-rose-700 dark:text-rose-200",
    gradient: "from-rose-500 to-orange-400",
    solid: "bg-rose-500",
    glow: "shadow-[0_0_12px_rgba(244,63,94,0.5)]",
  },
  amber: {
    label: "Amber",
    dot: "bg-amber-500",
    chip: "border-amber-500/35 bg-amber-500/10 text-amber-600 dark:text-amber-300",
    activeChip:
      "border-amber-500/50 bg-amber-500/20 text-amber-700 dark:text-amber-200",
    gradient: "from-amber-500 to-yellow-400",
    solid: "bg-amber-500",
    glow: "shadow-[0_0_12px_rgba(245,158,11,0.5)]",
  },
  emerald: {
    label: "Emerald",
    dot: "bg-emerald-500",
    chip: "border-emerald-500/35 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
    activeChip:
      "border-emerald-500/50 bg-emerald-500/20 text-emerald-700 dark:text-emerald-200",
    gradient: "from-emerald-500 to-teal-400",
    solid: "bg-emerald-500",
    glow: "shadow-[0_0_12px_rgba(16,185,129,0.5)]",
  },
  sky: {
    label: "Sky",
    dot: "bg-sky-500",
    chip: "border-sky-500/35 bg-sky-500/10 text-sky-600 dark:text-sky-300",
    activeChip: "border-sky-500/50 bg-sky-500/20 text-sky-700 dark:text-sky-200",
    gradient: "from-sky-500 to-cyan-400",
    solid: "bg-sky-500",
    glow: "shadow-[0_0_12px_rgba(14,165,233,0.5)]",
  },
  violet: {
    label: "Violet",
    dot: "bg-violet-500",
    chip: "border-violet-500/35 bg-violet-500/10 text-violet-600 dark:text-violet-300",
    activeChip:
      "border-violet-500/50 bg-violet-500/20 text-violet-700 dark:text-violet-200",
    gradient: "from-violet-500 to-fuchsia-500",
    solid: "bg-violet-500",
    glow: "shadow-[0_0_12px_rgba(139,92,246,0.5)]",
  },
};

/** The order colours are handed out in, so a new loop is never the last one. */
export const LOOP_COLOR_KEYS = Object.keys(LOOP_COLORS) as LoopColorKey[];

export const DEFAULT_LOOP_COLOR: LoopColorKey = "indigo";

export const loopColor = (key?: string | null): LoopColor =>
  LOOP_COLORS[(key as LoopColorKey) ?? DEFAULT_LOOP_COLOR] ??
  LOOP_COLORS[DEFAULT_LOOP_COLOR];

/** The colour a new loop should wear: the next one nobody is using. */
export const nextLoopColor = (used: (string | undefined)[]): LoopColorKey => {
  const free = LOOP_COLOR_KEYS.find((key) => !used.includes(key));

  if (free) {
    return free;
  }

  // All six in play: start again, oldest colour first.
  return LOOP_COLOR_KEYS[used.length % LOOP_COLOR_KEYS.length];
};
