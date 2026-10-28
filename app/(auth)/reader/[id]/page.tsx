"use client";

import { Nothing } from "@/app/nmm/nothing";
import { useReadModeState } from "@/components/read-mode-button";
import { FloatingNavbar } from "@/components/floating-navbar";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { ReaderDynocloze } from "../components/reader-dynocloze";
import { ReaderDock } from "../components/reader-dock";
import { ReaderDisplayMenu } from "../components/reader-display-menu";
import { ReaderFocusedRead } from "../components/reader-focused-read";
import { ReaderMiniDictionary } from "../components/reader-mini-dictionary";
import { ReaderSideDock } from "../components/reader-side-dock";
import { ReaderSegmentedText } from "../components/reader-segmented-text";
import { ReaderInsights } from "../components/reader-insights";
import { AddReaderText } from "../components/add-reader-text";
import { useHasMounted } from "../hooks/use-has-mounted";
import { useReaderStore } from "../hooks/use-reader-store";
import { useReaderInteractionsStore } from "../hooks/use-reader-interactions";
import { useReaderInteractionsSync } from "../hooks/use-reader-interactions-sync";
import { useGetReaderItemQuery } from "@/domain/reader/use-get-reader-item";
import {
  ReaderSnippetLine,
  ReaderViewMode,
  defaultReaderViewMode,
  getReaderViewHref,
  isReaderViewMode,
} from "../reader.types";
import { countReaderCharacters } from "../utils/count-reader-characters";
import { detectReaderLang } from "../utils/detect-reader-lang";
import {
  findReaderLineAtOffset,
  findReaderLineAtWord,
} from "../utils/find-reader-line";
import { formatReaderCueTime } from "../utils/format-reader-cue-time";
import { formatReaderDate } from "../utils/format-reader-date";
import { getReaderLineTimestamps } from "../utils/get-reader-line-timestamps";
import {
  ReaderSelection,
  joinReaderSelection,
} from "../utils/reader-selection";

export default function ReaderText() {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const hasMounted = useHasMounted();

  const { data: item, isLoading: itemLoading } = useGetReaderItemQuery(id);

  // Hydrate the lookups/bookmarks ledger from the server and push local changes
  // back as they happen.
  useReaderInteractionsSync();

  const setReadingPosition = useReaderStore(
    (state) => state.setReadingPosition,
  );

  const toggleInteractionBookmark = useReaderInteractionsStore(
    (state) => state.toggleBookmark,
  );

  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  // The tab lives in the url: `/reader/:id` is focused read, `?view=insights`
  // the insights, and so on. Nothing else remembers which one is showing.
  const searchParams = useSearchParams();
  const viewParam = searchParams?.get("view");
  const viewMode: ReaderViewMode = isReaderViewMode(viewParam)
    ? viewParam
    : defaultReaderViewMode;

  // A link into a particular line of the text says so in the url. It is read
  // once, applied, and then taken off the url again (below) so that stepping
  // through the text is not undone by switching views and back.
  const sentenceIndexParam = searchParams?.get("sentenceIndex");
  const initialSentenceIndex = useMemo(() => {
    if (sentenceIndexParam == null) {
      return undefined;
    }

    const parsed = Number(sentenceIndexParam);

    return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
  }, [sentenceIndexParam]);

  const { readMode } = useReadModeState();

  const [selection, setSelection] = useState<ReaderSelection[]>([]);
  const [savedNotice, setSavedNotice] = useState(false);
  /**
   * The word tapped in the read view, and the line it was tapped in.
   *
   * The read view has no dictionary of its own — a tap there picks a word for
   * the reading list — so the word it picks is handed to the same mini
   * dictionary the other views use, which is where the meaning and the bookmark
   * live. The line is worked out from where the word sits in the text, so a word
   * saved out of the read view carries its place like any other.
   */
  const [readTap, setReadTap] = useState<{
    word: string;
    line: ReaderSnippetLine | null;
  } | null>(null);

  // The read view's plain text, for the one thing that needs to look at the page
  // rather than at the text: where a highlight starts.
  const readTextRef = useRef<HTMLParagraphElement | null>(null);

  // A pick belongs to the line it was made on: moving to another view (or
  // another text) starts from a clean selection, and the dictionary closes with
  // it — it is open on a word of the view that is going away.
  useEffect(() => {
    setSelection([]);
    setReadTap(null);
  }, [id, viewMode]);

  // The "saved" confirmation takes itself away.
  useEffect(() => {
    if (!savedNotice) {
      return;
    }

    const timeout = setTimeout(() => setSavedNotice(false), 4000);

    return () => clearTimeout(timeout);
  }, [savedNotice]);

  /**
   * A link that says which sentence to open on: remember it as the reader's
   * place in the text, then take it off the url. Left on, it would pull the
   * reader back to that line every time the focused view remounted.
   */
  useEffect(() => {
    if (!item || sentenceIndexParam == null) {
      return;
    }

    if (typeof initialSentenceIndex === "number") {
      setReadingPosition(item.id, initialSentenceIndex);
    }

    router.replace(getReaderViewHref(item.id, viewMode), { scroll: false });
  }, [
    item,
    sentenceIndexParam,
    initialSentenceIndex,
    router,
    viewMode,
    setReadingPosition,
  ]);

  const lang = useMemo(() => detectReaderLang(item?.text || ""), [item?.text]);

  /**
   * When each line of a subtitle text is said, in the order the reading views
   * step through them. Empty for every other kind of text — and for a subtitle
   * text whose lines have been edited since, since a time that belongs to a
   * line that is no longer there is worse than no time at all.
   */
  const lineTimestamps = useMemo(
    () =>
      getReaderLineTimestamps({
        text: item?.text || "",
        cueStarts: item?.cueStarts,
        lang,
      }),
    [item?.text, item?.cueStarts, lang],
  );

  /**
   * Files a piece of the text into the bookmarks, with the line it came out of
   * when the view knows it: a word is worth coming back to on the page it was
   * said on, not floating loose.
   */
  const saveSnippet = (text: string, line?: ReaderSnippetLine) => {
    if (!item || !text.trim()) {
      return;
    }

    toggleInteractionBookmark({
      readerItemId: item.id,
      readerItemTitle: item.title,
      kind: "reader",
      type: "word",
      text,
      sentence: line?.line || "",
      lineIndex: line?.lineIndex ?? null,
      lang,
    });

    setSavedNotice(true);
  };

  /**
   * The line a picked word sits in, as the read view counts it.
   *
   * A pick in the read view is only a word: which line of the text it was in is
   * worked out from where it sits — the paragraph it is in, and which word of
   * that paragraph it is — and comes back as the line focused read steps
   * through, so a word saved out of either view opens on the same line.
   */
  const lineOfPick = (picked: ReaderSelection) => {
    if (!item) {
      return undefined;
    }

    const [paragraphIndex, wordIndex] = picked.key.split(":").map(Number);

    return (
      findReaderLineAtWord({
        text: item.text,
        lang,
        paragraphIndex,
        wordIndex,
      }) ?? undefined
    );
  };

  /**
   * The line a highlighted piece of the read view starts in.
   *
   * With read mode off the text is one run of characters rather than words, so
   * there is no word to count and no tap to read: the highlight itself says
   * where it starts, and that character offset is what finds the line — the same
   * line, counted the same way, as a word tapped with read mode on.
   */
  const lineOfHighlight = () => {
    const paragraph = readTextRef.current;
    const selection = window.getSelection();
    const range = selection?.rangeCount ? selection.getRangeAt(0) : null;

    // Only a highlight inside the text counts: a reader who dragged from the
    // title down has given us a start we cannot place.
    if (!item || !paragraph || !range || !paragraph.contains(range.startContainer)) {
      return null;
    }

    const offset =
      range.startContainer.nodeType === Node.TEXT_NODE
        ? range.startOffset
        : Array.from(range.startContainer.childNodes)
            .slice(0, range.startOffset)
            .reduce((total, node) => total + (node.textContent?.length || 0), 0);

    return findReaderLineAtOffset({ text: item.text, lang, offset });
  };

  const saveSelection = () => {
    // A pick is saved where it begins: with a single word picked that is plainly
    // the line it was picked in, and with several it is the line the first of
    // them was picked in — which is where the snippet starts in the text.
    const first = [...selection].sort(
      (first, second) => first.order - second.order,
    )[0];

    saveSnippet(
      joinReaderSelection(selection, lang),
      first ? lineOfPick(first) : undefined,
    );
    setSelection([]);
  };

  if (!hasMounted) {
    return (
      <main>
        <div className="max-w-3xl m-auto px-4 md:px-12 mt-16" />
      </main>
    );
  }

  // The editor takes over the whole page, the same way the add flow does on the
  // library page.
  if (isEditing && item) {
    return (
      <main>
        <AddReaderText
          initialItem={item}
          onClose={() => {
            setIsEditing(false);
          }}
        />
        <FloatingNavbar />
      </main>
    );
  }

  if (itemLoading) {
    return (
      <main>
        <div className="max-w-3xl m-auto px-4 md:px-12 mt-16">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Loading…
          </p>
        </div>
      </main>
    );
  }

  if (!item) {
    return (
      <main>
        <div className="max-w-3xl m-auto px-4 md:px-12">
          <Nothing icon={Icons.bookOpen} message="This text is not here">
            <Link
              href="/reader"
              className="mt-6 inline-block uppercase text-xs tracking-wider text-gray-400 border-[1px] border-gray-300 dark:border-gray-800 px-4 py-2 hover:text-rose-400 dark:hover:text-white transition"
            >
              <Icons.back className="mr-2 text-xs" />
              <span>Back to reader</span>
            </Link>
          </Nothing>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Reading stays at a comfortable measure; the insights view is the one
          that wants the whole width, the way a lesson's analytics does. */}
      <div
        className={cn(
          "m-auto px-4 md:px-12",
          viewMode === "insights"
            ? "w-full max-w-screen-2xl lg:px-20"
            : "max-w-3xl",
        )}
      >
        {/* The working views get out of the way: focused read is only the line
            you are on, and dynocloze and the insights are their own screens —
            the title and the saved-at line belong to the reading view. The way
            back to the library is in the bar at the bottom. */}
        {viewMode !== "focused" && (
          <div className="mt-12 flex justify-between items-center">
            <Link
              href="/reader"
              className="uppercase text-xs tracking-wider text-gray-400 hover:text-rose-400 dark:hover:text-white transition"
            >
              <Icons.back className="mr-2 text-xs" />
              <span>Reader</span>
            </Link>

            <div className="flex items-center gap-4 sm:gap-6">
              {/* On a phone the switches live here, in a menu that opens
                  upwards, rather than in the floating dock against the right
                  edge — which stays where it is on the wide screen. */}
              <ReaderDisplayMenu />

              <button
                onClick={() => {
                  setIsEditing(true);
                }}
                title="Edit this text"
                className="uppercase text-xs tracking-wider text-gray-400 hover:text-rose-400 dark:hover:text-white transition"
              >
                <Icons.edit className="mr-2 text-xs" />
                <span>Edit</span>
              </button>

              {readMode && (
                <p className="uppercase text-[11px] tracking-wider text-gray-500">
                  Read mode
                </p>
              )}
            </div>
          </div>
        )}

        {viewMode !== "focused" &&
          viewMode !== "dynocloze" &&
          viewMode !== "insights" && (
            <>
              <h1 className="text-3xl font-bold mt-10">{item.title}</h1>

              <p className="text-xs text-gray-500 font-light mt-3 uppercase tracking-wider">
                <span>{formatReaderDate(item.createdAt)}</span>
                <span> · </span>
                <span>{countReaderCharacters(item.text)} characters</span>
              </p>

              {item.sourceUrl && (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Open the original article: ${item.sourceUrl}`}
                  className="inline-flex items-center gap-2 mt-4 text-xs uppercase tracking-wider text-gray-400 hover:text-rose-400 transition"
                >
                  <Icons.externalLink className="text-sm" />
                  <span>View original article</span>
                </a>
              )}

              {/* Where a url says where the text came from, a subtitle text says
                  what it was cut from and how much of it there is: the file, its
                  lines, and how long they run. The original file is kept by the
                  API, and this is the way back to it. */}
              {!!item.cueStarts?.length && (
                <p className="mt-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-gray-400">
                  <Icons.upload className="text-sm" />
                  {item.subtitleFileName && (
                    <span className="max-w-full break-all normal-case">
                      {item.subtitleFileName}
                    </span>
                  )}
                  <span>·</span>
                  <span className="tabular-nums">
                    {item.cueStarts.length} subtitles
                  </span>
                  {typeof item.cueEnds?.[item.cueEnds.length - 1] ===
                    "number" && (
                    <>
                      <span>·</span>
                      <span className="tabular-nums">
                        {formatReaderCueTime(
                          item.cueEnds[item.cueEnds.length - 1] as number,
                        )}
                      </span>
                      <span>long</span>
                    </>
                  )}
                  {item.subtitleFileUrl && (
                    <a
                      href={item.subtitleFileUrl}
                      title="Download the subtitle file this text was made from"
                      className="inline-flex items-center gap-1 text-gray-400 hover:text-rose-400 transition"
                    >
                      <Icons.externalLink className="text-sm" />
                      <span>Original file</span>
                      {typeof item.subtitleFileSize === "number" && (
                        <span className="tabular-nums">
                          · {Math.max(1, Math.round(item.subtitleFileSize / 1024))}{" "}
                          KB
                        </span>
                      )}
                    </a>
                  )}
                </p>
              )}
            </>
          )}

        {viewMode === "read" &&
          (readMode ? (
            <ReaderSegmentedText
              text={item.text}
              lang={lang}
              selection={selection}
              onSelectionChange={(nextSelection) => {
                // Which word the tap added — a tap on a word that was already
                // picked takes it off again, and then there is nothing to look
                // up.
                const picked = nextSelection.find(
                  (candidate) =>
                    !selection.some(
                      (selected) => selected.key === candidate.key,
                    ),
                );

                setSelection(nextSelection);

                if (!picked) {
                  return;
                }

                setReadTap({
                  word: picked.text,
                  line: lineOfPick(picked) ?? null,
                });
              }}
              className="mt-12 mb-32 text-lg font-extralight leading-9 text-gray-800 dark:text-gray-200"
            />
          ) : (
            <p
              ref={readTextRef}
              // Without read mode there are no segmented words to tap, so the
              // highlight is the way in — the same way it is in focused read.
              onMouseUp={() => {
                const highlighted = window.getSelection()?.toString().trim();

                if (highlighted) {
                  setReadTap({ word: highlighted, line: lineOfHighlight() });
                }
              }}
              className="mt-12 mb-32 whitespace-pre-wrap break-words text-lg font-extralight leading-9 text-gray-800 dark:text-gray-200"
            >
              {item.text}
            </p>
          ))}

        {viewMode === "dynocloze" && (
          <div className="mb-32">
            <ReaderDynocloze
              readerItemId={item.id}
              readerItemTitle={item.title}
              text={item.text}
              lang={lang}
            />
          </div>
        )}

        {viewMode === "focused" && (
          <div className="mb-32">
            <ReaderFocusedRead
              readerItemId={item.id}
              readerItemTitle={item.title}
              text={item.text}
              lang={lang}
              lineTimestamps={lineTimestamps}
              onSaved={() => {
                setSavedNotice(true);
              }}
              initialSentenceIndex={initialSentenceIndex}
            />
          </div>
        )}

        {viewMode === "insights" && (
          <ReaderInsights readerItemId={item.id} text={item.text} lang={lang} />
        )}
      </div>

      {/* Focused read has no header to put the switches in, so on a phone the
          same menu floats in the corner of the frame instead. */}
      {viewMode === "focused" && <ReaderDisplayMenu variant="floating" />}

      <ReaderSideDock
        showTranslate={viewMode === "focused" || viewMode === "dynocloze"}
      />

      {/* The read view's dictionary, on the word it picked. The other views keep
          their own, next to the line they are showing. */}
      {!!readTap && (
        <ReaderMiniDictionary
          readerItemId={item.id}
          readerItemTitle={item.title}
          text={item.text}
          lang={lang}
          selected={readTap.word}
          {...(readTap.line ? { line: readTap.line } : {})}
          onClose={() => {
            setReadTap(null);
          }}
          onGoToSentence={(sentenceIndex) => {
            // The read view is the whole text at once: a line is somewhere to go
            // to, and focused read is the view that goes to it.
            setReadingPosition(item.id, sentenceIndex);
            router.push(getReaderViewHref(item.id, "focused"));
          }}
        />
      )}

      <ReaderDock
        readerItemId={item.id}
        viewMode={viewMode}
        selectionCount={selection.length}
        onSaveSelection={saveSelection}
        onEdit={() => {
          setIsEditing(true);
        }}
      />

      {savedNotice && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-full px-6 py-3 text-xs shadow-2xl shadow-zinc-900">
          <Icons.bookmarkSolid className="text-rose-400 mr-2" />
          <span>Saved to your bookmarks</span>
          <Link
            href={`${getReaderViewHref(item.id, "insights")}&tab=bookmarks`}
            scroll={false}
            className="ml-6 uppercase tracking-wider text-gray-400 hover:text-rose-400 transition"
          >
            View
          </Link>
        </div>
      )}
    </main>
  );
}
