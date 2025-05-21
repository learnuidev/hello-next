"use client";

import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import { useMemo } from "react";
import { useRecentlyWatchedContent } from "../(auth)/convos/use-recently-watched-content-store";
import { isYoutube } from "../(auth)/convos/utils/is-youtube";

function ContentIcon({ content }: { content: any }) {
  if (isYoutube(content?.audio)) {
    return <Icons.youtube />;
  }

  return <Icons.music />;
}

const TEN = 10;

export function RecentlyViewedContent() {
  const { recentlyWatched, setRecentlyWatched } = useRecentlyWatchedContent();

  const topFiveRecentlyWatched = useMemo(
    () => recentlyWatched?.slice(0, TEN),
    [recentlyWatched]
  );

  return (
    <div className="sm:col-span-5  dark:bg-[rgb(11,12,13)] bg-gray-50 rounded-2xl p-4 lg:p-8">
      <h2 className="mb-6 text-xl dark:text-gray-500 font-bold underline">
        recently viewed content
      </h2>
      {topFiveRecentlyWatched?.length === 0 ? (
        <div>
          <h4>You havent watched any content </h4>

          <p>
            Click <Link href="/convos">here</Link> to get started
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 text-[16px]">
          {topFiveRecentlyWatched?.map((content: any) => {
            return (
              <Link
                onClick={() => {
                  setRecentlyWatched(content);
                }}
                key={content.id}
                href={`/convos/${content?.id}`}
              >
                <span className="mr-1">
                  <ContentIcon content={content} />{" "}
                </span>
                {content?.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
