"use client";

import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";
import { Input } from "@/components/ui/input";
import { getNmmLink } from "@/libs/utils/get-nmm-link";
import Link from "next/link";
import { useMemo, useState } from "react";

import { useReaderStore } from "../hooks/use-reader-store";
import {
  ReaderSnippet,
  getReaderViewHref,
} from "../reader.types";
import { formatReaderDateShort } from "../utils/format-reader-date";
import { highlightReaderWord } from "../utils/highlight-reader-word";

/**
 * The reading list: everything picked out of a text while reading it, newest
 * first, each one pointing back at where it came from.
 *
 * A word kept without its place is a word you have to go and find again, so
 * every entry carries the text it was saved out of, and — when it was saved out
 * of a single line — the line itself, which is also the way back to it: opening
 * it puts the reader on that line rather than at the top of the text.
 *
 * The list can be narrowed to one text, and searched: the word, the line it came
 * from and the text it is in are all things worth searching by.
 */
export const ReaderReadingList = ({
  snippets,
  onDelete,
}: {
  snippets: ReaderSnippet[];
  onDelete: (id: string) => void;
}) => {
  const setReadingPosition = useReaderStore(
    (state) => state.setReadingPosition,
  );

  const [query, setQuery] = useState("");
  const [contentId, setContentId] = useState("all");

  // The texts something was saved out of, in the order they first turn up.
  const contents = useMemo(() => {
    const byId = new Map<string, string>();

    snippets.forEach((snippet) => {
      if (!byId.has(snippet.readerItemId)) {
        byId.set(snippet.readerItemId, snippet.readerItemTitle);
      }
    });

    return [...byId].map(([id, title]) => ({ id, title }));
  }, [snippets]);

  const trimmedQuery = query.trim().toLowerCase();

  const visibleSnippets = useMemo(
    () =>
      snippets.filter((snippet) => {
        if (contentId !== "all" && snippet.readerItemId !== contentId) {
          return false;
        }

        if (!trimmedQuery) {
          return true;
        }

        return `${snippet.text}\n${snippet.line?.line || ""}\n${
          snippet.readerItemTitle
        }`
          .toLowerCase()
          .includes(trimmedQuery);
      }),
    [snippets, contentId, trimmedQuery],
  );

  /** Opening an entry puts the reader on the line it was saved from. */
  const openAtLine = (snippet: ReaderSnippet) => {
    if (snippet.line) {
      setReadingPosition(snippet.readerItemId, snippet.line.lineIndex);
    }
  };

  if (!snippets.length) {
    return (
      <Nothing
        icon={Icons.bookmark}
        message="Nothing on your reading list yet"
        className="my-24"
      >
        <p className="text-xs text-gray-500 mt-6 max-w-md mx-auto">
          While reading a text, tap the words you want to come back to and save
          them with the bookmark in the bar below.
        </p>
      </Nothing>
    );
  }

  return (
    <section className="mt-16 mb-32">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-[11px] uppercase tracking-wider text-gray-500">
          <span>{visibleSnippets.length}</span>
          <span> of </span>
          <span>{snippets.length}</span>
          <span> saved</span>
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {/* One text at a time: a reading list that has been going for a while
              is a list of several texts mixed together. */}
          <select
            value={contentId}
            onChange={(event) => {
              setContentId(event.target.value);
            }}
            title="Show the entries saved out of one text"
            className="rounded-full border-[1px] border-gray-300 dark:border-gray-800 bg-transparent px-3 py-2 text-xs uppercase tracking-wider text-gray-500 hover:text-rose-400 dark:hover:text-white transition"
          >
            <option
              value="all"
              className="bg-white text-gray-900 dark:bg-[rgb(9,10,11)] dark:text-white"
            >
              All texts
            </option>

            {contents.map((content) => (
              <option
                key={content.id}
                value={content.id}
                className="bg-white text-gray-900 dark:bg-[rgb(9,10,11)] dark:text-white"
              >
                {content.title}
              </option>
            ))}
          </select>

          <div className="relative w-full sm:w-64">
            <Icons.magnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              placeholder="Search the list…"
              className="pl-9 rounded-full bg-transparent font-extralight"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-10">
        {visibleSnippets.map((snippet) => (
          <div key={snippet.id} className="group">
            {/* The word itself is the way into nmm, the way it is everywhere
                else in the app. */}
            <Link
              href={getNmmLink({ id: snippet.text, lang: "zh" })}
              className="text-lg font-extralight whitespace-pre-wrap hover:text-rose-400 transition"
            >
              {snippet.text}
            </Link>

            {/* What it was saved from and where: the text, the line it is in,
                and the line itself with the saved word picked out of it.

                The whole of it is one link, and clicking any part of it —
                including the line number — opens that text in focused read on
                that line, which is the point of keeping the reference. */}
            <div className="flex justify-between items-start gap-4 mt-2">
              <Link
                href={getReaderViewHref(snippet.readerItemId, "focused")}
                onClick={() => {
                  openAtLine(snippet);
                }}
                title="Open this text in focused read, on this line"
                className="group block min-w-0"
              >
                <p className="text-xs text-gray-500 font-light transition group-hover:text-rose-400">
                  <span>{formatReaderDateShort(snippet.createdAt)}</span>
                  <span> · </span>
                  <span>{snippet.readerItemTitle}</span>

                  {snippet.line && (
                    <>
                      <span> · </span>
                      <span>line {snippet.line.lineIndex + 1}</span>
                    </>
                  )}
                </p>

                {/* The line is only worth repeating when it is not the snippet
                    itself — a saved line is its own place — and the word it was
                    saved as wears the reader's own mark inside it. */}
                {snippet.line && snippet.line.line !== snippet.text && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 font-light transition group-hover:text-rose-400">
                    {highlightReaderWord(
                      snippet.line.line,
                      snippet.text,
                      "rounded bg-rose-500/20 px-0.5 text-rose-400",
                    )}
                  </p>
                )}
              </Link>

              <button
                title="Take off the reading list"
                onClick={() => {
                  onDelete(snippet.id);
                }}
                className="text-gray-500 hover:text-rose-400 transition text-sm"
              >
                <Icons.trash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {!visibleSnippets.length && (
        <div className="mt-16 text-center text-gray-500 font-extralight">
          <p>Nothing on the reading list matches that.</p>

          <button
            onClick={() => {
              setQuery("");
              setContentId("all");
            }}
            className="mt-6 uppercase text-xs tracking-wider text-gray-400 border-[1px] border-gray-300 dark:border-gray-800 px-4 py-2 hover:text-rose-400 dark:hover:text-white transition"
          >
            Clear the search
          </button>
        </div>
      )}
    </section>
  );
};
