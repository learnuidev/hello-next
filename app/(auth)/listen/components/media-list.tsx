import { Icons } from "@/components/ui/icons.v2";
import { useListMediaQuery } from "../hooks/use-list-media-query";
import { ContentType } from "../listen.types";
import Link from "next/link";

function IconType({ type }: { type: ContentType }) {
  const className = "text-7xl mt-4";
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
    <section className="grid grid-cols-5 gap-4 mt-12">
      {data?.map((item) => {
        return (
          <Link
            href={`/listen/${item.id}`}
            key={item.id}
            className="h-40 p-4 rounded-xl bg-gray-800 relative block"
          >
            <div className="flex flex-col justify-between">
              <div className="flex justify-center items-center">
                <IconType type={item.type} />
              </div>
              <div className="truncate mt-6">
                <p className="">{item.text}</p>
              </div>
            </div>
          </Link>
        );
      })}{" "}
    </section>
  );
};
