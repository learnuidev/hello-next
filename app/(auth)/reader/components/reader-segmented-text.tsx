"use client";

import { cn } from "@/lib/utils";
import { Fragment } from "react";

import {
  ReaderSelection,
  isReaderSelected,
  toggleReaderSelection,
} from "../utils/reader-selection";
import { segmentReaderWords } from "../utils/segment-reader-text";

/**
 * The read mode view: the text with every word segmented out on its own
 * (`Intl.Segmenter`, no API) instead of a solid run of characters.
 *
 * The words are tappable too, which is how a piece of the text gets picked for
 * the reading list. Punctuation is left exactly where it was.
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
  return (
    <div className={className}>
      {text.split(/\r?\n/).map((paragraph, paragraphIndex) => {
        if (!paragraph.trim()) {
          return <div key={`blank-${paragraphIndex}`} className="h-6" />;
        }

        const words = segmentReaderWords(paragraph, lang);

        return (
          <p
            key={`paragraph-${paragraphIndex}`}
            className={cn("whitespace-pre-wrap", paragraphClassName)}
          >
            {words.map((word, wordIndex) => {
              const key = `${paragraphIndex}:${wordIndex}`;

              if (!word.isWordLike || !word.text.trim()) {
                return <span key={key}>{word.text}</span>;
              }

              const selected = isReaderSelected(selection, key);

              // The gap that makes a segmented string out of a solid run of
              // characters. It goes *between* two words only, so punctuation
              // and any spacing the text already had stay where they were.
              const previousWord = words[wordIndex - 1];
              const needsSpace =
                !!previousWord?.isWordLike && !!previousWord.text.trim();

              return (
                <Fragment key={key}>
                  {needsSpace ? " " : null}

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
                      selected
                        ? "bg-rose-500/20 text-rose-400"
                        : "hover:text-rose-400",
                    )}
                  >
                    {word.text}
                  </span>
                </Fragment>
              );
            })}
          </p>
        );
      })}
    </div>
  );
};
