"use client";

import { useListComponents } from "@/domain/lesson/component.queries";

import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

import { useQuery } from "@tanstack/react-query";
import { useSearchQueryStore } from "@/components/search/state";
import { filterNonHanYu } from "../nmm-utils/filter-non-hanyu";
import { useListSpeakQuery } from "@/domain/hsk/use-list-speak-query";

export const useGetXiaoma = ({
  variant,
  selectedBelt,
}: {
  variant?: "core" | "needs_review" | "all";
  selectedBelt: any;
}) => {
  const viewType = useSearchQueryStore((state) => state.type);

  const { data: components } = useListComponents({ includeAll: true });

  const { data: hskWords } = useListHSKWordsQuery();

  const { data: course1 } = useListSpeakQuery();

  return useQuery<any, any, any>({
    // @ts-ignore
    queryKey: [
      "list-xiaoma-content",
      variant,
      selectedBelt?.hskLevel,
      selectedBelt?.maxCharacterLevel,
      selectedBelt?.minCharacterLevel,
      viewType,
      JSON.stringify(hskWords),
      JSON.stringify(course1),
    ],

    queryFn: async () => {
      let xiaomaSentences = [] as any;

      if (viewType === "sentence" || viewType === "word") {
        xiaomaSentences = course1?.lessons
          .map((lesson: any) => {
            return lesson?.lesson.map((value: any, index: any) => {
              const [t, hanzi, pinyin, lit, en] = value;
              return {
                level: index + 1,
                hanzi: hanzi[1],
                pinyin: pinyin[1],
                en: en[1],
                lit: lit[1],
              };
            });
          })
          .flat();
      }

      let xiaomaWords = [] as any;

      if (viewType === "word") {
        xiaomaWords = hskWords
          ?.filter((word: any) => {
            return JSON.stringify(xiaomaSentences)?.includes(word?.hanzi);
          })
          .filter((item: any) => {
            return item.hanzi?.split("").every((val: any) => {
              const selectedComp = components?.find(
                (component: any) => component?.hanzi === val
              );

              return selectedComp?.level <= selectedBelt?.maxCharacterLevel;
            });
          })
          ?.filter((prop: any, idx: any, coll: any) => {
            const qIdx = coll.findIndex((v: any) => v?.hanzi === prop?.hanzi);

            if (idx !== qIdx) {
              return false;
            }

            const selectedComp = components?.find(
              (component: any) => component?.hanzi === prop?.hanzi
            );

            const hskCharacter = hskWords?.find((word: any) =>
              JSON.stringify(word)?.includes(prop?.hanzi)
            );

            if (variant === "all") {
              return hskCharacter?.hskLevel <= selectedBelt?.hskLevel;
            }

            return hskCharacter?.hskLevel === selectedBelt?.hskLevel;
          });
      }

      let xiaomaCharacters = [] as any;

      if (viewType === "character") {
        xiaomaCharacters = [
          ...new Set(
            course1?.lessons
              .map((x: any) => x.lessons)
              .flat()
              .map((x: any) => x.id)
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
          })
          ?.filter((prop: any, idx: number) => {
            const selectedComp = components?.find(
              (component: any) => component?.hanzi === prop?.hanzi
            );

            const hskCharacter = hskWords?.find((word: any) =>
              JSON.stringify(word)?.includes(prop?.hanzi)
            );

            if (variant === "all") {
              return hskCharacter?.level <= selectedBelt?.hskLevel;
            }

            return hskCharacter?.level === selectedBelt?.hskLevel;
          });
      }

      return {
        xiaomaCharacters,
        xiaomaWords,
        xiaomaSentences,
      };
    },
    refetchOnWindowFocus: false,
    // refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
