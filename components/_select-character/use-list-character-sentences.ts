import { useSearchParams } from "next/navigation";

import { useListContentsQuery } from "@/domain/content/content.queries";

import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useContentViewStore } from "./use-content-view-store";

export const useListCharacterSentences = (characterId: string) => {
  const { data: contents } = useListContentsQuery();
  const searchParams = useSearchParams();

  const view = useContentViewStore((state) => state.view);
  const setView = useContentViewStore((state) => state.setView);

  const searchParamsLang = useGetCurrentLang();

  const filteredContents = contents?.filter((content: any) => {
    if (view === "all") {
      // if (lang) {
      //   return content?.lang === lang;
      // }

      return true;
    }

    return content?.title === view;
  });

  const allSentences = filteredContents
    ?.map((content: any) => content?.transcriptions)
    ?.flat()
    ?.sort(
      (a: any, b: any) => JSON.stringify(a)?.length - JSON.stringify(b)?.length
    )
    ?.filter((item: any) => JSON.stringify(item)?.includes(characterId));

  return allSentences;
};
