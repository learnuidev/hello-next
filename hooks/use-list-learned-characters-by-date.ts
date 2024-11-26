"use client";

import { useSearchQueryStore } from "@/components/search/state";
import { useListHistoryQuery } from "@/domain/history/history.queries";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";

import { getDate, getMonth, getYear } from "date-fns";
import Link from "next/link";
import { groupBy } from "ramda";
import { useGetAuthUserProfileQuery } from "./user/use-get-auth-user-profile";
import { filterComponents } from "@/app/nmm/nmm-utils/filter-components";
import { getReviewDate } from "./get-review-date";
import { useListAttempts } from "@/app/(auth)/insights/insights-v2/use-list-attempts";

export function useListLearnedCharactersByDate({
  variant,
}: {
  variant: "all" | "search" | "click" | "discovered" | "reviewed";
}): {
  isLoading: boolean;
  data: {
    title: string;
    items: any;
    year: number;
    month: number;
  }[];
} {
  const { data: learnedCharacters, ...rest } = useListCharactersQuery();
  const queryStr = useSearchQueryStore((state) => state.query);

  const { data: components } = useListComponents({
    includeAll: true,
  });

  const totalAttempts = useListAttempts();

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
      case "reviewed":
        return totalAttempts;

      default:
        return [...(learnedCharacters || [])];
    }
  };

  const resolvedChars = getResolvedChars();

  const { data: authUserProfile } = useGetAuthUserProfileQuery();
  const userProfile = authUserProfile as any;
  const profileHistory = userProfile
    ? {
        ...userProfile,
        input: "Joined Mandarino",
        roman: "Joined",
        status: "joined",
        en: "Joined",
        score: 1,
        createdAt: userProfile?.createdAt,
      }
    : null;

  const learnedCharactersFormatted = [...resolvedChars, profileHistory]
    ?.filter(Boolean)
    ?.map((item: any) => {
      const { reviewDate, date, month, year } = getReviewDate(item);

      return {
        ...item,
        // date: date,
        date: reviewDate,
        day: date,
        month: month,
        year,
      };
    })
    ?.sort((a: any, b: any) => b?.createdAt - a?.createdAt);

  const groupByDate = groupBy((item: any) => item?.date);

  const grouped =
    learnedCharactersFormatted &&
    Object.entries(groupByDate(learnedCharactersFormatted) || {})
      .map(([date, items]) => {
        const filteredComponents = filterComponents({
          components: items,
          query: queryStr,
          characters: components,
        });

        if (!filteredComponents?.length) {
          return null;
        }
        return {
          title: date,
          year: getYear(new Date(date)),
          month: getMonth(new Date(date)) + 1,
          items: filteredComponents,
        };
      })
      .filter(Boolean);

  return {
    data: grouped,
    ...rest,
  } as any;
}
