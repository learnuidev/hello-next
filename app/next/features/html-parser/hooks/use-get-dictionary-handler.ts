import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import {
  pickPinyinSource,
  segmentText,
} from "@/libs/utils/segment-text";

export const useGetDictionaryHandler = (lang: string) => {
  const { data: hskWords } = useListHSKWordsQuery();

  const getDictionaryHandler = async (
    text: string,
    lang: string,
    options?: any,
  ) => {
    try {
      const respJson: any = options?.words
        ? options?.words
        : await segmentText({
            text,
            lang,
            // A caller that already knows the pinyin of the whole text can hand
            // it over, so the words are read in context.
            originalPinyin: pickPinyinSource(options?.pinyin, options?.roman),
          });

      const respWithHsk = respJson.map((item: any) => {
        const hskLevel = hskWords?.find(
          (hskWord: any) => hskWord?.hanzi === item?.input,
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
