"use client";

import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import { useListBooksQuery } from "../../listen/[media-id]/hooks/use-list-books-query";
import { ContentType } from "../../listen/listen.types";
import { useSearchQueryStore } from "@/components/search/state";
import { useMemo } from "react";

function IconType({ type }: { type: ContentType }) {
  const className = "dark:text-[rgb(41,42,43)] text-gray-400 text-7xl mt-4";
  if (type === "music") {
    return <Icons.music className={className} />;
  }

  if (type === "audiobook") {
    return <Icons.music className={className} />;
  }

  if (type === "podcast") {
    return <Icons.microphone className={className} />;
  }

  if (type === "text") {
    return <Icons.book className={className} />;
  }
}

export function BooksList() {
  const { data } = useListBooksQuery();

  const queryStr = useSearchQueryStore((state) => state.querySync);

  const filteredItems = useMemo(() => {
    return data?.items?.filter((item) => {
      if (!queryStr) {
        return true;
      }

      return JSON.stringify(item)
        ?.toLowerCase()
        ?.includes(queryStr?.toLowerCase());
    });
  }, [queryStr, data]);

  if (!data?.items || data?.items?.length === 0) {
    return null;
  }

  console.log("QUERY", queryStr);
  return (
    <div className="max-w-6xl mx-auto mb-20">
      <h2 className="text-2xl">Your Books List</h2>

      {filteredItems?.length === 0 ? (
        <div className="flex justify-center items-center my-32">
          <h1>Nothing found</h1>
        </div>
      ) : (
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-y-12 gap-x-6 mt-12">
          {filteredItems?.map((item) => {
            return (
              <Link
                href={`/books/${item.id}`}
                key={item.id}
                className="h-64 px-8 py-4 rounded-xl bg-gray-50 dark:bg-[rgb(21,22,23)] relative block"
              >
                <div className="flex justify-between items-center text-gray-500">
                  <div></div>

                  <p>{item?.lang || "n/a"}</p>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex justify-center items-center">
                    {item?.coverPhotoUrl ? (
                      <img
                        className="h-20"
                        alt="photo-preview"
                        src={item?.coverPhotoUrl}
                      />
                    ) : (
                      <IconType type={"text"} />
                    )}
                  </div>
                  <div className="truncate mt-6 text-center overflow-hidden">
                    <p className="text-xl">{item.title}</p>
                  </div>

                  <p className="text-center text-gray-500 mt-4">
                    {item?.sections?.length || 0} sections
                  </p>
                </div>
              </Link>
            );
          })}{" "}
        </section>
      )}
    </div>
  );
}
