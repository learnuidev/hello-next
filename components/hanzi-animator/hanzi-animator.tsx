"use client";

import { useEffect, useRef, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CHAR_SIZE = 90;

type HanziCharacterProps = {
  character: string;
  animate: boolean;
  showOutline: boolean;
};

const HanziCharacter = ({
  character,
  animate,
  showOutline,
}: HanziCharacterProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    setFailed(false);

    let cancelled = false;

    import("hanzi-writer").then(({ default: HanziWriter }) => {
      if (cancelled || !targetRef.current) return;

      const isDark = document.documentElement.classList.contains("dark");

      const writer = HanziWriter.create(targetRef.current, character, {
        width: CHAR_SIZE,
        height: CHAR_SIZE,
        padding: 5,
        showOutline,
        showCharacter: !animate,
        strokeColor: isDark ? "#e5e7eb" : "#333333",
        outlineColor: isDark ? "#374151" : "#dddddd",
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 300,
        delayBetweenLoops: 1500,
        onLoadCharDataError: () => setFailed(true),
      });

      if (animate) {
        writer.loopCharacterAnimation();
      }
    });

    return () => {
      cancelled = true;
      if (target) target.innerHTML = "";
    };
  }, [character, animate, showOutline]);

  if (failed) return null;

  return (
    <div
      ref={targetRef}
      className="flex items-center justify-center rounded-xl bg-white ring-1 ring-gray-100 dark:bg-[rgb(20,21,22)] dark:ring-gray-800"
      style={{ width: CHAR_SIZE, height: CHAR_SIZE }}
    />
  );
};

export const HanziAnimator = ({ characters }: { characters: string }) => {
  const [animate, setAnimate] = useState(true);
  const [showOutline, setShowOutline] = useState(true);

  const chars = Array.from(characters ?? "").filter(
    (char) => char.trim().length > 0,
  );

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
          <HanziCharacter
            key={`${char}-${index}`}
            character={char}
            animate={animate}
            showOutline={showOutline}
          />
        ))}
      </div>
    </div>
  );
};
