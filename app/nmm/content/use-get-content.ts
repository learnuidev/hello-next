"use client";

import { useListComponents } from "@/domain/lesson/component.queries";

import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

import { useQuery } from "@tanstack/react-query";
import { useSearchQueryStore } from "@/components/search/state";
import {
  useGetContentQuery,
  useListContentsQuery,
} from "@/domain/content/content.queries";
import { filterNonHanYu } from "../nmm-utils/filter-non-hanyu";
import { useListPublishedContentsQuery } from "@/app/(auth)/convos/[content-id]/hooks/use-list-published-contents-query";

export const useGetContent = ({
  variant,
  selectedBelt,
  contentId,
  returnAll,
}: {
  variant?: "core" | "needs_review" | "all";
  selectedBelt: any;
  contentId: string;
  returnAll: boolean;
}) => {
  const viewType = useSearchQueryStore((state) => state.type);

  const { data: contentItems } = useListPublishedContentsQuery({});

  const contents = contentItems?.items;

  const { data: content } = useGetContentQuery({ contentId });

  const { data: components } = useListComponents({ includeAll: true });

  const { data: hskWords } = useListHSKWordsQuery();

  const queryKey = returnAll
    ? ["list-content-items", viewType, contentId]
    : [
        "list-content-items",
        variant,
        selectedBelt?.hskLevel,
        selectedBelt?.maxCharacterLevel,
        selectedBelt?.minCharacterLevel,
        contentId,
        viewType,
        JSON.stringify(hskWords),
        JSON.stringify(contents),
      ];

  return useQuery<any>({
    // @ts-ignore
    queryKey: queryKey,

    queryFn: async () => {
      let xiaomaSentences = [] as any;

      if (viewType === "sentence" || viewType === "word") {
        xiaomaSentences = [
          ...new Set(
            content?.transcriptions.map((x: any) => x.hanzi || x?.input)
          ),
        ]
          .filter((val: any) => filterNonHanYu(val))
          .map((id) => {
            const transcription = content?.transcriptions?.find(
              (transcription: any) => {
                return (transcription?.hanzi || transcription?.input) === id;
              }
            );

            return {
              ...transcription,
              hanzi: id,
              lang: "zh",
            };
          });
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

              if (returnAll) {
                return true;
              }

              return (
                selectedComp &&
                selectedComp?.level <= selectedBelt?.maxCharacterLevel
              );
            });
          })
          ?.filter((prop: any, idx: any, coll: any) => {
            if (returnAll) {
              return true;
            }
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
            content?.transcriptions
              .map((x: any) => x?.input || x?.hanzi)
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
            if (returnAll) {
              return true;
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

      const resp = {
        characters: xiaomaCharacters,
        words: xiaomaWords,
        sentences: xiaomaSentences,
      };

      return resp;
    },

    refetchOnWindowFocus: false,
    // refetchOnFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
