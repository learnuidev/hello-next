"use client";

import Link from "next/link";

import { formatJournalDate } from "@/app/(auth)/diary/utils/format-journal-date";
import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import { NoResultView } from "./no-result-view";

export function SearchHistoryResult() {
  const { data: groups } = useListLearnedCharactersByDate({
    variant: "search",
  });

  const filteredSearchResults = groups?.map((group) => group.items)?.flat();

  if (!filteredSearchResults?.length) {
    return <NoResultView />;
  }

  return (
    <>
      <section className="space-y-8 mt-12 pb-32">
        {filteredSearchResults?.map((comp, idx: any) => {
          const hanziOrInput = comp?.input || comp?.hanzi;

          return (
            <Link
              key={`${comp?.input}-${idx}`}
              href={`/nmm/${comp?.input}${comp?.lang ? `lang?=${comp?.lang}` : ""}`}
              target="_blank"
              className="block"
            >
              <div className="flex flex-col items-start w-full justify-between">
                <h1 className="font-light text-lg sm:text-2xl text-gray-400">
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
