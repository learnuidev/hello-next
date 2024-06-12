"use client";

import { filterComponents } from "@/app/nmm/utils";
import { useSearchQueryStore } from "@/components/search/state";
import { useListHistoryQuery } from "@/domain/history/history.queries";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";

import { getDate, getMonth, getYear } from "date-fns";
import Link from "next/link";
import { groupBy } from "ramda";

export function useListLearnedCharactersByDate({
  variant,
}: {
  variant: "all" | "search" | "click" | "discovered";
}): {
  isLoading: boolean;
  data: {
    title: string;
    items: any;
  }[];
} {
  const { data: learnedCharacters, ...rest } = useListCharactersQuery();
  const queryStr = useSearchQueryStore((state) => state.query);

  const { data: components } = useListComponents({
    includeAll: true,
  });

  const { data } = useListHistoryQuery();

  const getResolvedChars = () => {
    switch (variant) {
      case "all":
        return [...(learnedCharacters || []), ...(data?.Items || [])];
      case "search":
        return (
          data?.Items?.filter((event: any) => event?.eventType === "SEARCH") ||
          []
        );
      case "click":
        return (
          data?.Items?.filter(
            (event: any) => event?.eventType === "CONTENT_VIEWED"
          ) || []
        );

      default:
        return [...(learnedCharacters || [])];
    }
  };

  const resolvedChars = getResolvedChars();

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
