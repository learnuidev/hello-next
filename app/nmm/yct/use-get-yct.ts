"use client";

import { filterNonHanYu } from "../utils";
import { useListComponents } from "@/domain/lesson/component.queries";

import { course1 } from "@/data/convos/bm1";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

import { useQuery } from "@tanstack/react-query";
import { useSearchQueryStore } from "@/components/search/state";
import { yctWords } from "./yct-words";
import { useListContentsQuery } from "@/domain/content/content.queries";

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

  const { data: contents } = useListContentsQuery();

  let characters = [] as any;
  let words = yctWords?.filter(
    (item) => item?.level === selectedBelt?.hskLevel
  ) as any;

  console.log("WORDS", words);
  let sentences = [] as any;

  if (viewType === "sentence") {
    sentences = contents
      ?.map((content: any) => content?.transcriptions)
      ?.flat()
      ?.filter((content: any) => {
        const containsWord = words?.filter((word: any) =>
          content?.input?.includes(word?.hanzi)
        );

        console.log("CONTAINS WORD", containsWord);

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

  console.log("SENTENCES", sentences);

  return {
    data: {
      characters,
      words,
      sentences,
    },
    isLoading: false,
  };
};
