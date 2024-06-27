"use client";

import { filterNonHanYu } from "../utils";
import { useListComponents } from "@/domain/lesson/component.queries";

import { useBeltStore } from "@/components/use-belt-store";

import { course1 } from "@/data/convos/bm1";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

import { useQuery } from "@tanstack/react-query";

export const useGetXiaoma = ({
  variant,
}: {
  variant?: "core" | "needs_review" | "all";
}) => {
  const selectedBelt = useBeltStore((x) => x?.selectedBelt);

  const { data: components } = useListComponents({ includeAll: true });

  const { data: hskWords } = useListHSKWordsQuery();

  return useQuery({
    // @ts-ignore
    queryKey: [
      "list-xiaoma-content",
      variant,
      selectedBelt,
      JSON.stringify(hskWords),
    ],

    queryFn: async () => {
      const xiaomaSentences = [
        ...new Set(
          course1?.lessons
            .map((x: any) => x.lessons)
            .flat()
            .map((x: any) => x.id)
        ),
      ]
        .filter((val: any) => filterNonHanYu(val))
        .filter((item: any) => {
          return item.split("").some((val: any) => {
            const selectedComp = components?.find(
              (component: any) => component?.hanzi === val
            );

            const hskCharacter = hskWords?.find((word: any) =>
              JSON.stringify(word?.hanzi)?.includes(val)
            );

            // if (variant === "all") {
            //   return hskCharacter?.hskLevel <= selectedBelt?.hskLevel;
            //   return selectedComp?.level <= selectedBelt?.maxCharacterLevel;
            // }

            // return hskCharacter?.hskLevel === selectedBelt?.hskLevel;

            if (variant === "all") {
              return selectedComp?.level <= selectedBelt?.maxCharacterLevel;
            }

            return (
              selectedComp?.level <= selectedBelt?.maxCharacterLevel &&
              selectedComp?.level >= selectedBelt?.minCharacterLevel
            );

            // return selectedComp?.level <= selectedBelt?.maxCharacterLevel;
          });
        })
        .map((id) => {
          return {
            hanzi: id,
            lang: "zh",
          };
        });

      const xiaomaWords = hskWords
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
            return selectedComp?.level <= selectedBelt?.maxCharacterLevel;
          }

          return hskCharacter?.hskLevel === selectedBelt?.hskLevel;

          // const hskCharacter = hskWords?.find(
          //   (word: any) => word?.hanzi === prop?.hanzi
          // );

          // console.log("HSK ", hskCharacter);

          // if (variant === "all") {
          //   return (
          //     !!selectedComp && hskCharacter?.hskLevel <= selectedBelt?.hskLevel
          //   );
          // }

          // return (
          //   !!selectedComp && hskCharacter?.hskLevel === selectedBelt?.hskLevel
          // );
        });

      const xiaomaCharacters = [
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
            return hskCharacter?.hskLevel <= selectedBelt?.hskLevel;
            return selectedComp?.level <= selectedBelt?.maxCharacterLevel;
          }

          return hskCharacter?.hskLevel === selectedBelt?.hskLevel;

          return (
            selectedComp?.level <= selectedBelt?.maxCharacterLevel &&
            selectedComp?.level >= selectedBelt?.minCharacterLevel
          );

          // if (variant === "all") {
          //   return selectedComp?.level <= selectedBelt?.maxCharacterLevel;
          // }

          // return (
          //   selectedComp?.level <= selectedBelt?.maxCharacterLevel &&
          //   selectedComp?.level >= selectedBelt?.minCharacterLevel
          // );

          return !!hskCharacter;
        });

      return {
        xiaomaCharacters,
        xiaomaWords,
        xiaomaSentences,
      };
    },

    refetchOnWindowFocus: false,
    refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
