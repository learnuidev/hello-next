import { useListDictionaryQuery } from "@/app/(auth)/clipboard/hooks/use-list-dictionary-query";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { segmentText } from "@/libs/utils/segment-text";
import { useDictionaryStore } from "./use-dictionary-store";

export const useGetDictionaryHandler = (lang: string) => {
  const { data: hskWords } = useListHSKWordsQuery();

  const getDictionaryHandler = async (
    text: string,
    lang: string,
    options?: any
  ) => {
    try {
      const respJson: any = options?.words
        ? options?.words
        : await segmentText({ text, lang });

      const respWithHsk = respJson.map((item: any) => {
        const hskLevel = hskWords?.find(
          (hskWord: any) => hskWord?.hanzi === item?.input
        );

        return {
          ...hskLevel,
          ...item,
        };
      });

      return respWithHsk;
    } catch (err) {
      throw err;
    }
  };

  return getDictionaryHandler;
};
