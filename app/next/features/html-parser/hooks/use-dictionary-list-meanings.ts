import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useQuery } from "@tanstack/react-query";
import { useGetDictionaryHandler } from "./use-get-dictionary-handler";
import { useJwtToken } from "./use-jwt-token";

interface Meanings {
  hanzi: string;
  en: string;
  pinyin: string;
}

export const useListDictionaryMeaningsQuery = (
  hanzi: string,
  options = {} as any
) => {
  const token = useJwtToken();

  const { data: hskWords } = useListHSKWordsQuery();

  const getDictionaryHandler = useGetDictionaryHandler();

  return useQuery<Meanings[], Error>({
    queryKey: [
      "list-dictionary-meanings",
      token,
      hanzi,
      JSON.stringify(hskWords),
    ],
    enabled: Boolean(hanzi),
    retry: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: async () => {
      return await getDictionaryHandler(hanzi);
    },
    ...options,
  });
};
