import { addToDictionary } from "@/app/(auth)/clipboard/hooks/add-to-dictionary";
import { useListDictionaryQuery } from "@/app/(auth)/clipboard/hooks/use-list-dictionary-query";
import { useGetContentId } from "@/app/(auth)/convos/[content-id]/hooks/use-get-content-id";
import { useMediaParams } from "@/app/(auth)/listen/[media-id]/hooks/use-media-params";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useQuery } from "@tanstack/react-query";
import { useGetDictionaryHandler } from "./use-get-dictionary-handler";
import { useJwtToken } from "./use-jwt-token";

interface Meanings {
  hanzi: string;
  input: string;
  en: string;
  pinyin: string;
  roman?: string;
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

  const getDictionaryHandler = useGetDictionaryHandler(_lang);

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
      if (finalLang === "zh" && data?.length > 0) {
        const items = await getDictionaryHandler(hanzi, finalLang, options);
        // return items;

        let res = [];
        for (const word of items) {
          const item = data?.filter(
            (val: any) =>
              val?.id?.split("#")?.[0]?.toLowerCase() ===
              word?.input?.toLowerCase()
          )?.[0];

          if (item) {
            res.push({ ...item, start: word?.start, end: word?.end });
          } else {
            const resp = await addToDictionary({
              lang: finalLang,
              word: word?.input,
              token,
              context: contentId ? { contentId } : mediaId ? { mediaId } : null,
            });

            res.push({ ...resp, start: word?.start, end: word?.end });
          }
        }

        return res?.filter(Boolean);
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
