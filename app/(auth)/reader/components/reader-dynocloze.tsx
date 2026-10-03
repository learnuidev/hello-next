"use client";

import { getRandomWords } from "@/app/review/review-cloze/utils/get-random-words";
import { shuffleArray } from "@/app/review/review-cloze/utils/shuffle-array";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";

import { useListDiscoveryQuery } from "@/domain/sentence/use-list-discovery-query";
import { useReaderStore } from "../hooks/use-reader-store";
import { getReaderPinyin } from "../utils/get-reader-pinyin";
import {
  getReaderWords,
  segmentReaderWords,
} from "../utils/segment-reader-text";
import { splitReaderSentences } from "../utils/split-reader-sentences";
import { ReaderMiniDictionary } from "./reader-mini-dictionary";

type ReaderLearnMode = "timeline" | "stocastic";

interface ReaderClozeResponse {
  type: "correct" | "incorrect";
  answer: string;
}

/**
 * Dynocloze over a reader text — the same shell as the app's dynocloze (one
 * word blanked out, four options, arrows to move, a parent view to fall back
 * on), except every piece of it is computed in the browser: `Intl.Segmenter`
 * finds the words, other words of the same text become the wrong options, and
 * the pinyin is read with pinyin-pro. Nothing is fetched.
 */
export const ReaderDynocloze = ({
  readerItemId,
  readerItemTitle,
  text,
  lang,
}: {
  readerItemId: string;
  readerItemTitle: string;
  text: string;
  lang: string;
}) => {
  const sentences = useMemo(
    () => splitReaderSentences(text, lang),
    [text, lang],
  );

  // Focused read and dynocloze work through the same section of the text, so
  // they share the position: leave the text on sentence five in one and the
  // other opens on sentence five too.
  const readingPositions = useReaderStore((state) => state.readingPositions);
  const setReadingPosition = useReaderStore(
    (state) => state.setReadingPosition,
  );

  const [sentenceIndex, setSentenceIndex] = useState(
    readingPositions?.[readerItemId] || 0,
  );

  const lastSentenceIndex = Math.max(sentences.length - 1, 0);
  const currentSentenceIndex = Math.min(sentenceIndex, lastSentenceIndex);

  useEffect(() => {
    setReadingPosition(readerItemId, currentSentenceIndex);
  }, [readerItemId, currentSentenceIndex, setReadingPosition]);
  const [wordIndex, setWordIndex] = useState(0);
  const [response, setResponse] = useState<ReaderClozeResponse | null>(null);
  const [showParent, setShowParent] = useState(false);
  // The word the mini dictionary is open on — the same one the sentence marks.
  const [tappedWord, setTappedWord] = useState<string | null>(null);

  /** The highlight in the sentence is what the dictionary opens on. */
  const lookUpSelection = () => {
    const highlighted = window.getSelection()?.toString().trim();

    if (highlighted) {
      setTappedWord(highlighted);
    }
  };
  // The app's pinyin preference, shared with the rest of the reader (and with
  // the character grids elsewhere) rather than a switch of its own.
  const showPinyin = useBrightModeStore((state) => state.showPinyin);
  const setShowPinyin = useBrightModeStore((state) => state.setShowPinyin);
  const showEn = useBrightModeStore((state) => state.showEn);
  const { showChinglish } = useChinglishState();
  const [learnMode, setLearnMode] = useState<ReaderLearnMode>("timeline");

  const currentSentence = sentences[currentSentenceIndex] || "";

  const segments = useMemo(
    () => segmentReaderWords(currentSentence, lang),
    [currentSentence, lang],
  );

  // Only the words can be blanked out — punctuation and spacing cannot.
  const blankableWords = useMemo(
    () =>
      segments
        .map((segment, index) => ({ ...segment, index }))
        .filter((segment) => segment.isWordLike && !!segment.text.trim()),
    [segments],
  );

  const targetWord =
    blankableWords.length > 0
      ? blankableWords[wordIndex % blankableWords.length]
      : undefined;

  const answer = targetWord?.text || "";

  const sentenceWithBlank = useMemo(
    () =>
      segments
        .map((segment, index) =>
          index === targetWord?.index
            ? "__".repeat(segment.text.length)
            : segment.text,
        )
        .join(""),
    [segments, targetWord],
  );

  // The wrong options are other words of the same text, preferring ones of the
  // same length so the answer is not given away by its shape.
  const wordPool = useMemo(
    () =>
      Array.from(new Set(getReaderWords(text, lang))).filter(
        (word) => word !== answer,
      ),
    [text, lang, answer],
  );

  const options = useMemo<string[]>(() => {
    if (!answer) {
      return [];
    }

    const sameLength = wordPool.filter((word) => word.length === answer.length);
    const distractors = getRandomWords(
      sameLength.length >= 3 ? sameLength : wordPool,
      3,
    );

    return shuffleArray([answer, ...distractors]);
  }, [answer, wordPool]);

  const pinyin = useMemo(
    () => (showPinyin ? getReaderPinyin(currentSentence) : ""),
    [showPinyin, currentSentence],
  );

  // Same section, same question: the line on screen is what gets asked about,
  // as soon as it is the line on screen.
  const { data: translation } = useListDiscoveryQuery({
    content: currentSentence,
    lang,
  });

  const goToSentence = (nextIndex: number) => {
    setSentenceIndex(Math.max(0, Math.min(nextIndex, sentences.length - 1)));
    setWordIndex(0);
    setResponse(null);
  };

  const goToNextWord = () => {
    setResponse(null);

    if (blankableWords.length <= 1) {
      return;
    }

    if (learnMode === "stocastic") {
      setWordIndex(Math.floor(Math.random() * blankableWords.length));
      return;
    }

    setWordIndex((wordIndex + 1) % blankableWords.length);
  };

  if (!answer) {
    return (
      <div className="mt-16 text-center text-gray-500 font-extralight">
        <Icons.cloze className="text-4xl mb-3" />
        <p>There is nothing to cloze in this text yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <div className="flex justify-between items-center text-xs uppercase tracking-wider text-gray-500">
        <p>
          <span>Sentence </span>
          <span>{currentSentenceIndex + 1}</span>
          <span> / </span>
          <span>{sentences.length}</span>
        </p>

        <p>
          <span>Word </span>
          <span>{(wordIndex % blankableWords.length) + 1}</span>
          <span> / </span>
          <span>{blankableWords.length}</span>
        </p>
      </div>

      <div className="text-center mt-12">
        <p
          onMouseUp={lookUpSelection}
          className="text-2xl sm:text-3xl font-light leading-relaxed whitespace-pre-wrap"
        >
          {segments.map((segment, index) => {
            const blanked = index === targetWord?.index;

            if (!segment.isWordLike || !segment.text.trim()) {
              return (
                <span key={`segment-${index}`}>
                  {blanked ? "__".repeat(segment.text.length) : segment.text}
                </span>
              );
            }

            // Tapping a word here opens the same dictionary the reading view
            // has, on that word.
            const highlighted =
              !!tappedWord &&
              (tappedWord === segment.text ||
                tappedWord.includes(segment.text));

            return (
              <span
                key={`segment-${index}`}
                title="Tap to look this word up"
                onClick={() => {
                  // The highlight keeps precedence over the word clicked.
                  const highlighted = window.getSelection()?.toString().trim();

                  setTappedWord(highlighted || segment.text);
                }}
                className={cn(
                  "rounded transition cursor-pointer",
                  highlighted
                    ? "bg-rose-500/20 text-rose-400"
                    : "hover:text-rose-400",
                )}
              >
                {blanked ? "__".repeat(segment.text.length) : segment.text}
              </span>
            );
          })}
        </p>

        {showPinyin && !!pinyin && (
          <p className="mt-3 text-sm text-gray-500 font-extralight">{pinyin}</p>
        )}

        {(showEn || showChinglish) && !!translation && (
          <p
            className={cn(
              "mt-6 text-lg text-gray-600 dark:text-gray-400",
              showChinglish && translation.chinglish
                ? "font-light italic"
                : "font-light",
            )}
          >
            {showChinglish && translation.chinglish
              ? translation.chinglish
              : translation.en}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-12">
        {options.map((option) => {
          const isAnswer = option === answer;
          const isPicked = response?.answer === option;

          return (
            <button
              key={option}
              onClick={() => {
                setResponse({
                  type: isAnswer ? "correct" : "incorrect",
                  answer: option,
                });
              }}
              disabled={!!response}
              className={cn(
                "border-[2px] p-3 text-lg transition rounded",
                !response &&
                  "border-orange-400 hover:bg-orange-500 hover:text-white hover:scale-105",
                response &&
                  isPicked &&
                  (response.type === "correct"
                    ? "bg-green-500 border-green-600 text-white"
                    : "bg-red-500 border-red-500 text-white"),
                response &&
                  !isPicked &&
                  (isAnswer
                    ? "border-green-600 text-green-600"
                    : "border-gray-300 dark:border-gray-800 text-gray-500 opacity-60"),
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center items-center mt-12 gap-12 text-2xl">
        <button
          disabled={currentSentenceIndex === 0}
          onClick={() => {
            goToSentence(currentSentenceIndex - 1);
          }}
          className={
            currentSentenceIndex === 0 ? "text-gray-700" : "text-gray-400"
          }
        >
          <Icons.arrowLeft />
        </button>

        <button className="text-gray-400" onClick={goToNextWord}>
          <Icons.arrowDown />
        </button>

        <button
          disabled={currentSentenceIndex >= sentences.length - 1}
          onClick={() => {
            goToSentence(currentSentenceIndex + 1);
          }}
          className={
            currentSentenceIndex >= sentences.length - 1
              ? "text-gray-700"
              : "text-gray-400"
          }
        >
          <Icons.arrowRight />
        </button>
      </div>

      <div className="flex justify-center items-center mt-8 gap-8 text-xs uppercase tracking-wider text-gray-500">
        <button
          onClick={() => {
            setShowParent(!showParent);
          }}
        >
          {showParent ? "Hide parent" : "Show parent"}
        </button>

        <button
          onClick={() => {
            setShowPinyin(!showPinyin);
          }}
        >
          {showPinyin ? "Hide pinyin" : "Show pinyin"}
        </button>

        <button
          className="text-xl"
          title={
            learnMode === "timeline"
              ? "Timeline: words come in order"
              : "Shuffle: words come at random"
          }
          onClick={() => {
            setLearnMode(learnMode === "timeline" ? "stocastic" : "timeline");
            setWordIndex(0);
            setResponse(null);
          }}
        >
          {learnMode === "timeline" ? <Icons.timeline /> : <Icons.shuffle />}
        </button>
      </div>

      {!!tappedWord && (
        <ReaderMiniDictionary
          readerItemId={readerItemId}
          readerItemTitle={readerItemTitle}
          text={text}
          lang={lang}
          selected={tappedWord}
          onClose={() => {
            setTappedWord(null);
          }}
          onGoToSentence={(sentenceIndex) => {
            goToSentence(sentenceIndex);
          }}
        />
      )}

      {showParent && (
        <div className="text-center mt-12">
          <p className="text-sm leading-8">
            {sentences.map((sentence, index) => (
              <span
                key={`${sentence}-${index}`}
                onClick={() => {
                  goToSentence(index);
                }}
                className={cn(
                  "cursor-pointer transition mr-1",
                  index === currentSentenceIndex
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
