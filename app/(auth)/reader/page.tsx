"use client";

import { FloatingNavbar } from "@/components/floating-navbar";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons.v2";
import { Nothing } from "@/app/nmm/nothing";
import { useMemo, useState } from "react";

import { AddReaderText } from "./components/add-reader-text";
import { ReaderListItem } from "./components/reader-list-item";
import {
  ReaderPagination,
  getReaderRangeLabel,
  readerPageCount,
} from "./components/reader-pagination";
import { ReaderSyncBanner } from "./components/reader-sync-banner";
import {
  READER_PAGE_SIZE,
  sortReaderItemsByCreatedAt,
} from "./hooks/use-reader-store";
import { useDeleteReaderItemMutation } from "@/domain/reader/use-delete-reader-item";
import { useListReaderItemsQuery } from "@/domain/reader/use-list-reader-items";

/**
 * The reader library: saved texts, newest first, ten at a time.
 *
 * The texts live on the server now, so the page lists them straight from the
 * reader API; search and paging are done in the browser over the fetched set.
 */
export default function Reader() {
  const { data, isLoading } = useListReaderItemsQuery({ limit: 200 });
  const deleteItem = useDeleteReaderItemMutation();

  const items = data?.items || [];

  const [isAdding, setIsAdding] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const sortedItems = useMemo(() => sortReaderItemsByCreatedAt(items), [items]);

  const filteredItems = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      return sortedItems;
    }

    return sortedItems.filter((item) =>
      `${item.title}\n${item.text}`.toLowerCase().includes(trimmedQuery),
    );
  }, [sortedItems, query]);

  const totalPages = readerPageCount(filteredItems.length, READER_PAGE_SIZE);
  // Searching shrinks the list; keep the visible page inside the new bounds
  // instead of needing an effect that resets it.
  const currentPage = Math.min(page, totalPages);

  const pageItems = filteredItems.slice(
    (currentPage - 1) * READER_PAGE_SIZE,
    currentPage * READER_PAGE_SIZE,
  );

  if (isAdding) {
    return (
      <main>
        <AddReaderText onClose={() => setIsAdding(false)} />
        <FloatingNavbar />
      </main>
    );
  }

  const hasSearch = query.trim().length > 0;
  const hasItems = items.length > 0;

  return (
    <main>
      <div className="max-w-3xl m-auto px-4 md:px-12">
        <div className="flex justify-between items-center mt-12">
          <h1 className="text-2xl font-bold text-gray-400">
            <span>Reader</span>
          </h1>

          <button
            onClick={() => {
              setIsAdding(true);
            }}
            title="Add a text"
            className="uppercase text-gray-400 border-[1px] px-4 py-2 border-gray-300 dark:border-gray-800 text-xs sm:text-sm hover:text-rose-400 dark:hover:text-white transition"
          >
            <Icons.plusIcon />
            <span> Add</span>
          </button>
        </div>

        <ReaderSyncBanner />

        <div className="relative w-full mt-8">
          <Icons.magnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search your texts…"
            className="pl-9 rounded-full bg-transparent font-extralight"
          />
        </div>

        {!isLoading && pageItems.length > 0 && (
          <p className="text-[11px] uppercase tracking-wider text-gray-500 mt-8">
            {getReaderRangeLabel({
              page: currentPage,
              pageSize: READER_PAGE_SIZE,
              totalItems: filteredItems.length,
            })}
          </p>
        )}

        {isLoading && (
          <p className="text-xs uppercase tracking-wider text-gray-500 mt-8">
            Loading your texts…
          </p>
        )}

        {!isLoading && (
          <section className="mt-8 space-y-10 mb-32">
            {pageItems.map((item) => (
              <ReaderListItem
                key={item.id}
                item={item}
                onDelete={(id) => {
                  deleteItem.mutate(id);
                }}
              />
            ))}
          </section>
        )}

        {!isLoading && pageItems.length === 0 && hasSearch && (
          <Nothing message={`No texts match "${query.trim()}"`}>
            <button
              onClick={() => {
                setQuery("");
                setPage(1);
              }}
              className="mt-6 uppercase text-xs tracking-wider text-gray-400 border-[1px] border-gray-300 dark:border-gray-800 px-4 py-2 hover:text-rose-400 dark:hover:text-white transition"
            >
              Clear search
            </button>
          </Nothing>
        )}

        {!isLoading && pageItems.length === 0 && !hasSearch && !hasItems && (
          <Nothing
            icon={Icons.bookOpen}
            message="Nothing saved yet"
            className="my-24"
          >
            <button
              onClick={() => {
                setIsAdding(true);
              }}
              className="mt-6 uppercase text-xs tracking-wider text-gray-400 border-[1px] border-gray-300 dark:border-gray-800 px-4 py-2 hover:text-rose-400 dark:hover:text-white transition"
            >
              <Icons.plusIcon />
              <span> Add your first text</span>
            </button>
          </Nothing>
        )}

        {!isLoading && (
          <ReaderPagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={(nextPage) => {
              setPage(nextPage);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </div>

      <FloatingNavbar />
    </main>
  );
}
