"use client";

import { filterComponents } from "@/app/nmm/utils";
import { useSearchQueryStore } from "@/components/search/state";
import { useListHistoryQuery } from "@/domain/history/history.queries";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
import { getDate, getMonth, getYear } from "date-fns";
import Link from "next/link";
import { groupBy } from "ramda";
import { useState } from "react";

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

  return (
    <div className="mx-8">
      <article className="grid grid-cols-[320px_1fr]">
        <div className="ml-6 w-full">
          <aside className="fixed">
            <div className="flex flex-col w-32 items-center space-y-4 my-16">
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

        <section className="w-full">
          <div>
            <h1 className="font-extralight text-gray-400">
              {selectedGroup?.title}
            </h1>

            <div className="flex flex-wrap flex-row w-full">
              {selectedGroup?.items?.map((item: any) => {
                return (
                  <Link
                    className="py-4 pr-4 text-2xl font-light"
                    href={
                      item?.lang
                        ? `/nmm/${item?.input || item?.hanzi}?lang=${item?.lang}`
                        : `/nmm/${item?.input || item?.hanzi}`
                    }
                    key={item?.id}
                  >
                    {item?.input || item?.hanzi?.trim("")}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};
