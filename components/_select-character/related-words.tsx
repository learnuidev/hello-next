"use client";

import React from "react";
import { WordItem } from "../word-item";
import { wordsDict } from "@/langs/words-dict";
import { useQuery } from "@tanstack/react-query";

interface ListRelatedWords {
  lang: string;
  characterId: string;
}

const listRelatedWords = async ({ characterId, lang }: ListRelatedWords) => {
  const words = wordsDict[lang] || [];

  const selectedWord = words?.find((word: any) => word?.input === characterId);

  const relatedWords = Object.values(wordsDict)
    .flat()
    .filter((item: any) => {
      return selectedWord?.en === item?.en;
    });

  return Promise.resolve(relatedWords);
};

const useListRelatedWords = ({ characterId, lang }: ListRelatedWords) => {
  return useQuery<any, any, any>({
    queryKey: ["list-related-words", characterId, lang],
    queryFn: async () => {
      const relatedWords = await listRelatedWords({ characterId, lang });
      return relatedWords;
    },
  });
};

const useListSimilarWords = ({ characterId, lang }: ListRelatedWords) => {
  const words = wordsDict[lang] || [];

  return useQuery<any, any, any>({
    queryKey: ["list-similar-words", characterId, lang],
    queryFn: async () => {
      const relatedWords = await listRelatedWords({ characterId, lang });

      const similarWords = words?.filter((item: any) => {
        const containsItem = relatedWords?.find((word: any) =>
          word?.input?.includes(characterId)
        );

        if (containsItem) {
          return false;
        }
        return item?.input?.includes(characterId);
      });

      return similarWords;
    },
  });
};

export const RelatedWords = ({ lang, characterId }: ListRelatedWords) => {
  const { data: relatedWords } = useListRelatedWords({ characterId, lang });
  const { data: similarWords } = useListSimilarWords({ characterId, lang });

  return (
    <div>
      <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-start">
        {relatedWords?.map((prop: any) => {
          return (
            <WordItem lang={lang} component={prop} key={JSON.stringify(prop)} />
          );
        })}
      </div>

      <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-start">
        {similarWords?.map((prop: any) => {
          return (
            <WordItem lang={lang} component={prop} key={JSON.stringify(prop)} />
          );
        })}
      </div>
    </div>
  );
};
