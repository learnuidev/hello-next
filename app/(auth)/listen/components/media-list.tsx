/* eslint-disable @next/next/no-img-element */
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useListBooksQuery } from "../[media-id]/hooks/use-list-books-query";
import { useListMediaQuery } from "../hooks/use-list-media-query";
import { ContentType } from "../listen.types";
import { SearchMedia } from "./search-media";

function BooksList() {
  const { data } = useListBooksQuery();

  if (!data?.items || data?.items?.length === 0) {
    return null;
  }
  return (
    <div className="max-w-6xl mx-auto mb-20">
      <h2 className="text-2xl">Your Books List</h2>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-y-12 gap-x-6 mt-12">
        {data?.items?.map((item) => {
          return (
            <Link
              href={`/listen/books/${item.id}`}
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
                  {item?.chapters?.length} chapters
                </p>
              </div>
            </Link>
          );
        })}{" "}
      </section>

      {/* <div>{JSON.stringify(data?.items?.[0], null, 4)}</div> */}
    </div>
  );
}

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

function ContentList() {
  const { data } = useListMediaQuery();

  if (!data || data?.length === 0) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl">Your Reading List</h2>
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-y-12 gap-x-6 mt-12">
        {data?.map((item) => {
          return (
            <Link
              href={`/listen/${item.id}`}
              key={item.id}
              className="h-64 px-8 py-4 rounded-xl bg-gray-50 dark:bg-[rgb(21,22,23)] relative block"
            >
              <div className="flex justify-between items-center text-gray-500">
                <div></div>

                <p>{item?.lang || "n/a"}</p>
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex justify-center items-center">
                  <IconType type={item.type} />
                </div>
                <div className="truncate mt-6 text-center overflow-hidden">
                  <p className="text-xl">{item.text}</p>
                </div>

                <p className="text-center text-gray-500 mt-4">
                  {item?.text?.length} chars
                </p>
              </div>
            </Link>
          );
        })}{" "}
      </section>
    </div>
  );
}

export const MediaList = () => {
  const { data } = useListMediaQuery();

  if (data?.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col">
        <Icons.signalSlash className="text-5xl mt-32" />

        <p className="mt-8 text-gray-400 font-light">Nothing found.</p>
        <p className="text-gray-500">
          {" "}
          Try adjusting your filter or add new media.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-32">
      <SearchMedia />

      <BooksList />
      <ContentList />
    </div>
  );
};
