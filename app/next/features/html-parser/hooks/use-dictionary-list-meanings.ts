import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useQuery } from "@tanstack/react-query";
import { useGetDictionaryHandler } from "./use-get-dictionary-handler";
import { useJwtToken } from "./use-jwt-token";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { addToDictionary } from "@/app/(auth)/clipboard/hooks/add-to-dictionary";
import { useListDictionaryQuery } from "@/app/(auth)/clipboard/hooks/use-list-dictionary-query";
import { useGetContentId } from "@/app/(auth)/convos/[content-id]/hooks/use-get-content-id";
import { removeNull } from "@/lib/utils";
import { useMediaParams } from "@/app/(auth)/listen/[media-id]/hooks/use-media-params";

interface Meanings {
  hanzi: string;
  en: string;
  pinyin: string;
}

export const useListDictionaryMeaningsQuery = (
  hanzi: string,
  lang?: string,
  options = {} as any
) => {
  const token = useJwtToken();

  const { mediaId } = useMediaParams();

  const _lang = useGetCurrentLang();

  const finalLang = lang || _lang;

  const { data: hskWords } = useListHSKWordsQuery();

  const contentId = useGetContentId();

  const { data } = useListDictionaryQuery(finalLang);

  const getDictionaryHandler = useGetDictionaryHandler();

  return useQuery<Meanings[], Error>({
    queryKey: [
      "list-dictionary-meanings",
      token,
      hanzi,
      finalLang,
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

      if (Array.isArray(data)) {
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
              lang: finalLang,
              word,
              token,
              context: contentId ? { contentId } : mediaId ? { mediaId } : null,
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
