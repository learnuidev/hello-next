"use client";

import { filterComponents } from "@/app/nmm/utils";
import { useSearchQueryStore } from "@/components/search/state";
import { useListHistoryQuery } from "@/domain/history/history.queries";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
import { getDate, getMonth, getYear } from "date-fns";
import Link from "next/link";
import { groupBy } from "ramda";

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

export const TimelineTabBody = ({
  variant,
}: {
  variant: "all" | "timeline" | "discovered";
}) => {
  const { data: grouped, isLoading: isLearnedCharactersLoading } =
    useListLearnedCharactersByDate({ variant });

  if (isLearnedCharactersLoading) {
    return <div className="text-center my-16"> Loading ...</div>;
  }

  return (
    <div className="px-4 md:px-12 md:my-4">
      <div className="mt-8 space-y-4 text-gray-200">
        {grouped?.map((group: any) => {
          if (!group?.items?.length) {
            return null;
          }
          return (
            <div key={group?.title}>
              <h1 className="font-extralight text-gray-400">{group.title}</h1>

              <div className="flex flex-wrap">
                {group?.items?.map((item: any) => {
                  return (
                    <Link
                      className="py-4 pr-4 text-2xl font-light"
                      href={
                        item?.lang
                          ? `/nmm/${item?.hanzi}?lang=${item?.lang}`
                          : `/nmm/${item?.hanzi}`
                      }
                      key={item?.id}
                    >
                      {item?.hanzi}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/* <code>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </code> */}
    </div>
  );
};
