"use client";

import { useEffect, useRef, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/ui/icons.v2";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const CHAR_SIZE = 90;
const DELAY_BETWEEN_STROKES = 300;
const DELAY_BETWEEN_CHARS = 250;
const DELAY_BETWEEN_LOOPS = 1500;

type AnimationResult = { canceled?: boolean };

type HanziWriterInstance = {
  showCharacter: (opts?: { duration?: number }) => unknown;
  hideCharacter: (opts?: { duration?: number }) => unknown;
  animateCharacter: (opts?: {
    onComplete?: (res: AnimationResult) => void;
  }) => unknown;
  animateStroke: (
    strokeNum: number,
    opts?: { onComplete?: (res: AnimationResult) => void },
  ) => unknown;
};

const isThenable = (value: unknown): value is Promise<unknown> =>
  Boolean(value) && typeof (value as Promise<unknown>)?.then === "function";

/** Resolves once the writer's pending mutation chain settles (or is canceled). */
const settle = (result: unknown) =>
  new Promise<void>((resolve) => {
    if (isThenable(result)) {
      result.then(
        () => resolve(),
        () => resolve(),
      );
      return;
    }

    resolve();
  });

const hideWriter = async (writer: HanziWriterInstance) => {
  try {
    await settle(writer.hideCharacter({ duration: 0 }));
  } catch {
    // nothing to hide
  }
};

type DrawStatus = "done" | "canceled" | "error";

/** Draws a single stroke and reports how that draw ended. */
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

export const HanziAnimator = ({ characters }: { characters: string }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [stepMode, setStepMode] = useState(false);
  const [strokeCounts, setStrokeCounts] = useState<Record<number, number>>({});
  const [drawnStrokes, setDrawnStrokes] = useState(0);
  const [targetStrokes, setTargetStrokes] = useState(0);
  const [writersVersion, setWritersVersion] = useState(0);

  const chars = Array.from(characters ?? "").filter(
    (char) => char.trim().length > 0,
  );

  const targetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const writersRef = useRef<(HanziWriterInstance | null)[]>([]);
  const failedRef = useRef<Set<number>>(new Set());
  const selectedIndexRef = useRef<number | null>(null);

  // Step mode bookkeeping: `targetStrokesRef` is what the user asked for,
  // `drawnStrokesRef` is what is actually on screen.
  const targetStrokesRef = useRef(0);
  const drawnStrokesRef = useRef(0);
  const steppingRef = useRef(false);
  const pendingStepRef = useRef(false);

  const [failed, setFailed] = useState<Set<number>>(new Set());

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  // Create one HanziWriter per character. Stroke order always animates and the
  // outline is always shown, so those are no longer configurable.
  useEffect(() => {
    failedRef.current = new Set();
    setFailed(new Set());
    setSelectedIndex(null);
    setStrokeCounts({});
    setDrawnStrokes(0);
    setTargetStrokes(0);
    drawnStrokesRef.current = 0;
    targetStrokesRef.current = 0;
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
              delayBetweenStrokes: DELAY_BETWEEN_STROKES,
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

  // When stepping, start from a blank slate: strokes are only drawn on demand.
  useEffect(() => {
    const writers = writersRef.current;
    if (!writers.length) return;

    if (stepMode) {
      writers.forEach((writer) => {
        if (writer) void hideWriter(writer);
      });

      drawnStrokesRef.current = 0;
      targetStrokesRef.current = 0;
      setDrawnStrokes(0);
      setTargetStrokes(0);
      return;
    }

    // Otherwise: keep the ambient loop animation.
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const clearTimers = () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.length = 0;
    };

    const isPlayable = (index: number) =>
      Boolean(writers[index]) && !failedRef.current.has(index);

    const hideAll = () => {
      writers.forEach((writer) => {
        writer?.hideCharacter({ duration: 0 });
      });
    };

    if (selectedIndex !== null && isPlayable(selectedIndex)) {
      const animateLoop = () => {
        if (cancelled) return;
        writers[selectedIndex]?.animateCharacter({
          onComplete: () => {
            const timer = setTimeout(() => {
              animateLoop();
            }, DELAY_BETWEEN_LOOPS);
            timers.push(timer);
          },
        });
      };

      hideAll();
      animateLoop();

      return () => {
        cancelled = true;
        clearTimers();
      };
    }

    let i = 0;
    const advance = () => {
      if (cancelled) return;

      while (i < writers.length && !isPlayable(i)) i++;

      if (i >= writers.length) {
        const timer = setTimeout(() => {
          if (cancelled) return;
          hideAll();
          i = 0;
          advance();
        }, DELAY_BETWEEN_LOOPS);
        timers.push(timer);
        return;
      }

      writers[i]?.animateCharacter({
        onComplete: () => {
          const timer = setTimeout(() => {
            i += 1;
            advance();
          }, DELAY_BETWEEN_CHARS);
          timers.push(timer);
        },
      });
    };

    hideAll();
    advance();

    return () => {
      cancelled = true;
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characters, stepMode, selectedIndex, writersVersion]);

  // Stepping needs a character to step through: default to the first one.
  useEffect(() => {
    if (!stepMode) return;
    if (selectedIndex !== null) return;

    const first = chars.findIndex(
      (_char, index) =>
        Boolean(writersRef.current[index]) && !failedRef.current.has(index),
    );

    if (first >= 0) setSelectedIndex(first);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepMode, selectedIndex, writersVersion, characters]);

  const totalStrokes =
    selectedIndex !== null ? (strokeCounts[selectedIndex] ?? 0) : 0;

  /**
   * Draws (or rewinds) the selected character until it matches the requested
   * stroke count. Strokes are drawn one at a time; rewinding resets the
   * character and replays the earlier strokes.
   */
  async function driveStep() {
    // A run is already in flight — it re-reads the target on every stroke, so
    // just make sure it gets one more pass before it settles.
    if (steppingRef.current) {
      pendingStepRef.current = true;
      return;
    }

    steppingRef.current = true;

    try {
      for (;;) {
        const index = selectedIndexRef.current;
        const writer = index === null ? null : writersRef.current[index];

        if (!writer || index === null || failedRef.current.has(index)) return;

        const target = targetStrokesRef.current;
        const drawn = drawnStrokesRef.current;

        if (target === drawn) return;

        if (target < drawn) {
          await hideWriter(writer);
          drawnStrokesRef.current = 0;
          setDrawnStrokes(0);
          continue;
        }

        const status = await drawStroke(writer, drawn);
        if (status !== "done") return;

        drawnStrokesRef.current = drawn + 1;
        setDrawnStrokes(drawn + 1);
      }
    } finally {
      steppingRef.current = false;

      if (pendingStepRef.current) {
        pendingStepRef.current = false;
        void driveStep();
      }
    }
  }

  const stepForward = () => {
    if (!totalStrokes) return;

    const next = Math.min(targetStrokesRef.current + 1, totalStrokes);
    if (next === targetStrokesRef.current) return;

    targetStrokesRef.current = next;
    setTargetStrokes(next);
    void driveStep();
  };

  const stepBackward = () => {
    const next = Math.max(targetStrokesRef.current - 1, 0);
    if (next === targetStrokesRef.current) return;

    targetStrokesRef.current = next;
    setTargetStrokes(next);
    void driveStep();
  };

  /** Rewinds the stepped character back to zero strokes. */
  const resetStep = () => {
    targetStrokesRef.current = 0;
    setTargetStrokes(0);
    void driveStep();
  };

  if (!chars.length) return null;

  const canStepForward = totalStrokes > 0 && targetStrokes < totalStrokes;
  const canStepBackward = totalStrokes > 0 && targetStrokes > 0;

  return (
    <div className="dark:bg-[rgb(11,12,13)] bg-gray-50 mt-4 rounded-2xl p-2 sm:px-8">
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-sm font-bold text-black dark:text-white">
            Stroke Order
          </h3>
          <p className="text-[11px] font-extralight text-gray-400">
            See how each character is written
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hanzi-step"
              checked={stepMode}
              onCheckedChange={(value) => setStepMode(Boolean(value))}
            />
            <Label
              htmlFor="hanzi-step"
              className="cursor-pointer text-xs text-black dark:text-white"
            >
              Step
            </Label>
          </div>
        </div>
      </div>

      <div className="mb-6 mt-4 flex flex-wrap gap-3">
        {chars.map((char, index) => (
          <div
            key={`${char}-${index}`}
            ref={(el) => {
              targetRefs.current[index] = el;
            }}
            onClick={() => {
              if (stepMode) {
                // Clicking the character being stepped restarts it from blank.
                if (selectedIndex === index) resetStep();

                setSelectedIndex(index);
                return;
              }

              setSelectedIndex((prev) => (prev === index ? null : index));
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

      {stepMode && (
        <div className="mb-6 flex items-center justify-between gap-4 border-t border-gray-100 pt-4 dark:border-gray-800">
          <button
            type="button"
            disabled={!canStepBackward}
            onClick={stepBackward}
            className={cn(
              "flex items-center space-x-2 text-xs uppercase tracking-wider transition",
              canStepBackward
                ? "text-gray-400 hover:text-rose-400 dark:hover:text-white"
                : "cursor-not-allowed text-gray-700 dark:text-gray-600",
            )}
          >
            <Icons.back className="text-sm" />
            <span>Previous</span>
          </button>

          <p className="text-xs uppercase tracking-wider text-gray-500">
            <span>Stroke </span>
            <span>{drawnStrokes}</span>
            <span> / </span>
            <span>{totalStrokes || "?"}</span>
          </p>

          <button
            type="button"
            disabled={!canStepForward}
            onClick={stepForward}
            className={cn(
              "flex items-center space-x-2 text-xs uppercase tracking-wider transition",
              canStepForward
                ? "text-gray-400 hover:text-rose-400 dark:hover:text-white"
                : "cursor-not-allowed text-gray-700 dark:text-gray-600",
            )}
          >
            <span>Next</span>
            <Icons.front className="text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};
