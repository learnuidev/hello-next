import { Icons } from "@/components/ui/icons.v2";
import { useListMediaQuery } from "../hooks/use-list-media-query";
import { ContentType } from "../listen.types";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
      <div className="max-w-3xl mx-auto w-full pb-24 pt-12">
        <input
          placeholder="Search"
          className={cn(
            "font-extralight border-none dark:placeholder:text-gray-500 border-gray-100 focus:border-gray-300  dark:text-gray-300 placeholder:text-gray-600 border-2 focus:border-none px-2 rounded-full focus:outline-none active:outline-none py-2",
            "w-full px-4 bg-gray-100 dark:bg-[rgb(31,32,33)]"
          )}
        />
      </div>
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
    </div>
  );
};
