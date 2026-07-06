"use client";

import { useEffect, useRef, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const CHAR_SIZE = 90;
const DELAY_BETWEEN_STROKES = 300;
const DELAY_BETWEEN_CHARS = 250;
const DELAY_BETWEEN_LOOPS = 1500;

type HanziWriterInstance = {
  showCharacter: (opts?: { duration?: number }) => unknown;
  hideCharacter: (opts?: { duration?: number }) => unknown;
  animateCharacter: (opts?: {
    onComplete?: (res: { canceled: boolean }) => void;
  }) => unknown;
};

export const HanziAnimator = ({ characters }: { characters: string }) => {
  const [animate, setAnimate] = useState(true);
  const [showOutline, setShowOutline] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const chars = Array.from(characters ?? "").filter(
    (char) => char.trim().length > 0,
  );

  const targetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const failedRef = useRef<Set<number>>(new Set());
  const [failed, setFailed] = useState<Set<number>>(new Set());

  useEffect(() => {
    failedRef.current = new Set();
    setFailed(new Set());
  }, [characters]);

  useEffect(() => {
    const targets = targetRefs.current.slice(0, chars.length);
    if (!targets.length) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const clearTimers = () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.length = 0;
    };

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
              showOutline,
              showCharacter: !animate,
              strokeColor: isDark ? "#e5e7eb" : "#333333",
              outlineColor: isDark ? "#374151" : "#dddddd",
              strokeAnimationSpeed: 1,
              delayBetweenStrokes: DELAY_BETWEEN_STROKES,
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

      if (!animate) return;

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
        return;
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
    });

    return () => {
      cancelled = true;
      clearTimers();
      targets.forEach((el) => {
        if (el) el.innerHTML = "";
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characters, animate, showOutline, selectedIndex]);

  if (!chars.length) return null;

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
              id="hanzi-animate"
              checked={animate}
              onCheckedChange={(value) => setAnimate(Boolean(value))}
            />
            <Label
              htmlFor="hanzi-animate"
              className="cursor-pointer text-xs text-black dark:text-white"
            >
              Animate
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hanzi-outline"
              checked={showOutline}
              onCheckedChange={(value) => setShowOutline(Boolean(value))}
            />
            <Label
              htmlFor="hanzi-outline"
              className="cursor-pointer text-xs text-black dark:text-white"
            >
              Show outline
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
    </div>
  );
};
