import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useQuery } from "@tanstack/react-query";
import { useGetDictionaryHandler } from "./use-get-dictionary-handler";
import { useJwtToken } from "./use-jwt-token";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { addToDictionary } from "@/app/(auth)/clipboard/hooks/add-to-dictionary";
import { useListDictionaryQuery } from "@/app/(auth)/clipboard/hooks/use-list-dictionary-query";

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

  const lang = useGetCurrentLang();

  const { data: hskWords } = useListHSKWordsQuery();

  const { data } = useListDictionaryQuery(lang);

  const getDictionaryHandler = useGetDictionaryHandler();

  return useQuery<Meanings[], Error>({
    queryKey: [
      "list-dictionary-meanings",
      token,
      hanzi,
      lang,
      JSON.stringify(hskWords),
      JSON.stringify(data),
    ],
    enabled: Boolean(hanzi),
    // retry: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: async () => {
      if (lang === "zh") {
        return await getDictionaryHandler(hanzi);
      }

      console.log("YOOO");

      if (data?.length > 0) {
        let res = [];

        const words = hanzi?.split(" ");

        for (const word of words) {
          // const item = data?.filter(
          //   (val: any) => val?.input === word || val?.hanzi === word
          // )?.[0];

          const item = data?.filter(
            (val: any) =>
              val?.id?.split("#")?.[0]?.toLowerCase() === word?.toLowerCase()
          )?.[0];

          if (item) {
            res.push(item);
          } else {
            const resp = await addToDictionary({
              lang,
              word,
              token,
            });

            res.push(resp);
          }
        }

        return res?.filter(Boolean);
      }
    },
    ...options,
  });
};
