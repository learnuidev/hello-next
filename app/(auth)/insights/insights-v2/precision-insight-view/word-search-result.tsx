"use client";

import Link from "next/link";

import { getHumanPinyin } from "@/app/nmm/nmm-utils/get-human-pinyin";
import { useSearchQueryStore } from "@/components/search/state";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { cn } from "@/lib/utils";
import { getStatusIcon } from "./status-icons";
import { NoResultView } from "./no-result-view";

export function WordSearchResult() {
  const querySync = useSearchQueryStore((state) => state.query);
  const querySyncLowerCased = querySync?.toLowerCase();

  const { data: hskWords } = useListHSKWordsQuery();

  const filteredHsk = hskWords?.filter((item: any) => {
    const isHanzi = item?.hanzi?.includes(querySync);

    if (isHanzi) {
      return true;
    }

    const humanPinyin = getHumanPinyin(item);

    const isSearchByPinyin = humanPinyin?.includes(querySyncLowerCased);

    if (isSearchByPinyin) {
      return true;
    }

    return item?.en?.toLowerCase()?.includes(querySyncLowerCased);
  });

  if (!filteredHsk?.length) {
    return <NoResultView />;
  }

  const displayablefilteredHsk = filteredHsk?.slice(0, 100);

  return (
    <section className="space-y-12 mt-12 pb-32">
      {displayablefilteredHsk?.map((val: any, idx: any) => {
        const comp = val;

        const StatusIcon = getStatusIcon(comp?.status);

        if (comp?.hanzi?.length > 16) {
          return null;
        }

        return (
          <Link
            key={`${val}-${idx}`}
            href={`/nmm/${comp?.hanzi}?lang=${comp?.lang || "zh"}`}
            target="_blank"
            className="block"
          >
            <div className="flex items-start w-full justify-between flex-wrap truncate">
              <div>
                {comp?.pinyin?.length >= 8 && (
                  <p className="text-lg text-gray-400 truncate font-extralight">
                    {comp?.pinyin}
                  </p>
                )}

                <h1 className="truncate font-light">
                  <span
                    className={cn(
                      "truncate",
                      comp?.hanzi?.length > 8
                        ? "text-lg"
                        : "text-2xl sm:text-4xl"
                    )}
                  >
                    {comp?.hanzi}{" "}
                  </span>
                  {comp?.pinyin?.length < 8 && (
                    <span className="text-xl text-gray-400 truncate font-extralight">
                      {" "}
                      {comp?.pinyin}
                    </span>
                  )}
                </h1>
              </div>

              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger className="p-3 px-0 hover:scale-110 transition">
                    <span className="text-lg sm:text-2xl font-light text-gray-400">
                      {" "}
                      HSK {comp?.hskLevel}
                    </span>
                    {/* <StatusIcon.Icon className="text-lg sm:text-2xl" /> */}
                  </TooltipTrigger>
                  <TooltipContent className="bg-black border-gray-800 rounded-full">
                    <p>
                      <span className="text-xs"> {StatusIcon.title}</span>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex justify-between items-between">
              <p className="text-lg font-light truncate text-gray-500">
                {comp?.en?.split("/")?.slice(0, 2)?.join("; ")}
              </p>
              {comp?.status === "not_started" ? null : (
                <div className="flex justify-start text-gray-500 font-light space-x-2">
                  {!comp?.totalAttempts ? null : (
                    <div>
                      <span>{comp?.totalAttempts}</span>{" "}
                      {comp?.totalAttempts > 1 ? "attempts" : "attempt"}
                    </div>
                  )}
                  {comp?.totalIncorrect > 0 ? (
                    <div>
                      <span>{comp?.totalIncorrect}</span> incorrect
                    </div>
                  ) : (
                    comp?.totalCorrect > 0 && (
                      <div>
                        <span>{comp?.totalCorrect}</span> correct
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </section>
  );
}
