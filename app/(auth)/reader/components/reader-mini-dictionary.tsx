"use client";

import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { Icons } from "@/components/ui/icons.v2";
import { useListDiscoveryQuery } from "@/domain/sentence/use-list-discovery-query";
import { cn } from "@/lib/utils";
import { getNmmLink } from "@/libs/utils/get-nmm-link";
import Link from "next/link";
import { useEffect, useMemo } from "react";

import { usePanelDrag } from "../hooks/use-panel-drag";
import { useReaderInteractionsStore } from "../hooks/use-reader-interactions";
import { ReaderSnippetLine } from "../reader.types";
import { highlightReaderWord } from "../utils/highlight-reader-word";
import { splitReaderSentences } from "../utils/split-reader-sentences";

/**
 * The reader's mini dictionary, the way the audiobook player has one: tap a
 * word in the text and this drops in under it with what the word means and
 * every place the text says it.
 *
 * The bookmark lives here rather than in the bar, because a word is what you
 * want to keep — saving it puts the word on the reading list, and the word's
 * own name is the way into nmm.
 *
 * It sits at the bottom of the screen by default, and the header is a handle:
 * the panel can be dragged anywhere it is less in the way, which matters when
 * the word being looked up is the one hidden under it. Drag it near an edge and
 * it stops there rather than off the screen, and a double tap on the header puts
 * it back at the bottom.
 */
export const ReaderMiniDictionary = ({
  readerItemId,
  readerItemTitle,
  text,
  lang,
  selected,
  line,
  kind,
  onClose,
  onGoToSentence,
}: {
  readerItemId: string;
  readerItemTitle: string;
  text: string;
  lang: string;
  /** The word that was tapped. */
  selected: string;
  /**
   * The line the word was tapped in. Saved with the word, so the reading list
   * can say where it came from instead of leaving it as a word with no place.
   */
  line?: ReaderSnippetLine;
  /** What the snippet points back at; a reader text by default. */
  kind?: "reader" | "convo";
  onClose: () => void;
  onGoToSentence: (sentenceIndex: number) => void;
}) => {
  // The dictionary floats over the text, so it has to be possible to move it
  // out of the way of the very word it is describing.
  const { panelRef, handleProps, style, isDragging, hasPlacement } =
    usePanelDrag();

  const recordLookup = useReaderInteractionsStore(
    (state) => state.recordLookup,
  );
  const toggleInteractionBookmark = useReaderInteractionsStore(
    (state) => state.toggleBookmark,
  );
  const interactions = useReaderInteractionsStore((state) => state.interactions);

  const interactionKind = kind || "reader";
  const contextSentence = line?.line || "";
  const interactionKey = [
    readerItemId,
    interactionKind,
    "word",
    selected,
    contextSentence,
  ].join("::");
  const lookupCount = interactions[interactionKey]?.lookupCount || 0;
  const isBookmarked = !!interactions[interactionKey]?.bookmarked;

  // Opening the dictionary is itself a lookup: count it so the insights tab can
  // say how many times this word was asked about.
  useEffect(() => {
    if (!selected.trim()) {
      return;
    }

    recordLookup({
      readerItemId,
      readerItemTitle,
      kind: interactionKind,
      type: "word",
      text: selected,
      sentence: contextSentence,
      lineIndex: line?.lineIndex ?? null,
      lang,
    });
  }, [
    readerItemId,
    readerItemTitle,
    interactionKind,
    lang,
    selected,
    contextSentence,
    line?.lineIndex,
    recordLookup,
  ]);

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

  /**
   * The bookmark is the bookmark of this word on this line: the same word kept
   * out of another line is another entry. It lives in the interactions ledger,
   * which is what the insights tab reads and what syncs to the account.
   */
  const toggleBookmark = () => {
    toggleInteractionBookmark({
      readerItemId,
      readerItemTitle,
      kind: interactionKind,
      type: "word",
      text: selected,
      sentence: contextSentence,
      lineIndex: line?.lineIndex ?? null,
      lang,
    });
  };

  return (
    <div
      ref={panelRef}
      style={style}
      className={cn(
        "fixed z-40 max-w-xl rounded-xl bg-gray-50 p-4 shadow-2xl shadow-zinc-900 dark:bg-[rgb(13,14,15)] sm:p-6",
        // Until it is moved the panel keeps the place the layout gives it:
        // centred and clear of the dock at the bottom of the screen.
        hasPlacement
          ? "z-50"
          : "inset-x-4 bottom-20 mx-auto sm:bottom-24",
        isDragging && "select-none",
      )}
    >
      <div
        {...handleProps}
        title="Drag to move the dictionary · double tap to put it back"
        className={cn(
          "flex touch-none select-none justify-between items-start gap-4",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
      >
        <div className="flex items-baseline gap-4 flex-wrap">
          <Icons.gripVertical className="shrink-0 self-center text-gray-400" />

          <h4 className="text-2xl font-bold">
            <Link
              href={getNmmLink({ id: selected, lang })}
              className="hover:text-rose-400 transition"
            >
              {selected}
            </Link>
          </h4>

          <button
            title={isBookmarked ? "Take off your bookmarks" : "Bookmark this word"}
            onClick={toggleBookmark}
            className={cn(
              "transition text-xl",
              isBookmarked
                ? "text-rose-400"
                : "text-gray-500 hover:text-rose-400",
            )}
          >
            {isBookmarked ? <Icons.bookmarkSolid /> : <Icons.bookmark />}
          </button>

          <span className="text-sm text-gray-500">
            <span className="font-semibold text-rose-500">
              {mentions.length}
            </span>{" "}
            {mentions.length === 1 ? "mention" : "mentions"}
          </span>

          <span className="text-sm text-gray-500">
            looked up{" "}
            <span className="font-semibold text-rose-500">{lookupCount}</span>×
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
            {highlightReaderWord(sentence, selected)}
          </button>
        ))}

        {mentions.length === 0 && (
          <p className="text-sm text-gray-500">
            This word does not turn up anywhere else in the text.
          </p>
        )}
      </div>
    </div>
  );
};
