"use client";

import { FloatingNavbar } from "@/components/floating-navbar";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons.v2";
import { Nothing } from "@/app/nmm/nothing";
import { useMemo, useState } from "react";

import { AddReaderText } from "./components/add-reader-text";
import { ReaderListItem } from "./components/reader-list-item";
import { ReaderSyncBanner } from "./components/reader-sync-banner";
import { ReaderBookmarksSyncBanner } from "./components/reader-bookmarks-sync-banner";
import { sortReaderItemsByCreatedAt } from "./hooks/use-reader-store";
import { useDeleteReaderItemMutation } from "@/domain/reader/use-delete-reader-item";
import { useInfiniteListReaderItemsQuery } from "@/domain/reader/use-list-reader-items";

/**
 * The reader library: saved texts, newest first.
 *
 * The texts live on the server, so the page loads one cursor page at a time and
 * grows the list with a "Load more" button; search filters what has been loaded
 * so far.
 */
export default function Reader() {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteListReaderItemsQuery({ limit: 20 });
  const deleteItem = useDeleteReaderItemMutation();

  const items = useMemo(
    () => (data?.pages || []).flatMap((page) => page.items),
    [data],
  );

  const [isAdding, setIsAdding] = useState(false);
  const [query, setQuery] = useState("");

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

        <ReaderBookmarksSyncBanner />

        <div className="relative w-full mt-8">
          <Icons.magnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            placeholder="Search your texts…"
            className="pl-9 rounded-full bg-transparent font-extralight"
          />
        </div>

        {!isLoading && filteredItems.length > 0 && (
          <p className="text-[11px] uppercase tracking-wider text-gray-500 mt-8">
            <span>{filteredItems.length}</span>
            <span> {filteredItems.length === 1 ? "text" : "texts"}</span>
          </p>
        )}

        {isLoading && (
          <p className="text-xs uppercase tracking-wider text-gray-500 mt-8">
            Loading your texts…
          </p>
        )}

        {!isLoading && (
          <section className="mt-8 space-y-10 mb-16">
            {filteredItems.map((item) => (
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

        {!isLoading && hasNextPage && (
          <div className="flex justify-center mb-32">
            <button
              disabled={isFetchingNextPage}
              onClick={() => {
                fetchNextPage();
              }}
              className="uppercase text-xs tracking-wider text-gray-400 border-[1px] border-gray-300 dark:border-gray-800 px-6 py-3 hover:text-rose-400 dark:hover:text-white transition disabled:opacity-50"
            >
              {isFetchingNextPage ? (
                <Icons.spinner className="mr-2 animate-spin" />
              ) : (
                <Icons.plusIcon className="mr-2" />
              )}
              {isFetchingNextPage ? "Loading…" : "Load more"}
            </button>
          </div>
        )}

        {!isLoading && filteredItems.length === 0 && hasSearch && (
          <Nothing message={`No texts match "${query.trim()}"`}>
            <button
              onClick={() => {
                setQuery("");
              }}
              className="mt-6 uppercase text-xs tracking-wider text-gray-400 border-[1px] border-gray-300 dark:border-gray-800 px-4 py-2 hover:text-rose-400 dark:hover:text-white transition"
            >
              Clear search
            </button>
          </Nothing>
        )}

        {!isLoading && filteredItems.length === 0 && !hasSearch && !hasItems && (
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
      </div>

      <FloatingNavbar />
    </main>
  );
}
