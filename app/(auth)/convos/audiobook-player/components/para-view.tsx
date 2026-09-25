"use client";

import { EnglishTopView } from "@/app/(auth)/convos/audiobook-player/components/english-top-view";
import { CharacterItem } from "@/components/_select-character/character-item";
import { useReadModeState } from "@/components/read-mode-button";
import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";
import { useIsSmall } from "@/components/youtube-page/utils/use-is-small";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { ContentTranscription, IContent } from "@/domain/content/content.api";
import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { isCharacterPartOfWordMatch } from "@/lib/content-bookmark";
import { cn } from "@/lib/utils";
import { memo, useCallback, useMemo } from "react";
import { findActiveLineIndex, useFollowStage } from "../hooks/use-follow-stage";
import { useReadModeSweep } from "../hooks/use-read-mode-sweep";
import { useFontScale } from "../hooks/use-font-size";
import { useSmoothPlayhead } from "../hooks/use-smooth-playhead";
import { useTranscriptionHighlight } from "../hooks/use-transcription-highlight";
import { containsUnknownStyles } from "../utils/contains-unknown-styles";
import { ReaderStyles } from "./karaoke/reader-styles";
import {
  DESKTOP_STAGE_ANCHOR,
  STAGE_ANCHOR,
  stageBlurFilter,
} from "./karaoke/stage-tuning";
import { SweepTiming } from "./karaoke/sweep";
import { ReaderTextLine } from "./reader-line";

/**
 * The paragraph view.
 *
 * The page keeps its own shape — sentences flowing together as tiles, a new
 * paragraph after any decent pause — and the transcription being read fills in
 * exactly the way it does in the read view, because `toReadAlong` below *is*
 * the read view's fill logic, applied to this view's markup.
 */

/** A pause at least this long between sentences starts a new paragraph. */
const PARAGRAPH_GAP = 2;

/** Whitespace carries no glyph, so it never takes part in the fill. */
const isSpacePiece = (text: string) => /^\s*$/.test(text);

type Sentence = { index: number; transcription: any };

/** Sentences collected into paragraphs, in play order — one linear pass. */
const toParagraphs = (lines: any[]) => {
  const paragraphs: { key: string; sentences: Sentence[] }[] = [];

  lines.forEach((transcription, index) => {
    const paragraph = paragraphs[paragraphs.length - 1];
    const previous = paragraph?.sentences[paragraph.sentences.length - 1];
    const start = Number(transcription?.start);
    const previousEnd = Number(previous?.transcription?.end);

    const continues =
      !!paragraph &&
      Number.isFinite(start) &&
      Number.isFinite(previousEnd) &&
      start - previousEnd <= PARAGRAPH_GAP;

    if (continues) {
      paragraph.sentences.push({ index, transcription });
      return;
    }

    paragraphs.push({
      key: `p-${index}`,
      sentences: [{ index, transcription }],
    });
  });

  return paragraphs;
};

/**
 * One character of a sentence.
 *
 * `unit` is which timing it fills against — -1 for spacing, which never fills —
 * and `glyph`/`glyphs` are its place inside that unit, which is what makes the
 * fill travel across a word instead of every character lighting up at once.
 */
type ReadAlongGlyph = {
  key: string;
  text: string;
  unit: number;
  glyph: number;
  glyphs: number;
  /** Position in the sentence, for the unknown-word lookup. */
  index: number;
};

/** Read mode draws the sentence with the read view's line, so nothing here. */
const NO_READ_ALONG = { timings: [] as (SweepTiming | null)[], glyphs: [] };

const toTiming = (start: any, end: any): SweepTiming | null => {
  const from = Number(start);
  const to = Number(end);

  return Number.isFinite(from) && Number.isFinite(to) && to > from
    ? { start: from, end: to }
    : null;
};

/**
 * The read view's fill rules, applied to one sentence — the same two halves it
 * uses, chosen the same way:
 *
 * 1. A Chinese line with word data fills word by word, off each word's own
 *    timing — and a word with no usable timing does not fill at all.
 * 2. Any other line is read whole rather than word by word, so its duration is
 *    shared out between its pieces by length.
 *
 * Characters never fill on their own: they share their unit's timing between
 * them, which is what keeps the fill a single front travelling across a word.
 */
const toReadAlong = (transcription: any) => {
  const lang = transcription?.lang;
  const words: any[] = Array.isArray(transcription?.words)
    ? transcription.words
    : [];

  const glyphs: ReadAlongGlyph[] = [];
  let index = 0;

  if (lang === "zh" && words.length > 0) {
    const timings = words.map((word) => toTiming(word?.start, word?.end));

    words.forEach((word, wordIndex) => {
      const pieces: string[] =
        smartSplit({ input: word?.hanzi || word?.input, lang }) || [];

      const visible = pieces.filter((piece) => !isSpacePiece(piece)).length;

      let glyph = 0;

      pieces.forEach((piece, pieceIndex) => {
        const isSpace = isSpacePiece(piece);

        glyphs.push({
          key: `${word?.id ?? wordIndex}-${pieceIndex}`,
          text: piece,
          unit: isSpace ? -1 : wordIndex,
          glyph: isSpace ? 0 : glyph,
          glyphs: isSpace ? 1 : visible,
          index,
        });

        if (!isSpace) {
          glyph += 1;
        }

        index += 1;
      });
    });

    return { timings, glyphs };
  }

  const pieces: string[] =
    smartSplit({ input: transcription?.input, lang }) || [];

  const units = pieces.filter((piece) => !isSpacePiece(piece));
  const lineTiming = toTiming(transcription?.start, transcription?.end);
  const characters = units.reduce((acc, piece) => acc + piece.length, 0) || 1;
  const secondsPerCharacter = lineTiming
    ? (lineTiming.end - lineTiming.start) / characters
    : 0;

  const timings: (SweepTiming | null)[] = [];
  let cursor = lineTiming?.start ?? 0;
  let unit = 0;

  pieces.forEach((piece, pieceIndex) => {
    if (isSpacePiece(piece)) {
      glyphs.push({
        key: `space-${pieceIndex}`,
        text: piece,
        unit: -1,
        glyph: 0,
        glyphs: 1,
        index,
      });

      index += 1;
      return;
    }

    const timing = lineTiming
      ? {
          start: cursor,
          end: cursor + piece.length * secondsPerCharacter,
        }
      : null;

    if (timing) {
      cursor = timing.end;
    }

    timings.push(timing);

    glyphs.push({
      key: `unit-${pieceIndex}`,
      text: piece,
      unit,
      glyph: 0,
      glyphs: 1,
      index,
    });

    unit += 1;
    index += 1;
  });

  return { timings, glyphs };
};

/**
 * One sentence of a paragraph.
 *
 * Memoised like the read view's lines, so the playhead reporting its position
 * ten times a second re-renders the sentence it has just left and the one it has
 * just reached — and nothing else. Every prop is therefore a stable value, and
 * never a live `currentTime`.
 */
const ParagraphSentence = memo(function ParagraphSentence({
  transcription,
  index,
  isActive,
  activeClassName,
  inactiveClassName,
  blur,
  contentUnknowns,
  readMode,
  lang,
  contentId,
  timeRef,
  onSeek,
}: {
  transcription: any;
  index: number;
  isActive: boolean;
  activeClassName: string;
  inactiveClassName: string;
  /** How far out of focus this sentence sits, as a `filter` value. */
  blur?: string;
  contentUnknowns: any;
  /**
   * With read mode on, a sentence is drawn by the read view's own line — word by
   * word, with its guide, filling in as it is spoken. With it off, a sentence
   * keeps this view's own shape: a tile of characters.
   */
  readMode: boolean;
  lang: string;
  contentId: string;
  timeRef: React.MutableRefObject<number> | null;
  onSeek: (transcription: any) => void;
}) {
  const { timings, glyphs } = useMemo(
    () => (readMode ? NO_READ_ALONG : toReadAlong(transcription)),
    [readMode, transcription],
  );

  // With read mode on the sentence's own line owns the fill, so this loop stays
  // out of it rather than writing the same properties twice.
  const sweeping = !readMode && isActive && !!timeRef;

  const sweepRef = useReadModeSweep<HTMLSpanElement>({
    active: sweeping,
    timeRef,
    timings,
  });

  // The transcription being read is painted like the input itself; every other
  // one keeps the quieter colour.
  const sentenceClassName = isActive ? activeClassName : inactiveClassName;

  return (
    <span
      ref={sweepRef}
      role="button"
      data-r-line={index}
      data-r-line-active={isActive ? "1" : undefined}
      style={{ filter: blur }}
      className={cn("mn-r-tile transition block", sentenceClassName)}
      onClick={() => onSeek(transcription)}
    >
      {readMode ? (
        <ReaderTextLine
          transcription={transcription}
          isActive={isActive}
          className={sentenceClassName}
          lang={lang}
          contentId={contentId}
          timeRef={timeRef}
        />
      ) : null}

      {glyphs.map((glyph) => {
        const containsInUnknown = contentUnknowns?.items?.find((val: any) =>
          isCharacterPartOfWordMatch(
            transcription?.input || transcription?.hanzi,
            val?.input,
            glyph.text,
            glyph.index,
          ),
        );

        // The read view's own rule: a character fills only when the unit it
        // belongs to has a timing. A unit with no timing does not fill at all.
        const fills = sweeping && glyph.unit >= 0 && !!timings[glyph.unit];

        return (
          <CharacterItem
            key={glyph.key}
            character={glyph.text}
            sweepSlot={
              fills
                ? { word: glyph.unit, glyph: glyph.glyph, glyphs: glyph.glyphs }
                : undefined
            }
            className={cn(
              "mn-r-text-paragraph",
              containsUnknownStyles(!!containsInUnknown),
              containsInUnknown && "font-light",
              sentenceClassName,
              fills && "mn-r-sweep",
            )}
          />
        );
      })}
    </span>
  );
});

ParagraphSentence.displayName = "ParagraphSentence";

export const ParaView = ({
  content,
  currentTranscription,
  currentTime,
  loop,
  setLoop,
  isPlaying,
  seekAndPlay,
  playerRef,
}: {
  loop?: ContentTranscription;
  currentTranscription: ContentTranscription;
  content: IContent;
  currentTime: number;
  isPlaying: boolean;
  setLoop: (id: string | null) => void;
  seekAndPlay: (time: number) => void;
  /** react-player, used as the high resolution clock for the sweep. */
  playerRef?: { current: any } | null;
}) => {
  const isVideoHidden = usePlayerViewModeStore((state) => state.isVideoHidden);

  const isSmall = useIsSmall();

  // Every character on the sheet reads its size off this one number.
  const rScale = useFontScale();

  // Read mode is the reader's own toggle, and it works here too: on, a sentence
  // is the read view's line; off, it is this view's own tile.
  const { readMode } = useReadModeState();

  const { data: contentUnknowns } = useListContentUnknownsQuery(content.id);

  const { activeClassName } = useTranscriptionHighlight({
    background: "dark:bg-[rgb(11,12,13)]",
  });

  // The book in play order: `content.transcriptions` is not guaranteed to be
  // sorted, and the sheet follows the audio through it in order.
  const lines = useMemo(
    () =>
      (content?.transcriptions || [])
        .filter(Boolean)
        .slice()
        .sort(
          (a: any, b: any) => (Number(a?.start) || 0) - (Number(b?.start) || 0),
        ),
    [content?.transcriptions],
  );

  const paragraphs = useMemo(() => toParagraphs(lines), [lines]);

  const activeIndex = useMemo(
    () => findActiveLineIndex(lines, currentTime),
    [lines, currentTime],
  );

  const {
    stageRef,
    topSpacer,
    bottomSpacer,
    mounted,
    following,
    onManualScroll,
    resumeFollowing,
  } = useFollowStage({
    bookKey: content?.id || "",
    total: lines.length,
    activeIndex,
    // A taller stage has more room to show what is coming, so the sentence
    // being read sits a little higher on a desktop screen.
    anchor: isSmall ? STAGE_ANCHOR : DESKTOP_STAGE_ANCHOR,
  });

  // The same high resolution playhead the read view's sheet uses: `currentTime`
  // only arrives every 100ms, which is what makes a fill step instead of glide.
  const timeRef = useSmoothPlayhead({ playerRef, currentTime, isPlaying });

  const isIntro = activeIndex < 0;

  // Before the first sentence starts nothing is being read, so the focus rests
  // on the first one: the page opens readable and in focus, and the blur simply
  // follows the playhead once playback begins.
  const focusIndex = isIntro ? 0 : activeIndex;

  const handleSeek = useCallback(
    (transcription: any) => {
      seekAndPlay(transcription?.start);

      if (loop) {
        setLoop(transcription?.id);
      }
    },
    [loop, seekAndPlay, setLoop],
  );

  return (
    <div
      className={cn("px-4 pb-24", "max-w-4xl", isVideoHidden ? "mx-auto" : "")}
      style={{ "--r-scale": rScale } as React.CSSProperties}
    >
      <ReaderStyles />

      <EnglishTopView currentTranscription={currentTranscription} />

      {lines.length > 0 && (
        <div className="relative">
          <div
            ref={stageRef}
            onWheel={onManualScroll}
            onTouchStart={onManualScroll}
            onPointerDown={onManualScroll}
            className={cn(
              "mn-r-stage overflow-y-auto overscroll-contain",
              isVideoHidden
                ? "h-[58vh] min-h-[400px] max-h-[640px] sm:h-[76vh] sm:min-h-[520px] sm:max-h-[900px]"
                : "h-[46vh] min-h-[300px] max-h-[420px] sm:h-[56vh] sm:max-h-[560px]",
            )}
          >
            <div style={{ height: topSpacer }} />

            {/* A ratio rather than 32px, and a paragraph gap that comes with
                the text size, so the page never crowds as it grows. */}
            <div className="mn-r-paragraph-gap" style={{ lineHeight: 1.6 }}>
              {paragraphs.map((paragraph) => {
                // Paragraphs arrive with the rest of the book, a pass at a
                // time; one with nothing mounted yet is left out entirely
                // rather than reserving a gap for text that is not there.
                const sentences = paragraph.sentences.filter(
                  ({ index }) => index >= mounted.start && index < mounted.end,
                );

                if (sentences.length === 0) {
                  return null;
                }

                return (
                  <div key={paragraph.key} className="flex flex-wrap">
                    {sentences.map(({ index, transcription }) => {
                      const isActive = index === activeIndex;

                      return (
                        <ParagraphSentence
                          key={transcription?.id || `${index}`}
                          transcription={transcription}
                          index={index}
                          isActive={isActive}
                          activeClassName={activeClassName}
                          inactiveClassName="opacity-50"
                          blur={stageBlurFilter(index - focusIndex)}
                          contentUnknowns={contentUnknowns}
                          readMode={readMode}
                          lang={content?.lang}
                          contentId={content?.id}
                          timeRef={timeRef}
                          onSeek={handleSeek}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div style={{ height: bottomSpacer }} />
          </div>

          {/* The sheet follows the audio on its own; this is the way back after
              reading ahead or behind by hand. */}
          {!isIntro && !following && (
            <button
              onClick={resumeFollowing}
              className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs text-black backdrop-blur-md transition hover:bg-white dark:border-white/15 dark:bg-black/35 dark:text-white dark:hover:bg-black/50"
            >
              Back to current line
            </button>
          )}
        </div>
      )}
    </div>
  );
};
