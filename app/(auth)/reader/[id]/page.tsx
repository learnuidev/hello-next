"use client";

import { Nothing } from "@/app/nmm/nothing";
import { useReadModeState } from "@/components/read-mode-button";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { ReaderDynocloze } from "../components/reader-dynocloze";
import { ReaderDock } from "../components/reader-dock";
import { ReaderFocusedRead } from "../components/reader-focused-read";
import { ReaderReadingList } from "../components/reader-reading-list";
import { ReaderSideDock } from "../components/reader-side-dock";
import { ReaderSegmentedText } from "../components/reader-segmented-text";
import { ReaderStats } from "../components/reader-stats";
import { useHasMounted } from "../hooks/use-has-mounted";
import { useReaderStore } from "../hooks/use-reader-store";
import {
  ReaderViewMode,
  defaultReaderViewMode,
  getReaderViewHref,
  isReaderViewMode,
} from "../reader.types";
import { countReaderWords } from "../utils/count-reader-words";
import { detectReaderLang } from "../utils/detect-reader-lang";
import { formatReaderDate } from "../utils/format-reader-date";
import {
  ReaderSelection,
  joinReaderSelection,
} from "../utils/reader-selection";

export default function ReaderText() {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  const hasMounted = useHasMounted();

  const items = useReaderStore((state) => state.items);
  const readingList = useReaderStore((state) => state.readingList);
  const saveToReadingList = useReaderStore((state) => state.saveToReadingList);
  const removeFromReadingList = useReaderStore(
    (state) => state.removeFromReadingList,
  );

  // The tab lives in the url: `/reader/:id` is focused read, `?view=insights`
  // the insights, and so on. Nothing else remembers which one is showing.
  const searchParams = useSearchParams();
  const viewParam = searchParams?.get("view");
  const viewMode: ReaderViewMode = isReaderViewMode(viewParam)
    ? viewParam
    : defaultReaderViewMode;

  const { readMode } = useReadModeState();

  const [selection, setSelection] = useState<ReaderSelection[]>([]);
  const [savedNotice, setSavedNotice] = useState(false);

  // A pick belongs to the line it was made on: moving to another view (or
  // another text) starts from a clean selection.
  useEffect(() => {
    setSelection([]);
  }, [id, viewMode]);

  // The "saved" confirmation takes itself away.
  useEffect(() => {
    if (!savedNotice) {
      return;
    }

    const timeout = setTimeout(() => setSavedNotice(false), 4000);

    return () => clearTimeout(timeout);
  }, [savedNotice]);

  const item = items.find((readerItem) => readerItem.id === id);

  const lang = useMemo(() => detectReaderLang(item?.text || ""), [item?.text]);

  const saveSnippet = (text: string) => {
    if (!item || !text.trim()) {
      return;
    }

    saveToReadingList({
      text,
      readerItemId: item.id,
      readerItemTitle: item.title,
    });

    setSavedNotice(true);
  };

  const saveSelection = () => {
    saveSnippet(joinReaderSelection(selection, lang));
    setSelection([]);
  };

  if (!hasMounted) {
    return (
      <main>
        <div className="max-w-3xl m-auto px-4 md:px-12 mt-16" />
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

            {readMode && (
              <p className="uppercase text-[11px] tracking-wider text-gray-500">
                Read mode
              </p>
            )}
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
                <span>{countReaderWords(item.text)} words</span>
              </p>
            </>
          )}

        {viewMode === "read" &&
          (readMode ? (
            <ReaderSegmentedText
              text={item.text}
              lang={lang}
              selection={selection}
              onSelectionChange={setSelection}
              className="mt-12 mb-32 text-lg font-extralight leading-9 text-gray-800 dark:text-gray-200"
            />
          ) : (
            <p className="mt-12 mb-32 whitespace-pre-wrap break-words text-lg font-extralight leading-9 text-gray-800 dark:text-gray-200">
              {item.text}
            </p>
          ))}

        {viewMode === "dynocloze" && (
          <div className="mb-32">
            <ReaderDynocloze
              readerItemId={item.id}
              text={item.text}
              lang={lang}
            />
          </div>
        )}

        {viewMode === "focused" && (
          <div className="mb-32">
            <ReaderFocusedRead
              readerItemId={item.id}
              text={item.text}
              lang={lang}
              selection={selection}
              onSelectionChange={setSelection}
              onSaveSnippet={saveSnippet}
            />
          </div>
        )}

        {viewMode === "insights" && (
          <ReaderStats key={item.id} text={item.text} lang={lang} />
        )}

        {viewMode === "reading-list" && (
          <ReaderReadingList
            snippets={readingList || []}
            onDelete={(snippetId) => {
              removeFromReadingList(snippetId);
            }}
          />
        )}
      </div>

      <ReaderSideDock
        showTranslate={viewMode === "focused" || viewMode === "dynocloze"}
      />

      <ReaderDock
        readerItemId={item.id}
        viewMode={viewMode}
        selectionCount={selection.length}
        onSaveSelection={saveSelection}
      />

      {savedNotice && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-full px-6 py-3 text-xs shadow-2xl shadow-zinc-900">
          <Icons.bookmarkSolid className="text-rose-400 mr-2" />
          <span>Saved to your reading list</span>
          <Link
            href={getReaderViewHref(item.id, "reading-list")}
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
