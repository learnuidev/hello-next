"use client";

import Link from "next/link";

import { formatJournalDate } from "@/app/(auth)/diary/utils/format-journal-date";
import { formatLearnedDate } from "@/hooks/format-learned-date";
import { useGetCharacter } from "@/hooks/use-get-character";
import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import { isSameDay } from "date-fns";
import { NoResultView } from "./no-result-view";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useGetCharacterQuery } from "@/domain/character/use-get-character-query";

export function SearchHistoryResult({ query }: { query?: string }) {
  const { data: groups } = useListLearnedCharactersByDate({
    variant: "search",
    query,
    learnedToday: true,
  });

  const lang = useGetCurrentLang();

  const character = useGetCharacter({ characterId: query || "" });

  const { data: char } = useGetCharacterQuery({ hanzi: query || "" });

  const charaterCreatedAt = character?.createdAt || 0;

  const filteredSearchResults = groups?.map((group) => group.items)?.flat();

  const allHistory = [
    ...filteredSearchResults,
    ...(char?.searchContexts || []),
  ];

  if (!allHistory?.length) {
    return <NoResultView />;
  }

  const allHistoryIds = [
    ...new Set(allHistory.map((item) => item.hanzi || item.input)),
  ];

  return (
    <>
      <section className="space-y-8 mt-12 pb-32">
        {allHistoryIds?.map((_comp, idx: any) => {
          const comp = allHistory.find(
            (val) => (val?.input || val?.hanzi) === _comp,
          );
          const hanziOrInput = comp?.input || comp?.hanzi;

          const originalDiff = comp?.createdAt - charaterCreatedAt;

          const timeLearned = formatLearnedDate(Math.abs(originalDiff));

          return (
            <Link
              key={`${comp?.input}-${idx}`}
              href={`/nmm/${encodeURIComponent(comp?.input)}${`?lang=${comp?.lang || lang}`}`}
              className="block"
            >
              {character && isSameDay(charaterCreatedAt, comp?.createdAt) ? (
                <p className="font-extralight text-sm">
                  You searched for this query{" "}
                  <span className="font-bold"> {timeLearned} </span>{" "}
                  {originalDiff < 0 ? "before" : "after"} learning{" "}
                  <span className="font-bold">{character?.hanzi}</span>
                </p>
              ) : (
                ""
              )}
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
}
