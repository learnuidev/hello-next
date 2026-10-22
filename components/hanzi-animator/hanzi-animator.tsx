"use client";

import { useEffect, useRef, useState } from "react";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

const CHAR_SIZE = 90;
const PLAY_STROKE_GAP = 250;
const REVERSE_STROKE_DURATION = 320;

type AnimationResult = { canceled?: boolean };

type RenderStateLike = {
  cancelAll?: () => void;
  updateState: (changes: unknown) => void;
  state?: {
    character?: {
      main?: {
        opacity?: number;
        strokes?: Record<number, { displayPortion?: number; opacity?: number }>;
      };
    };
  };
};

type HanziWriterInstance = {
  animateStroke: (
    strokeNum: number,
    opts?: { onComplete?: (res: AnimationResult) => void },
  ) => unknown;
  /** Hanzi Writer keeps the character data and animated state here. */
  _character?: { strokes?: unknown[] };
  _renderState?: RenderStateLike;
};

type DrawStatus = "done" | "canceled" | "error";

const isThenable = (value: unknown): value is Promise<unknown> =>
  Boolean(value) && typeof (value as Promise<unknown>)?.then === "function";

/**
 * Clears a character and stops whatever it was animating: every stroke is made
 * visible-but-unwritten, which is the state the writer draws forwards from.
 */
const blankWriter = (writer: HanziWriterInstance, fallbackTotal = 0) => {
  const renderState = writer._renderState;

  if (!renderState?.updateState) return;

  // Drop any in-flight stroke animation before overwriting the state.
  renderState.cancelAll?.();

  const total = writer._character?.strokes?.length ?? fallbackTotal;
  const strokes: Record<number, { opacity: number; displayPortion: number }> =
    {};

  for (let i = 0; i < total; i++) {
    strokes[i] = { opacity: 1, displayPortion: 0 };
  }

  renderState.updateState({ character: { main: { opacity: 1, strokes } } });
};

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Writes a single stroke and reports how that draw ended. */
const drawStroke = (writer: HanziWriterInstance, strokeNum: number) =>
  new Promise<DrawStatus>((resolve) => {
    let settled = false;
    let completed = false;
    const finish = (status: DrawStatus) => {
      if (settled) return;
      settled = true;
      resolve(status);
    };

    let result: unknown;
    try {
      result = writer.animateStroke(strokeNum, {
        onComplete: (res) => {
          completed = true;
          finish(res?.canceled ? "canceled" : "done");
        },
      });
    } catch {
      finish("error");
      return;
    }

    if (isThenable(result)) {
      result.then(
        () => {
          if (!completed) finish("error");
        },
        () => {
          if (!completed) finish("error");
        },
      );
    } else if (!completed) {
      finish("done");
    }
  });

/** Same easing Hanzi Writer uses for its own stroke animation. */
const ease = (progress: number) => -Math.cos(progress * Math.PI) / 2 + 0.5;

/**
 * Erases a single stroke by animating its drawn portion back to zero — the
 * exact reverse of a stroke being written. Hanzi Writer only animates strokes
 * forwards, so this drives its render state directly.
 */
const unDrawStroke = (
  writer: HanziWriterInstance,
  strokeNum: number,
  isCanceled: () => boolean,
) =>
  new Promise<DrawStatus>((resolve) => {
    const renderState = writer._renderState;

    if (!renderState?.updateState) {
      resolve("error");
      return;
    }

    const startPortion =
      renderState.state?.character?.main?.strokes?.[strokeNum]?.displayPortion ??
      1;

    let frame = 0;
    let settled = false;
    const startedAt = performance.now();

    const finish = (status: DrawStatus) => {
      if (settled) return;
      settled = true;
      cancelAnimationFrame(frame);
      resolve(status);
    };

    const tick = (now: number) => {
      if (isCanceled()) {
        finish("canceled");
        return;
      }

      const progress = Math.min(1, (now - startedAt) / REVERSE_STROKE_DURATION);
      const displayed = startPortion * (1 - ease(progress));

      renderState.updateState({
        character: {
          main: {
            strokes: {
              [strokeNum]: { opacity: 1, displayPortion: displayed },
            },
          },
        },
      });

      if (progress >= 1) {
        finish("done");
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
  });

export const HanziAnimator = ({ characters }: { characters: string }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [strokeCounts, setStrokeCounts] = useState<Record<number, number>>({});
  const [drawnStrokes, setDrawnStrokes] = useState(0);
  const [targetStrokes, setTargetStrokes] = useState(0);
  const [writersVersion, setWritersVersion] = useState(0);
  const [failed, setFailed] = useState<Set<number>>(new Set());

  const chars = Array.from(characters ?? "").filter(
    (char) => char.trim().length > 0,
  );

  const targetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const writersRef = useRef<(HanziWriterInstance | null)[]>([]);
  const failedRef = useRef<Set<number>>(new Set());
  const selectedIndexRef = useRef<number | null>(null);
  const totalStrokesRef = useRef(0);
  const strokeCountsRef = useRef<Record<number, number>>({});

  // Playback bookkeeping: `drawnStrokesRef` is what is on screen,
  // `targetStrokesRef` is where playback or a step is heading.
  const playingRef = useRef(true);
  const drawnStrokesRef = useRef(0);
  const targetStrokesRef = useRef(0);
  const runningRef = useRef(false);
  const pendingRunRef = useRef(false);
  // Bumped when the focused character resets, so a running erase can bail.
  const epochRef = useRef(0);

  const totalStrokes =
    selectedIndex !== null ? (strokeCounts[selectedIndex] ?? 0) : 0;

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  useEffect(() => {
    strokeCountsRef.current = strokeCounts;
  }, [strokeCounts]);

  useEffect(() => {
    totalStrokesRef.current = totalStrokes;
  }, [totalStrokes]);

  // Create one HanziWriter per character. Stroke order always animates and the
  // outline is always shown, so those are not configurable.
  useEffect(() => {
    failedRef.current = new Set();
    setFailed(new Set());
    setSelectedIndex(null);
    setStrokeCounts({});
    setDrawnStrokes(0);
    setTargetStrokes(0);
    setPlaying(true);
    drawnStrokesRef.current = 0;
    targetStrokesRef.current = 0;
    playingRef.current = true;
    writersRef.current = [];

    const targets = targetRefs.current.slice(0, chars.length);
    if (!targets.length) return;

    let cancelled = false;

    import("hanzi-writer").then(({ default: HanziWriter }) => {
      if (cancelled) return;

      const isDark = document.documentElement.classList.contains("dark");

      const writers: (HanziWriterInstance | null)[] = chars.map(
        (char, index) => {
          const el = targets[index];
          if (!el) return null;
          el.innerHTML = "";

          try {
            return HanziWriter.create(el, char, {
              width: CHAR_SIZE,
              height: CHAR_SIZE,
              padding: 5,
              showOutline: true,
              showCharacter: false,
              strokeColor: isDark ? "#e5e7eb" : "#333333",
              outlineColor: isDark ? "#374151" : "#dddddd",
              strokeAnimationSpeed: 1,
              onLoadCharDataSuccess: (data) => {
                const total = data?.strokes?.length ?? 0;
                if (!total) return;

                setStrokeCounts((prev) =>
                  prev[index] === total ? prev : { ...prev, [index]: total },
                );
              },
              onLoadCharDataError: () => {
                const next = new Set(failedRef.current);
                next.add(index);
                failedRef.current = next;
                setFailed(next);
              },
            }) as HanziWriterInstance;
          } catch {
            return null;
          }
        },
      );

      writersRef.current = writers;
      setWritersVersion((version) => version + 1);
    });

    return () => {
      cancelled = true;
      writersRef.current = [];
      targets.forEach((el) => {
        if (el) el.innerHTML = "";
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characters]);

  // Every character starts blank — strokes are drawn by playback or by a step.
  useEffect(() => {
    epochRef.current += 1;
    drawnStrokesRef.current = 0;
    targetStrokesRef.current = 0;
    setDrawnStrokes(0);
    setTargetStrokes(0);

    writersRef.current.forEach((writer, index) => {
      if (writer) blankWriter(writer, strokeCountsRef.current[index] ?? 0);
    });
  }, [selectedIndex, writersVersion]);

  // Focus the first character that can be animated.
  useEffect(() => {
    const usable = (index: number) =>
      Boolean(writersRef.current[index]) && !failedRef.current.has(index);

    if (selectedIndex !== null && usable(selectedIndex)) return;

    const first = chars.findIndex((_char, index) => usable(index));
    if (first >= 0 && first !== selectedIndex) setSelectedIndex(first);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, writersVersion, characters, failed]);

  // Kick playback whenever the focused character, its stroke count or the
  // play state changes.
  useEffect(() => {
    if (!playing) return;
    void driveStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, selectedIndex, totalStrokes, writersVersion]);

  /**
   * Brings the focused character to the requested stroke count, one stroke at a
   * time. While playing it feeds itself the next stroke; stepping writes or
   * erases a single stroke.
   */
  async function driveStep() {
    // A run is already in flight — it re-reads the state on every stroke, so
    // just make sure it gets one more pass before it settles.
    if (runningRef.current) {
      pendingRunRef.current = true;
      return;
    }

    runningRef.current = true;

    try {
      for (;;) {
        const index = selectedIndexRef.current;
        const writer = index === null ? null : writersRef.current[index];
        const total = totalStrokesRef.current;

        if (!writer || index === null || !total) return;
        if (failedRef.current.has(index)) return;

        // Playing: aim at the stroke after the last one drawn.
        if (playingRef.current && targetStrokesRef.current <= drawnStrokesRef.current) {
          if (drawnStrokesRef.current >= total) {
            // The character is complete — stop, leaving it on screen.
            playingRef.current = false;
            setPlaying(false);
            return;
          }

          const next = drawnStrokesRef.current + 1;
          targetStrokesRef.current = next;
          setTargetStrokes(next);
        }

        const target = Math.min(targetStrokesRef.current, total);
        const drawn = drawnStrokesRef.current;

        if (target === drawn) return;

        const epoch = epochRef.current;

        if (target < drawn) {
          const status = await unDrawStroke(writer, drawn - 1, () => {
            return epochRef.current !== epoch;
          });
          if (status !== "done") return;

          drawnStrokesRef.current = drawn - 1;
          setDrawnStrokes(drawn - 1);
          continue;
        }

        const status = await drawStroke(writer, drawn);
        if (status !== "done") return;

        drawnStrokesRef.current = drawn + 1;
        setDrawnStrokes(drawn + 1);

        // Breathe between automatic strokes; skip it once paused.
        if (playingRef.current) {
          await sleep(PLAY_STROKE_GAP);
        }
      }
    } finally {
      runningRef.current = false;

      if (pendingRunRef.current) {
        pendingRunRef.current = false;
        void driveStep();
      }
    }
  }

  const focusWriter = () => {
    const index = selectedIndexRef.current;
    return index === null ? null : writersRef.current[index];
  };

  const clearStrokeState = () => {
    epochRef.current += 1;
    drawnStrokesRef.current = 0;
    targetStrokesRef.current = 0;
    setDrawnStrokes(0);
    setTargetStrokes(0);
  };

  const togglePlay = () => {
    if (playingRef.current) {
      playingRef.current = false;
      setPlaying(false);
      return;
    }

    if (!totalStrokes) return;

    if (drawnStrokesRef.current >= totalStrokes) {
      // Play on a finished character starts it over.
      clearStrokeState();
      const writer = focusWriter();
      if (writer) blankWriter(writer, totalStrokes);
    }

    playingRef.current = true;
    setPlaying(true);
    void driveStep();
  };

  /** One stroke forward (auto-play stops so the step is visible). */
  const stepForward = () => {
    if (!totalStrokes) return;

    playingRef.current = false;
    setPlaying(false);

    const base = Math.max(drawnStrokesRef.current, targetStrokesRef.current);
    const next = Math.min(base + 1, totalStrokes);
    if (next === targetStrokesRef.current) return;

    targetStrokesRef.current = next;
    setTargetStrokes(next);
    void driveStep();
  };

  /** One stroke back — erases the last stroke in reverse of how it was written. */
  const stepBackward = () => {
    playingRef.current = false;
    setPlaying(false);

    const base = Math.max(drawnStrokesRef.current, targetStrokesRef.current);
    const next = Math.max(base - 1, 0);
    if (next === targetStrokesRef.current) return;

    targetStrokesRef.current = next;
    setTargetStrokes(next);
    void driveStep();
  };

  const restartCharacter = () => {
    clearStrokeState();
    const writer = focusWriter();
    if (writer) blankWriter(writer, totalStrokesRef.current);
    if (playingRef.current) void driveStep();
  };

  if (!chars.length) return null;

  const position = Math.max(drawnStrokes, targetStrokes);
  const canPlay = totalStrokes > 0;
  const canStepForward = totalStrokes > 0 && position < totalStrokes;
  const canStepBackward = totalStrokes > 0 && position > 0;

  const stepButtonClassName = (enabled: boolean) =>
    cn(
      "flex h-9 w-9 items-center justify-center rounded-full transition",
      enabled
        ? "text-gray-500 hover:bg-gray-100 hover:text-rose-400 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        : "cursor-not-allowed text-gray-300 dark:text-gray-700",
    );

  return (
    <div className="dark:bg-[rgb(11,12,13)] bg-gray-50 mt-4 rounded-2xl p-2 sm:px-8">
      <div className="mt-6">
        <h3 className="text-sm font-bold text-black dark:text-white">
          Stroke Order
        </h3>
        <p className="text-[11px] font-extralight text-gray-400">
          See how each character is written
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {chars.map((char, index) => (
          <div
            key={`${char}-${index}`}
            ref={(el) => {
              targetRefs.current[index] = el;
            }}
            onClick={() => {
              // Clicking the focused character starts it over.
              if (selectedIndex === index) {
                restartCharacter();
                return;
              }

              setSelectedIndex(index);
            }}
            className={cn(
              "flex cursor-pointer items-center justify-center rounded-xl bg-white ring-1 ring-gray-100 dark:bg-[rgb(20,21,22)] dark:ring-gray-800",
              selectedIndex === index &&
                "ring-2 ring-gray-500 dark:ring-gray-400",
              failed.has(index) && "hidden",
            )}
            style={{ width: CHAR_SIZE, height: CHAR_SIZE }}
          />
        ))}
      </div>

      <div className="mb-6 mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-gray-100 pt-4 dark:border-gray-800">
        <div className="flex items-center gap-x-2">
          <button
            type="button"
            aria-label="Previous stroke"
            title="Previous stroke"
            disabled={!canStepBackward}
            onClick={stepBackward}
            className={stepButtonClassName(canStepBackward)}
          >
            <Icons.back className="text-sm" />
          </button>

          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            title={playing ? "Pause" : "Play"}
            disabled={!canPlay}
            onClick={togglePlay}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition",
              canPlay
                ? "bg-black text-white hover:bg-rose-500 dark:bg-white dark:text-black dark:hover:bg-rose-400 dark:hover:text-white"
                : "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600",
            )}
          >
            {playing ? (
              <Icons.pause className="text-sm" />
            ) : (
              <Icons.play className="ml-0.5 text-sm" />
            )}
          </button>

          <button
            type="button"
            aria-label="Next stroke"
            title="Next stroke"
            disabled={!canStepForward}
            onClick={stepForward}
            className={stepButtonClassName(canStepForward)}
          >
            <Icons.front className="text-sm" />
          </button>
        </div>

        <p className="text-xs uppercase tracking-wider text-gray-500">
          <span>Stroke </span>
          <span className="text-black dark:text-white">{drawnStrokes}</span>
          <span> / </span>
          <span className="text-black dark:text-white">
            {totalStrokes || "?"}
          </span>
        </p>
      </div>
    </div>
  );
};
