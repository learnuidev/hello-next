"use client";

import { cn } from "@/lib/utils";
import { memo, useEffect, useLayoutEffect, useRef } from "react";
import { KaraokeChunk } from "./karaoke-data";

type KaraokeLineProps = {
  chunk: KaraokeChunk;
  /** Position of this line inside the whole lyric sheet (for DOM lookup). */
  globalIndex: number;
  /** Signed distance from the active chunk (0 = currently singing). */
  distance: number;
  isActive: boolean;
  isPast: boolean;
  /** Phonetic guide (pinyin / roman) above each syllable. */
  showRoman: boolean;
  showTranslation: boolean;
  compact: boolean;
  isFlashing?: boolean;
  translation?: string;
  timeRef: React.MutableRefObject<number>;
  onSeekToken: (time: number, key: string) => void;
};

const FONT_SIZES = {
  compact: { short: 30, medium: 26, long: 21, xlong: 17 },
  focus: { short: 46, medium: 39, long: 30, xlong: 23 },
};

const getFontSize = (length: number, compact: boolean) => {
  const sizes = compact ? FONT_SIZES.compact : FONT_SIZES.focus;

  if (length <= 10) {
    return sizes.short;
  }

  if (length <= 20) {
    return sizes.medium;
  }

  if (length <= 34) {
    return sizes.long;
  }

  return sizes.xlong;
};

export const KaraokeLine = memo(
  function KaraokeLine({
    chunk,
    globalIndex,
    distance,
    isActive,
    isPast,
    showRoman,
    showTranslation,
    compact,
    isFlashing,
    translation,
    timeRef,
    onSeekToken,
  }: KaraokeLineProps) {
    const tokenRefs = useRef<(HTMLSpanElement | null)[]>([]);

    const distanceAbs = Math.abs(distance);

    // Past lines recede further than upcoming ones, which stay readable so you
    // can see what is coming — how Apple Music Sing layers its lyrics.
    //
    // Only opacity and transform are animated: both are composited, while
    // animating `filter: blur()` here re-rasterises every line of the sheet on
    // every line change and makes the whole thing stutter.
    const opacity = isActive
      ? 1
      : isPast
        ? Math.max(0.1, 0.4 - distanceAbs * 0.06)
        : Math.max(0.14, 0.52 - distanceAbs * 0.055);

    const scale = isActive
      ? 1
      : isPast
        ? Math.max(0.78, 0.93 - distanceAbs * 0.014)
        : Math.max(0.82, 0.95 - distanceAbs * 0.012);

    const fontSize = getFontSize(chunk.visibleLength, compact);

    const hasRoman = showRoman && chunk.tokens.some((token) => !!token.roman);

    // Static syllables never travel through React: we write the custom
    // properties ourselves so a line that was live-animated always lands in a
    // clean state (React would skip re-writing an unchanged inline style).
    useLayoutEffect(() => {
      if (isActive) {
        return;
      }

      const value = isPast ? "1" : "0";

      tokenRefs.current.forEach((el) => {
        if (!el) {
          return;
        }

        el.style.setProperty("--p", value);
        el.style.setProperty("--pop", "0");
      });
    }, [isActive, isPast, chunk.key]);

    // The live sweep: one requestAnimationFrame loop, for the active line only.
    useEffect(() => {
      if (!isActive) {
        return;
      }

      let frame = 0;
      const tokens = tokenRefs.current;
      const pops = new Float32Array(chunk.tokens.length);
      const lastProgress = new Float32Array(chunk.tokens.length).fill(-1);
      const lastPop = new Float32Array(chunk.tokens.length).fill(-1);
      const willChange = new Uint8Array(chunk.tokens.length);

      const loop = () => {
        frame = requestAnimationFrame(loop);

        const time = timeRef.current;

        for (let index = 0; index < chunk.tokens.length; index++) {
          const token = chunk.tokens[index];
          const el = tokens[index];

          if (!el || token.isSpace) {
            continue;
          }

          const duration = Math.max(token.end - token.start, 0.001);

          let progress: number;

          if (time <= token.start) {
            progress = 0;
          } else if (time >= token.end) {
            progress = 1;
          } else {
            progress = (time - token.start) / duration;
          }

          const roundedProgress = Math.round(progress * 400) / 400;

          if (roundedProgress !== lastProgress[index]) {
            lastProgress[index] = roundedProgress;
            el.style.setProperty("--p", `${roundedProgress}`);
          }

          // The syllable you are on swells very slightly, then settles. The
          // approach is slow (≈250ms) and the release even slower, so the
          // character never snaps back the moment it is sung.
          const popTarget = progress > 0 && progress < 1 ? 1 : 0;
          const approach = popTarget > pops[index] ? 0.085 : 0.055;

          pops[index] += (popTarget - pops[index]) * approach;

          const pop = pops[index] < 0.004 ? 0 : pops[index];
          const roundedPop = Math.round(pop * 100) / 100;

          if (roundedPop !== lastPop[index]) {
            lastPop[index] = roundedPop;
            el.style.setProperty("--pop", `${roundedPop}`);
          }

          // Promote only the syllable that is actually moving, so the sheet
          // keeps one or two composited layers instead of hundreds.
          const promoted = roundedPop > 0 ? 1 : 0;

          if (promoted !== willChange[index]) {
            willChange[index] = promoted;
            el.style.willChange = promoted ? "transform" : "";
          }
        }
      };

      frame = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(frame);

        tokens.forEach((el) => {
          if (el) {
            el.style.willChange = "";
          }
        });
      };
    }, [isActive, chunk.tokens, timeRef]);

    return (
      <div
        data-k-index={globalIndex}
        data-k-active={isActive ? "1" : undefined}
        onClick={(event) => {
          const tokenStart = (event.target as HTMLElement)?.dataset?.kStart;
          const parsed = tokenStart !== undefined ? parseFloat(tokenStart) : NaN;

          onSeekToken(Number.isFinite(parsed) ? parsed : chunk.start, chunk.key);
        }}
        className={cn(
          // Vertical rhythm lives in padding (never margins): the scroll maths
          // stacks line offsetHeight values, so margins would break centring.
          "mn-k-line cursor-pointer select-none px-3 py-2 text-center sm:py-3",
          isActive && "mn-k-line-active",
          isFlashing && "mn-k-line-flash",
        )}
        style={{
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <div
          className="mx-auto flex max-w-4xl flex-wrap items-end justify-center"
          style={{
            fontSize,
            lineHeight: 1.2,
            fontWeight: isActive ? 700 : 500,
            letterSpacing: "-0.01em",
          }}
        >
          {chunk.tokens.map((token, index) =>
            token.isSpace ? (
              <span key={token.key} className="whitespace-pre">
                {token.text}
              </span>
            ) : (
              <span
                key={token.key}
                className="inline-flex flex-col items-center"
              >
                {hasRoman && (
                  <span
                    className="whitespace-nowrap font-normal"
                    style={{
                      // A reading guide for the whole sheet, not a spotlight on
                      // the line being sung: every line that has one shows it.
                      opacity: 0.7,
                      fontSize: "0.34em",
                      lineHeight: 1.5,
                    }}
                  >
                    {token.roman || "\u00A0"}
                  </span>
                )}
                <span
                  ref={(el) => {
                    tokenRefs.current[index] = el;
                  }}
                  data-k-start={token.start}
                  className="mn-k-token whitespace-pre"
                >
                  {token.text}
                </span>
              </span>
            ),
          )}
        </div>

        {showTranslation && translation && (
          <div
            className="mx-auto mt-2 line-clamp-2 max-w-3xl px-2 text-center transition-opacity duration-500"
            style={{
              fontSize: Math.max(fontSize * 0.36, 12),
              lineHeight: 1.5,
              color: "var(--k-muted)",
            }}
          >
            {translation}
          </div>
        )}
      </div>
    );
  },
  (prev, next) =>
    prev.chunk === next.chunk &&
    prev.globalIndex === next.globalIndex &&
    prev.distance === next.distance &&
    prev.isActive === next.isActive &&
    prev.isPast === next.isPast &&
    prev.showRoman === next.showRoman &&
    prev.showTranslation === next.showTranslation &&
    prev.compact === next.compact &&
    prev.isFlashing === next.isFlashing &&
    prev.translation === next.translation,
);

KaraokeLine.displayName = "KaraokeLine";
