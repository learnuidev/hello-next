"use client";

import { cn } from "@/lib/utils";
import { memo, useEffect, useLayoutEffect, useRef } from "react";
import { KaraokeChunk } from "./karaoke-data";
import { stageBlurFilter } from "./stage-tuning";
import {
  applySweepFrame,
  createSweepRuntime,
  getSweepProgress,
  releaseSweep,
  SweepTarget,
} from "./sweep";

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

/**
 * The English / chinglish line is what most readers actually scan, so it is
 * sized as a real second line rather than a caption. The floors matter as much
 * as the ratio: the lyric size collapses on very long lines, and the
 * translation must not be dragged down with it.
 */
const TRANSLATION_SCALE = 0.6;
const TRANSLATION_MIN_SIZE = { compact: 15, focus: 18 };

/**
 * The pinyin / roman guide is sized in `em` so it tracks the lyric it sits
 * above — but a fixed `em` alone shrinks it into illegibility on long lines,
 * exactly like the translation, so a px floor is mixed in with CSS `max()`.
 */
const ROMAN_SCALE = 0.46;
const ROMAN_MIN_SIZE = { compact: 11, focus: 13 };

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
    // Only opacity and transform are *animated*: both are composited, while a
    // blur that animates re-rasterises the sheet on every line change and makes
    // the whole thing stutter. The blur below is a plain, never-transitioned
    // filter per line: the sheet curves away from the line being sung, one step
    // per line of distance, and every line past the last step shares one value
    // so only the lines around the singer are re-rasterised.
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

    // `em` keeps the guide in proportion to the lyric above it; the px floor
    // stops it dissolving on the long lines where the lyric itself shrinks.
    const romanFontSize = `max(${ROMAN_SCALE}em, ${
      compact ? ROMAN_MIN_SIZE.compact : ROMAN_MIN_SIZE.focus
    }px)`;

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
    // Whitespace carries no glyph, so it is never animated — and never counted,
    // which keeps the frame maths indexed by animatable token.
    useEffect(() => {
      if (!isActive) {
        return;
      }

      const slots: { start: number; end: number; el: HTMLSpanElement }[] = [];

      chunk.tokens.forEach((token, index) => {
        const el = tokenRefs.current[index];

        if (!el || token.isSpace) {
          return;
        }

        slots.push({ start: token.start, end: token.end, el });
      });

      if (slots.length === 0) {
        return;
      }

      const targets: SweepTarget[] = slots.map((slot) => ({
        el: slot.el,
        progress: 0,
      }));
      const runtime = createSweepRuntime(slots.length);

      let frame = 0;

      const loop = () => {
        frame = requestAnimationFrame(loop);

        const time = timeRef.current;

        for (let index = 0; index < slots.length; index++) {
          const slot = slots[index];

          targets[index].progress = getSweepProgress(time, slot.start, slot.end);
        }

        applySweepFrame(targets, runtime);
      };

      frame = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(frame);
        releaseSweep(targets);
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
          filter: stageBlurFilter(distance),
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
                      // Every line carries its guide, not just the one being
                      // sung — the lines you are not on are out of focus, which
                      // is what keeps the page readable without hiding what is
                      // coming. Laid out for every line, always: the box never
                      // changes height, so the scroll maths measures the same
                      // sheet whatever is being sung.
                      opacity: 0.7,
                      fontSize: romanFontSize,
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
            className="mx-auto mt-2 line-clamp-2 max-w-3xl px-2 text-center"
            style={{
              fontSize: Math.max(
                fontSize * TRANSLATION_SCALE,
                compact
                  ? TRANSLATION_MIN_SIZE.compact
                  : TRANSLATION_MIN_SIZE.focus,
              ),
              lineHeight: 1.5,
              color: "var(--k-muted)",
              // Same rule as the roman guide: the English / chinglish belongs to
              // every line, and the out-of-focus blur — not hiding it — is what
              // keeps the line being sung in front.
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
