"use client";

import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";

import { ReaderSnippet } from "../reader.types";
import { formatReaderDateShort } from "../utils/format-reader-date";

/**
 * The reading list: everything picked out of a text while reading it, newest
 * first, each one pointing back at the text it came from.
 */
export const ReaderReadingList = ({
  snippets,
  onDelete,
}: {
  snippets: ReaderSnippet[];
  onDelete: (id: string) => void;
}) => {
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
    <section className="mt-16 space-y-10 mb-32">
      <p className="text-[11px] uppercase tracking-wider text-gray-500">
        <span>{snippets.length}</span>
        <span> saved</span>
      </p>

      {snippets.map((snippet) => (
        <div key={snippet.id} className="group">
          <p className="text-lg font-extralight whitespace-pre-wrap">
            {snippet.text}
          </p>

          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500 font-light">
              <span>{formatReaderDateShort(snippet.createdAt)}</span>
              <span> · </span>
              <Link
                href={`/reader/${snippet.readerItemId}`}
                className="hover:text-rose-400 transition"
              >
                {snippet.readerItemTitle}
              </Link>
            </p>

            {/* Double click, matching how diary entries are removed. */}
            <button
              title="Double click to delete"
              onDoubleClick={() => {
                onDelete(snippet.id);
              }}
              className="text-gray-500 hover:text-rose-400 transition text-sm"
            >
              <Icons.trash />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};
