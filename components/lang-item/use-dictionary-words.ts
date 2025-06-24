"use client";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";

import { useListComponents } from "@/domain/lesson/component.queries";
import { wordsDict } from "@/langs/words-dict";

import { useQuery } from "@tanstack/react-query";
import { useSearchQueryStore } from "../search/state";
import { formatComponentName } from "@/app/nmm/format-component-name";

import { filterWordsByQuery } from "./utils";

export const useListDictionaryWords = (lang: string) => {
  const query = useSearchQueryStore((state) => state.query);

  const { data: characters } = useListCharactersQuery();
  const { data: components } = useListComponents();

  return useQuery<any>({
    queryKey: ["list-dictionary-words", lang, query],
    queryFn: async () => {
      const dictionaryWords = wordsDict[lang];

      const dataToShow = filterWordsByQuery(dictionaryWords, query);

      return dataToShow?.map((prop: any) => {
        const character = [
          ...((characters as any) || []),
          ...(components || []),
        ]
          ?.filter(
            (char: any) =>
              (char?.input || char?.hanzi) === (prop?.input || prop?.hanzi)
          )
          ?.find((item) => item?.en);

        return {
          ...prop,
          ...character,
          input: prop.input || prop?.hanzi,
          roman:
            prop?.roman ||
            character?.roman ||
            character?.pinyin ||
            prop?.pinyin,

          en: formatComponentName({ en: character?.en || prop.en }, 1),
        };
      });
      // return dictionaryWords;
    },
  });
};
