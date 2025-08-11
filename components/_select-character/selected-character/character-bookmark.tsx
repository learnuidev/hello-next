import { formatJournalDate } from "@/app/(auth)/diary/utils/format-journal-date";
import { NoResultView } from "@/app/(auth)/insights/insights-v2/precision-insight-view/no-result-view";

import { useListBookmarks } from "../hooks/use-list-bookmarks";
import Link from "next/link";

export const CharacterBookmark = ({
  characterId,
  lang,
}: {
  characterId: string;
  lang: string;
}) => {
  const filteredSearchResults = useListBookmarks(characterId);

  if (!filteredSearchResults?.length) {
    return <NoResultView />;
  }

  if (filteredSearchResults?.length === 0) {
    return null;
  }

  return (
    <>
      <section className="space-y-8 mt-12 pb-32">
        {filteredSearchResults?.map((comp, idx: any) => {
          const hanziOrInput = comp?.input || comp?.hanzi;

          return (
            <Link
              key={`${comp?.input}-${idx}`}
              href={`/nmm/${encodeURIComponent(hanziOrInput)}${`?lang=${comp?.lang || lang}`}`}
              className="block"
            >
              <div className="flex flex-col items-start w-full justify-between">
                <h1 className="font-light text-lg sm:text-2xl dark:text-gray-400">
                  {hanziOrInput}{" "}
                </h1>

                <p className="">
                  <span className="text-sm font-light text-gray-500">
                    {" "}
                    {formatJournalDate(comp?.createdAt)}
                  </span>
                </p>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
};
