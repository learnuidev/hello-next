"use client";

import { CharacterItem } from "@/components/_select-character/character-item";
import { useReadModeState } from "@/components/read-mode-button";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { Fragment, useEffect, useMemo, useState } from "react";

import { useReaderStore } from "../hooks/use-reader-store";
import { useReaderTranslation } from "../hooks/use-reader-translate";
import { getReaderPinyin } from "../utils/get-reader-pinyin";
import { isHanCharacter } from "../utils/is-han-character";
import { ReaderMiniDictionary } from "./reader-mini-dictionary";
import { segmentReaderWords } from "../utils/segment-reader-text";
import { splitReaderSentences } from "../utils/split-reader-sentences";

/**
 * Focused read: one sentence at a time, big and centred, with the sentence
 * before and after it sitting quietly around it so the eye never has to hunt
 * for the next line.
 *
 * The words are the interactive part: tapping them picks them out (the same
 * selection read mode uses) and the bar below files the pick — or the whole
 * line — into the reading list. Left/right arrows step through the text.
 *
 * Read mode works here too: switched on, every word carries its reading.
 * "Show parent" drops the whole text in underneath with the line you are on
 * lit up, the way dynocloze does. Characters are drawn by the app's own
 * `CharacterItem`, so what you have learned wears its colour here as well, and
 * the line you stop on is remembered per text.
 */
export const ReaderFocusedRead = ({
  readerItemId,
  readerItemTitle,
  text,
  lang,
  onSaveSnippet,
}: {
  readerItemId: string;
  readerItemTitle: string;
  text: string;
  lang: string;
  onSaveSnippet: (text: string) => void;
}) => {
  const sentences = useMemo(
    () => splitReaderSentences(text, lang),
    [text, lang],
  );

  const readingPositions = useReaderStore((state) => state.readingPositions);
  const setReadingPosition = useReaderStore(
    (state) => state.setReadingPosition,
  );

  const { readMode } = useReadModeState();
  const showPinyin = useBrightModeStore((state) => state.showPinyin);
  const showEn = useBrightModeStore((state) => state.showEn);
  const { showChinglish } = useChinglishState();

  const [showParent, setShowParent] = useState(false);
  // The word the mini dictionary is open on.
  const [tappedWord, setTappedWord] = useState<{
    text: string;
    key: string;
  } | null>(null);

  /**
   * Whatever is highlighted in the line is what the dictionary opens on: a
   * word tapped, or a run of text dragged over with the mouse. The highlight
   * is the source of truth, so the dictionary can never be showing something
   * other than what is lit up.
   */
  const lookUpSelection = () => {
    const highlighted = window.getSelection()?.toString().trim();

    if (highlighted) {
      setTappedWord({ text: highlighted, key: "" });
    }
  };

  const lastIndex = Math.max(sentences.length - 1, 0);

  const [index, setIndex] = useState(readingPositions?.[readerItemId] || 0);
  const currentIndex = Math.min(index, lastIndex);

  const currentSentence = sentences[currentIndex] || "";
  const words = useMemo(
    () => segmentReaderWords(currentSentence, lang),
    [currentSentence, lang],
  );

  // Readings only mean something for a Chinese text, and they are their own
  // switch: read mode spaces the words out, pinyin hangs the reading off them.
  const showReadings = showPinyin && lang === "zh";

  const readings = useMemo(() => {
    const readingsByWord = new Map<string, string>();

    if (!showReadings) {
      return readingsByWord;
    }

    words.forEach((word) => {
      if (word.isWordLike && word.text.trim()) {
        readingsByWord.set(word.text, getReaderPinyin(word.text));
      }
    });

    return readingsByWord;
  }, [words, showReadings]);

  /**
   * The line on screen is taller than its text once the reader switches things
   * on: read mode spaces the words out, and a reading stacks a second line on
   * top of every one of them — a 14px reading over a 20–24px word, so a row is
   * a good forty pixels deep. A line-height meant for the words alone will not
   * hold that, and the rows end up crowding one another, which is why the
   * leading grows with both switches.
   *
   * The reading's leading is in `rem` rather than a ratio because the stack is
   * a fixed size while the text it sits in steps up a size at `sm`: a ratio
   * would give the large text the same air as the small and no more.
   */
  const lineSpacing = showReadings
    ? "leading-[3.6rem] sm:leading-[4.5rem]"
    : readMode
      ? "leading-loose"
      : "leading-relaxed";

  // The line on screen is published as it changes, but the server is asked
  // nothing until the Translate button is clicked — and the answer handed back
  // is this line's, never the last line's.
  const { translation } = useReaderTranslation({
    content: currentSentence,
    lang,
  });

  useEffect(() => {
    setReadingPosition(readerItemId, currentIndex);
  }, [readerItemId, currentIndex, setReadingPosition]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setIndex(Math.min(currentIndex + 1, lastIndex));
      }

      if (event.key === "ArrowLeft") {
        setIndex(Math.max(currentIndex - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, lastIndex]);

  if (!sentences.length) {
    return (
      <div className="mt-16 text-center text-gray-500 font-extralight">
        <p>This text has no sentences to read.</p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <p className="text-center text-xs uppercase tracking-wider text-gray-500">
        <span>{currentIndex + 1}</span>
        <span> / </span>
        <span>{sentences.length}</span>
      </p>

      <div className="h-[2px] w-full bg-gray-100 dark:bg-gray-900 mt-6">
        <div
          className="h-[2px] bg-rose-500/60 transition-all"
          style={{
            width: `${((currentIndex + 1) / sentences.length) * 100}%`,
          }}
        />
      </div>

      <div className="mt-20 text-center">
        <p className="text-lg font-extralight text-gray-600 dark:text-gray-700 min-h-[3rem]">
          {sentences[currentIndex - 1] || ""}
        </p>

        <p
          onMouseUp={lookUpSelection}
          className={cn(
            "my-16 text-2xl sm:text-4xl font-light",
            lineSpacing,
          )}
        >
          {words.map((word, wordIndex) => {
            const key = `${currentIndex}:${wordIndex}`;

            if (!word.isWordLike || !word.text.trim()) {
              return <span key={key}>{word.text}</span>;
            }

            // The highlight belongs to what the dictionary is open on, so
            // every word of it wears the mark — a tapped word, or every word
            // of a run of text that was dragged over.
            const selected =
              !!tappedWord &&
              (tappedWord.text === word.text ||
                tappedWord.text.includes(word.text));

            const pickableWord = (
              <span
                title="Tap to pick this word"
                onClick={() => {
                  // A highlight wins over the word under the pointer: clicking
                  // a run of text that is already lit up keeps the run, it
                  // does not shrink it to the word that was clicked.
                  const highlighted = window.getSelection()?.toString().trim();

                  setTappedWord(
                    highlighted ? { text: highlighted, key: "" } : { text: word.text, key },
                  );
                }}
                className={cn(
                  "rounded transition cursor-pointer",
                  // With a reading above it the word becomes a little ruby
                  // stack. The stack is sized to the glyph rather than to the
                  // line, which is what pulls the pinyin down onto the
                  // character: a line-height borrowed from the big paragraph
                  // around it would float the reading a good ten pixels away.
                  showReadings
                    ? "px-1 text-xl lg:text-2xl leading-tight"
                    : readMode
                      ? "px-1"
                      : "",
                  selected
                    ? "bg-rose-500/20 text-rose-400"
                    : "hover:text-rose-400",
                )}
              >
                {/* Each character carries its own learned state; latin letters
                    have none, so they stay plain text. */}
                {Array.from(word.text).map((character, characterIndex) =>
                  isHanCharacter(character) ? (
                    <CharacterItem
                      key={`${key}-${characterIndex}`}
                      character={character}
                    />
                  ) : (
                    <span key={`${key}-${characterIndex}`}>{character}</span>
                  ),
                )}
              </span>
            );

            if (!showReadings) {
              return <Fragment key={key}>{pickableWord}</Fragment>;
            }

            return (
              <span
                key={key}
                className="inline-flex flex-col items-center align-top"
              >
                {/* Snug against the character: the box is sized to the reading
                    rather than to the line, because `leading-none` text in a
                    taller box leaves all of its slack underneath — and that
                    slack, plus a margin on top of it, is what used to hold the
                    reading a good three pixels off the word. A little air stays
                    wanted, since tone marks are drawn above the x-height and
                    should not sit on the hanzi below.

                    And the reading is not a footnote: it is part of the line,
                    so it wears the same colour as the characters it hangs off
                    — black on white, white on black, the way the glyphs
                    themselves are drawn — rather than a grey that reads as
                    commentary on the word. */}
                <span className="text-xs text-black dark:text-white leading-none h-3.5 whitespace-nowrap">
                  {readings.get(word.text) || ""}
                </span>

                {pickableWord}
              </span>
            );
          })}
        </p>

        {(showEn || showChinglish) && !!translation && (
          <div className="mb-16 px-4">
            <p
              className={cn(
                "text-lg text-gray-600 dark:text-gray-400",
                showChinglish && translation.chinglish
                  ? "font-light italic"
                  : "font-light",
              )}
            >
              {showChinglish && translation.chinglish
                ? translation.chinglish
                : translation.en}
            </p>
          </div>
        )}

        <p className="text-lg font-extralight text-gray-600 dark:text-gray-700 min-h-[3rem]">
          {sentences[currentIndex + 1] || ""}
        </p>
      </div>

      <div className="flex justify-center items-center mt-20 gap-16 text-2xl">
        <button
          title="Previous line"
          disabled={currentIndex === 0}
          onClick={() => {
            setIndex(Math.max(currentIndex - 1, 0));
          }}
          className={currentIndex === 0 ? "text-gray-700" : "text-gray-400"}
        >
          <Icons.arrowLeft />
        </button>

        <button
          title="Next line"
          disabled={currentIndex >= lastIndex}
          onClick={() => {
            setIndex(Math.min(currentIndex + 1, lastIndex));
          }}
          className={currentIndex >= lastIndex ? "text-gray-700" : "text-gray-400"}
        >
          <Icons.arrowRight />
        </button>
      </div>

      <div className="flex justify-center items-center mt-10 gap-6 text-xs uppercase tracking-wider text-gray-500">
        <button
          className="hover:text-rose-400 transition"
          onClick={() => {
            onSaveSnippet(currentSentence);
          }}
        >
          <Icons.bookmark className="mr-2" />
          <span>Save this line</span>
        </button>

        <button
          className="hover:text-rose-400 transition"
          onClick={() => {
            setShowParent(!showParent);
          }}
        >
          {showParent ? "Hide parent" : "Show parent"}
        </button>

      </div>

      {!!tappedWord && (
        <ReaderMiniDictionary
          readerItemId={readerItemId}
          readerItemTitle={readerItemTitle}
          text={text}
          lang={lang}
          selected={tappedWord.text}
          onClose={() => {
            setTappedWord(null);
          }}
          onGoToSentence={(sentenceIndex) => {
            setIndex(sentenceIndex);
          }}
        />
      )}

      {showParent && (
        <div className="text-center mt-12">
          <p className="text-sm leading-8">
            {sentences.map((sentence, sentenceIndex) => (
              <span
                key={`${sentence}-${sentenceIndex}`}
                onClick={() => {
                  setIndex(sentenceIndex);
                }}
                className={cn(
                  "cursor-pointer transition mr-1",
                  sentenceIndex === currentIndex
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-400 dark:text-gray-700 hover:text-rose-400",
                )}
              >
                {sentence}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
};
