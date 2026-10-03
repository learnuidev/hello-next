"use client";

import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { cn } from "@/lib/utils";
import { Fragment, useMemo } from "react";

import { ReaderCharacter, useReaderCharacterMaps } from "./reader-character";
import { getReaderPinyin } from "../utils/get-reader-pinyin";
import { isHanCharacter } from "../utils/is-han-character";
import {
  ReaderSelection,
  isReaderSelected,
  toggleReaderSelection,
} from "../utils/reader-selection";
import { ReaderWord, segmentReaderWords } from "../utils/segment-reader-text";

/**
 * The read mode view: the text with every word segmented out on its own
 * (`Intl.Segmenter`, no API) instead of a solid run of characters.
 *
 * The words are tappable too, which is how a piece of the text gets picked for
 * the reading list, and every character is drawn by the app's own
 * `CharacterItem` — so what you have learned wears its colour in the main
 * reading view as well. With pinyin switched on, each word carries its reading
 * above it. Punctuation is left exactly where it was.
 */
export const ReaderSegmentedText = ({
  text,
  lang,
  selection,
  onSelectionChange,
  className,
  paragraphClassName,
}: {
  text: string;
  lang: string;
  selection: ReaderSelection[];
  onSelectionChange: (selection: ReaderSelection[]) => void;
  className?: string;
  paragraphClassName?: string;
}) => {
  const showPinyin = useBrightModeStore((state) => state.showPinyin);
  const showReadings = showPinyin && lang === "zh";

  // One fetch for the whole text, rather than one per character.
  const characterMaps = useReaderCharacterMaps();

  const paragraphs = useMemo(
    () =>
      text.split(/\r?\n/).map((paragraph) => ({
        text: paragraph,
        words: paragraph.trim() ? segmentReaderWords(paragraph, lang) : [],
      })),
    [text, lang],
  );

  // One reading per distinct word: a long text repeats itself a lot, and
  // pinyin-pro is asked once per distinct word rather than once per word.
  const readings = useMemo(() => {
    const readingsByWord = new Map<string, string>();

    if (!showReadings) {
      return readingsByWord;
    }

    paragraphs.forEach((paragraph) => {
      paragraph.words.forEach((word: ReaderWord) => {
        if (word.isWordLike && word.text.trim() && !readingsByWord.has(word.text)) {
          readingsByWord.set(word.text, getReaderPinyin(word.text));
        }
      });
    });

    return readingsByWord;
  }, [paragraphs, showReadings]);

  return (
    <div className={className}>
      {paragraphs.map((paragraph, paragraphIndex) => {
        if (!paragraph.text.trim()) {
          return <div key={`blank-${paragraphIndex}`} className="h-6" />;
        }

        return (
          <p
            key={`paragraph-${paragraphIndex}`}
            className={cn(
              "whitespace-pre-wrap",
              paragraphClassName,
              // A reading makes every word a stack about fifty pixels tall:
              // without a line to match, the pinyin of one line ends up sitting
              // on the characters of the line before it.
              showReadings && "leading-[3.6rem]",
            )}
          >
            {paragraph.words.map((word, wordIndex) => {
              const key = `${paragraphIndex}:${wordIndex}`;

              if (!word.isWordLike || !word.text.trim()) {
                return <span key={key}>{word.text}</span>;
              }

              const selected = isReaderSelected(selection, key);

              const pickableWord = (
                <span
                  title="Tap to pick this word"
                  onClick={() => {
                    onSelectionChange(
                      toggleReaderSelection(selection, {
                        key,
                        text: word.text,
                        order: paragraphIndex * 10000 + wordIndex,
                      }),
                    );
                  }}
                  className={cn(
                    "rounded transition cursor-pointer",
                    showReadings && "px-1 text-xl lg:text-2xl leading-tight",
                    selected
                      ? "bg-rose-500/20 text-rose-400"
                      : "hover:text-rose-400",
                  )}
                >
                  {/* Each character carries its own learned state; latin
                      letters have none, so they stay plain text. */}
                  {Array.from(word.text).map((character, characterIndex) =>
                    isHanCharacter(character) ? (
                      <ReaderCharacter
                        key={`${key}-${characterIndex}`}
                        character={character}
                        maps={characterMaps}
                      />
                    ) : (
                      <span key={`${key}-${characterIndex}`}>{character}</span>
                    ),
                  )}
                </span>
              );

              if (showReadings) {
                return (
                  <span
                    key={key}
                    className="inline-flex flex-col items-center align-top mx-[1px]"
                  >
                    {/* Snug against the character, with just enough air for
                        the tone marks. */}
                    <span className="text-xs text-gray-400 dark:text-gray-600 leading-none h-4 mb-[3px] whitespace-nowrap">
                      {readings.get(word.text) || ""}
                    </span>

                    {pickableWord}
                  </span>
                );
              }

              // Without readings the words simply sit next to each other, with
              // a gap between two of them so the segmentation still shows.
              const previousWord = paragraph.words[wordIndex - 1];
              const needsSpace =
                !!previousWord?.isWordLike && !!previousWord.text.trim();

              return (
                <Fragment key={key}>
                  {needsSpace ? " " : null}

                  {pickableWord}
                </Fragment>
              );
            })}
          </p>
        );
      })}
    </div>
  );
};
