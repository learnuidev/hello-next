"use client";

import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { Icons } from "@/components/ui/icons.v2";
import { useListDiscoveryQuery } from "@/domain/sentence/use-list-discovery-query";
import { cn } from "@/lib/utils";
import { getNmmLink } from "@/libs/utils/get-nmm-link";
import Link from "next/link";
import { useMemo } from "react";

import { useReaderStore } from "../hooks/use-reader-store";
import { splitReaderSentences } from "../utils/split-reader-sentences";

/**
 * The reader's mini dictionary, the way the audiobook player has one: tap a
 * word in the text and this drops in under it with what the word means and
 * every place the text says it.
 *
 * The bookmark lives here rather than in the bar, because a word is what you
 * want to keep — saving it puts the word on the reading list, and the word's
 * own name is the way into nmm.
 */
export const ReaderMiniDictionary = ({
  readerItemId,
  readerItemTitle,
  text,
  lang,
  selected,
  onClose,
  onGoToSentence,
}: {
  readerItemId: string;
  readerItemTitle: string;
  text: string;
  lang: string;
  /** The word that was tapped. */
  selected: string;
  onClose: () => void;
  onGoToSentence: (sentenceIndex: number) => void;
}) => {
  const readingList = useReaderStore((state) => state.readingList);
  const saveToReadingList = useReaderStore((state) => state.saveToReadingList);
  const removeFromReadingList = useReaderStore(
    (state) => state.removeFromReadingList,
  );

  const showEn = useBrightModeStore((state) => state.showEn);
  const { showChinglish } = useChinglishState();

  const { data: meaning, isLoading } = useListDiscoveryQuery({
    content: selected,
    lang,
  });

  // Where in this text the word turns up again.
  const mentions = useMemo(
    () =>
      splitReaderSentences(text, lang)
        .map((sentence, index) => ({ sentence, index }))
        .filter(({ sentence }) => sentence.includes(selected)),
    [text, lang, selected],
  );

  const savedSnippet = (readingList || []).find(
    (snippet) =>
      snippet.text === selected && snippet.readerItemId === readerItemId,
  );

  const toggleBookmark = () => {
    if (savedSnippet) {
      removeFromReadingList(savedSnippet.id);
      return;
    }

    saveToReadingList({
      text: selected,
      readerItemId,
      readerItemTitle,
    });
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 sm:bottom-24 z-40 flex justify-center px-4">
      <div className="pointer-events-auto w-full max-w-xl bg-gray-50 dark:bg-[rgb(13,14,15)] rounded-xl p-4 sm:p-6 shadow-2xl shadow-zinc-900">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-baseline gap-4 flex-wrap">
            <h4 className="text-2xl font-bold">
              <Link
                href={getNmmLink({ id: selected, lang })}
                className="hover:text-rose-400 transition"
              >
                {selected}
              </Link>
            </h4>

            <button
              title={
                savedSnippet ? "Take off the reading list" : "Save to the reading list"
              }
              onClick={toggleBookmark}
              className={cn(
                "transition text-xl",
                savedSnippet
                  ? "text-rose-400"
                  : "text-gray-500 hover:text-rose-400",
              )}
            >
              {savedSnippet ? <Icons.bookmarkSolid /> : <Icons.bookmark />}
            </button>

            <span className="text-sm text-gray-500">
              <span className="font-semibold text-rose-500">
                {mentions.length}
              </span>{" "}
              {mentions.length === 1 ? "mention" : "mentions"}
            </span>
          </div>

          <button
            title="Close the dictionary"
            onClick={onClose}
            className="text-gray-500 hover:text-rose-400 transition"
          >
            <Icons.xMark className="text-xl" />
          </button>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500 font-extralight">
            {meaning?.pinyin || meaning?.roman || ""}
          </p>
          <p className="text-gray-700 dark:text-gray-300 font-light">
            {isLoading && !meaning ? "loading dictionary…" : meaning?.en}
          </p>

          {showChinglish && !!meaning?.chinglish && (
            <p className="mt-1 text-sm italic text-gray-500">
              {meaning.chinglish}
            </p>
          )}
        </div>

        <div className="mt-6 max-h-56 overflow-y-auto space-y-3">
          {mentions.map(({ sentence, index }) => (
            <button
              key={`${index}-${sentence}`}
              onClick={() => {
                onGoToSentence(index);
              }}
              className="block text-left text-gray-600 dark:text-gray-400 hover:text-rose-400 transition"
            >
              {highlightWord(sentence, selected)}
            </button>
          ))}

          {mentions.length === 0 && (
            <p className="text-sm text-gray-500">
              This word does not turn up anywhere else in the text.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

/** The mention, with the word itself picked out. */
const highlightWord = (sentence: string, word: string) => {
  const parts = sentence.split(word);

  return parts.map((part, index) => (
    <span key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 && (
        <span className="text-gray-900 dark:text-white font-semibold">
          {word}
        </span>
      )}
    </span>
  ));
};
