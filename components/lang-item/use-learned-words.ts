import { useListCharactersQuery } from "@/domain/lesson/character.queries";

import { useQuery } from "@tanstack/react-query";
import { useSearchQueryStore } from "../search/state";

import { filterWordsByQuery } from "./utils";

export const useLearnedWords = (lang: string) => {
  const { data } = useListCharactersQuery();
  const query = useSearchQueryStore((state) => state.query);

  return useQuery({
    queryKey: ["list-learned-words", lang, JSON.stringify(data), query],
    queryFn: async () => {
      const words = [...(data || [])]
        ?.filter((item: any) => item?.lang === lang)
        ?.filter((item: any) => (item?.input || item?.hanzi)?.length < 20);

      const dataToShow = filterWordsByQuery(words, query);
      return dataToShow;
    },
  });

  const words = [...(data || [])]
    ?.filter((item: any) => item?.lang === lang)
    ?.filter((item: any) => (item?.input || item?.hanzi)?.length < 20);
};
