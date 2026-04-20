"use client";

import Link from "next/link";
import { groupBy } from "ramda";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { calculateCharacterStats, cn } from "@/lib/utils";
import { getStatusIcon } from "./status-icons";
import { NoResultView } from "./no-result-view";
import { formatPercentage } from "@/app/insights-overview/utils/format-percentage";
import { CharacterItem } from "@/components/_select-character/character-item";

export function CharacterSearchResult({
  searchResults,
  className,
  nothingClassName,
}: any) {
  const groupByHanzi = groupBy((val: any) => val.hanzi);
  const groupedByHanzi = groupByHanzi(searchResults) as any;

  if (!Object.entries(groupedByHanzi)?.length) {
    return <NoResultView className={nothingClassName} />;
  }

  return (
    <section className={cn("space-y-12 mt-12 pb-32", className)}>
      {Object.entries(groupedByHanzi)?.map(([k, val]: any, idx) => {
        const comp = val?.[0];

        const StatusIcon = getStatusIcon(comp?.status);

        if (comp?.hanzi?.length > 16) {
          return null;
        }

        const stats = calculateCharacterStats(comp);

        return (
          <Link
            key={`${val}-${idx}`}
            href={`/nmm/${encodeURIComponent(comp?.hanzi)}?lang=${comp?.lang || "zh"}`}
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
                        : "text-2xl sm:text-4xl",
                    )}
                  >
                    <CharacterItem
                      className={cn(
                        "truncate",
                        comp?.hanzi?.length > 8
                          ? "text-lg"
                          : "!text-2xl sm:!text-4xl",
                      )}
                      character={comp?.hanzi}
                    />
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
                  <TooltipTrigger className="p-1 px-0 hover:scale-110 transition">
                    <StatusIcon.Icon className="text-lg sm:text-2xl" />
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
                  <span> {stats?.totalTimeSpentFormatted}</span>
                  <div>
                    <span>{comp?.totalAttempts}</span> 尝试
                  </div>

                  {Number.isFinite(comp?.accuracy) && (
                    <span>{formatPercentage(comp?.accuracy || 0)}</span>
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
