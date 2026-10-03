"use client";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

import {
  ReaderSelection,
  isReaderSelected,
  toggleReaderSelection,
} from "../utils/reader-selection";
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
 */
export const ReaderFocusedRead = ({
  text,
  lang,
  selection,
  onSelectionChange,
  onSaveSnippet,
}: {
  text: string;
  lang: string;
  selection: ReaderSelection[];
  onSelectionChange: (selection: ReaderSelection[]) => void;
  onSaveSnippet: (text: string) => void;
}) => {
  const sentences = useMemo(
    () => splitReaderSentences(text, lang),
    [text, lang],
  );

  const [index, setIndex] = useState(0);
  const lastIndex = Math.max(sentences.length - 1, 0);
  const currentIndex = Math.min(index, lastIndex);

  const currentSentence = sentences[currentIndex] || "";
  const words = useMemo(
    () => segmentReaderWords(currentSentence, lang),
    [currentSentence, lang],
  );

  const selectedInLine = selection.filter((selected) =>
    selected.key.startsWith(`${currentIndex}:`),
  );

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

        <p className="my-16 text-2xl sm:text-4xl font-light leading-relaxed">
          {words.map((word, wordIndex) => {
            const key = `${currentIndex}:${wordIndex}`;

            if (!word.isWordLike || !word.text.trim()) {
              return <span key={key}>{word.text}</span>;
            }

            const selected = isReaderSelected(selection, key);

            return (
              <span
                key={key}
                title="Tap to pick this word"
                onClick={() => {
                  onSelectionChange(
                    toggleReaderSelection(selection, {
                      key,
                      text: word.text,
                      order: currentIndex * 10000 + wordIndex,
                    }),
                  );
                }}
                className={cn(
                  "rounded px-1 transition cursor-pointer",
                  selected
                    ? "bg-rose-500/20 text-rose-400"
                    : "hover:text-rose-400",
                )}
              >
                {word.text}
              </span>
            );
          })}
        </p>

        <p className="text-lg font-extralight text-gray-600 dark:text-gray-700 min-h-[3rem]">
          {sentences[currentIndex + 1] || ""}
        </p>
      </div>

      <div className="flex justify-center items-center mt-20 gap-16 text-2xl">
        <button
          disabled={currentIndex === 0}
          onClick={() => {
            setIndex(Math.max(currentIndex - 1, 0));
          }}
          className={
            currentIndex === 0 ? "text-gray-700" : "text-gray-400"
          }
        >
          <Icons.arrowLeft />
        </button>

        <button
          disabled={currentIndex >= lastIndex}
          onClick={() => {
            setIndex(Math.min(currentIndex + 1, lastIndex));
          }}
          className={
            currentIndex >= lastIndex ? "text-gray-700" : "text-gray-400"
          }
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

        {selectedInLine.length > 0 && (
          <button
            className="hover:text-rose-400 transition"
            onClick={() => {
              onSelectionChange(
                selection.filter(
                  (selected) => !selected.key.startsWith(`${currentIndex}:`),
                ),
              );
            }}
          >
            <Icons.xMark className="mr-2" />
            <span>Clear picks</span>
          </button>
        )}
      </div>

      <p className="text-center text-[11px] text-gray-600 dark:text-gray-700 mt-10">
        Tap words to pick them, then save them with the bookmark in the bar
        below · ← → to move between lines
      </p>
    </div>
  );
};
