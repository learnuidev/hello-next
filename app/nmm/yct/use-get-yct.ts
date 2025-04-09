"use client";

import { useListComponents } from "@/domain/lesson/component.queries";

import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

import { useListPublishedContentsQuery } from "@/app/(auth)/convos/[content-id]/hooks/use-list-published-contents-query";
import { useSearchQueryStore } from "@/components/search/state";
import { filterNonHanYu } from "../nmm-utils/filter-non-hanyu";
import { yctWords } from "./yct-words";

export const useGetYct = ({
  variant,
  selectedBelt,
}: {
  variant?: "core" | "needs_review" | "all";
  selectedBelt: any;
}) => {
  const viewType = useSearchQueryStore((state) => state.type);

  const { data: components } = useListComponents({ includeAll: true });

  const { data: hskWords } = useListHSKWordsQuery();

  const { data: contentItems } = useListPublishedContentsQuery({});

  const contents = contentItems?.items;

  let characters = [] as any;
  let words = yctWords?.filter(
    (item) => item?.level === selectedBelt?.hskLevel
  ) as any;

  let sentences = [] as any;

  if (viewType === "sentence") {
    sentences = contents
      ?.map((content: any) => content?.transcriptions)
      ?.flat()
      ?.filter((content: any) => {
        const containsWord = words?.filter((word: any) =>
          content?.input?.includes(word?.hanzi)
        );

        return content?.input && containsWord?.length > 0;
      })
      ?.map((content: any) => {
        return {
          ...content,
          hanzi: content?.input,
        };
      })
      ?.flat()
      ?.sort((a: any, b: any) => a?.hanzi?.length - b?.hanzi?.length);
  }

  if (viewType === "character") {
    characters = [
      ...new Set(
        words
          .map((x: any) => x.hanzi)
          .join()
          .split("")
      ),
    ]
      .filter((val: any) => filterNonHanYu(val))
      .map((id) => {
        return {
          hanzi: id,
          lang: "zh",
        };
      });
  }

  return {
    data: {
      characters,
      words,
      sentences,
    },
    isLoading: false,
  };
};
