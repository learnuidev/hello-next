"use client";

import { filterComponents } from "@/app/nmm/utils";
import { useSearchQueryStore } from "@/components/search/state";
import { useListHistoryQuery } from "@/domain/history/history.queries";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
import { cn } from "@/lib/utils";
import { getDate, getMonth, getYear } from "date-fns";
import Link from "next/link";
import { groupBy } from "ramda";
import { useState } from "react";
import { useTimelineState } from "./timeline.state";
import { PreviewComponent } from "@/app/nmm/preview-component";

function useListLearnedCharactersByDate({
  variant,
}: {
  variant: "all" | "timeline" | "discovered";
}) {
  const { data: learnedCharacters, ...rest } = useListCharactersQuery();
  const queryStr = useSearchQueryStore((state) => state.query);

  const { data: components } = useListComponents({
    includeAll: true,
  });

  const { data } = useListHistoryQuery();

  const resolvedChars =
    variant === "all"
      ? [...(learnedCharacters || []), ...(data?.Items || [])]
      : variant === "timeline"
        ? [...(data?.Items || [])]
        : [...(learnedCharacters || [])];

  const learnedCharactersFormatted = resolvedChars
    ?.map((item: any) => {
      const createdAt = new Date(item?.createdAt);
      const date = getDate(createdAt);
      const month = getMonth(createdAt) + 1;
      const year = getYear(createdAt);

      return {
        ...item,
        // date: date,
        date: `${date}/${month}/${year}`,
      };
    })
    ?.sort((a: any, b: any) => b?.createdAt - a?.createdAt);

  const groupByDate = groupBy((item: any) => item?.date);

  const grouped =
    learnedCharactersFormatted &&
    Object.entries(groupByDate(learnedCharactersFormatted) || {})
      .map(([date, items]) => {
        const filteredComponents = filterComponents(
          items,
          queryStr,
          components
        );

        if (!filteredComponents?.length) {
          return null;
        }
        return {
          title: date,
          items: filteredComponents,
        };
      })
      .filter(Boolean);

  return {
    data: grouped,
    ...rest,
  };
}

export const TimelineTabBodyV2 = ({
  variant,
}: {
  variant: "all" | "timeline" | "discovered";
}) => {
  // const [focusLang, setFocusLang] = useState("");

  const focusLang = useTimelineState((state: any) => state.focusLang);
  const setFocusLang = useTimelineState((state: any) => state.setFocusLang);

  const { data: groups, isLoading: isLearnedCharactersLoading } =
    useListLearnedCharactersByDate({ variant });

  const dates = groups?.map((group) => group?.title);

  const firstGroup = groups?.[0];

  const [selectedDateState, setSelectedDate] = useState(dates?.[0]);

  const selectedDate = selectedDateState || firstGroup?.title;

  const selectedGroup =
    groups?.find((group) => group?.title === selectedDate) || firstGroup;

  if (isLearnedCharactersLoading) {
    return <div className="text-center my-16"> Loading ...</div>;
  }

  const langs = [
    // @ts-ignore
    ...new Set(selectedGroup?.items?.map((item: any) => item?.lang)),
  ]?.filter(Boolean);

  return (
    <div className="mx-8">
      <article className="grid grid-cols-[320px_1fr]">
        <div className="ml-6 w-full">
          <aside className="fixed">
            <div className="flex flex-col w-32 items-center space-y-4 my-24">
              {groups?.map((date) => {
                return (
                  <div
                    role="button"
                    onClick={() => {
                      setSelectedDate(date?.title);
                    }}
                    key={date?.title}
                    className={`${
                      selectedDate === date?.title
                        ? "font-normal"
                        : "text-gray-600"
                    }
                  font-extralight flex justify-between w-full items-center`}
                  >
                    <span className="block"> {date?.title} </span>
                    <span className="block text-xs px-2 font-bold">
                      ({date?.items?.length})
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>

        <section
          className="w-full"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setFocusLang("");
            }
          }}
        >
          <div className="mt-[-70px] ml-4 flex gap-4 mb-16">
            {langs?.map((lang) => {
              return (
                <button
                  className={cn(
                    focusLang
                      ? focusLang === lang
                        ? "text-white"
                        : "text-gray-500"
                      : "text-gray-300",
                    "transition text-xl font-extralight hover:scale-125"
                  )}
                  onClick={() => {
                    setFocusLang((prevLang: string) => {
                      if (prevLang) {
                        if (prevLang === lang) {
                          return "";
                        }
                        return lang;
                      } else {
                        return lang;
                      }
                    });
                  }}
                  key={lang}
                >
                  {lang}
                </button>
              );
            })}
          </div>
          <div>
            {/* <h1 className="font-extralight text-gray-400">
              {selectedGroup?.title}
            </h1> */}

            <div className="flex flex-wrap flex-row w-full">
              {selectedGroup?.items?.map((item: any, idx: any) => {
                return (
                  <TooltipProvider
                    key={`${item?.input || item?.hanzi?.trim("")}-chars-${idx}`}
                  >
                    <Tooltip>
                      <TooltipTrigger className="p-3 px-0 hover:scale-110 transition">
                        <Link
                          href={`/nmm/${item?.input || item?.hanzi?.trim("")}?lang=${item?.lang || "zh"}`}
                          className={cn(
                            `py-4 pr-8 font-light`,
                            `  dark:hover:text-white p-3 transition lowercase`,
                            focusLang
                              ? focusLang === item?.lang
                                ? "text-white text-2xl"
                                : "text-gray-700 text-2xl"
                              : "text-gray-300 text-2xl"
                          )}
                        >
                          {item?.input || item?.hanzi?.trim("")}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black border-gray-800">
                        <PreviewComponent component={item} />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};
