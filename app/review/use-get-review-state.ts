import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

export const useGetReviewState = ({
  date: customDate,
  year,
  month,
}: {
  date?: string;
  year?: number;
  month?: number;
}) => {
  const searchParams = useSearchParams();

  const { data: components } = useListCharactersQuery();

  const reviewId = searchParams.get("input") || "";
  const lang = searchParams.get("lang") || "";
  const date = customDate || searchParams.get("date") || "";

  const { data: groups, isLoading: isLearnedCharactersLoading } =
    useListLearnedCharactersByDate({ variant: "discovered" });

  const filteredGroups =
    year && month
      ? groups?.filter((group) => group?.year === year && group.month === month)
      : date
        ? groups?.filter((group) =>
            group?.items?.find((item: any) => item?.date === date)
          )
        : reviewId && lang
          ? groups?.filter((group) =>
              group?.items?.find((item: any) => {
                return [item?.hanzi, item?.input]?.includes(reviewId);

                return true;
              })
            )
          : groups;

  const groupItems = filteredGroups
    ?.map((group) => group.items)
    ?.flat()
    ?.filter((item) => {
      if (lang && item?.lang) {
        return JSON.stringify(item?.lang)?.includes(lang);
      }

      return true;
    });

  const getReviewCharactersKeys = (groupItems: any) =>
    groupItems
      ?.map((item: any) => item?.hanzi || item?.input)
      ?.filter((item: any) => {
        const comp = components?.find(
          (c: any) => (c?.hanzi || c?.input) === item
        );
        if (comp?.steps) {
          delete comp?.steps;
        }
        return comp;
      });

  const reviewCharactersKeys = getReviewCharactersKeys(groupItems);

  const totalItems = groupItems?.length || 0;

  const totalLangs = [...new Set(groupItems?.map((x) => x.lang))].filter(
    Boolean
  );

  const reviewCharacters = reviewCharactersKeys?.map((item: any) => {
    const comp = components?.find((c: any) => (c?.hanzi || c?.input) === item);
    if (comp?.steps) {
      delete comp?.steps;
    }
    return comp;
  });

  return {
    reviewCharacters,
    reviewCharactersKeys,
    totalLangs,
    groupItems,
    totalItems,
  };
};
