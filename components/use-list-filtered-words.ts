import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useSearchQueryStore } from "./search/state";
import { WordItem } from "./word-item";
import { wordsDict } from "@/langs/words-dict";
import { useQuery } from "@tanstack/react-query";

const lettersDict = {
  ó: "o",
} as any;

const cleanInput = (input: any) =>
  input
    ?.split("")
    ?.map((x: any) => {
      if (lettersDict?.[x]) {
        return lettersDict?.[x];
      }
      return x;
    })
    ?.join("");

export const useListFilteredWords = ({
  lang,
  query,
}: {
  lang: string;
  query: string;
}) => {
  const words = wordsDict[lang];
  const { data: characters } = useListCharactersQuery();

  const filterWord = (prop: any) => {
    if (prop?.lang !== lang) {
      return false;
    }

    if (prop?.hanzi?.split(" ")?.length > 2) {
      return false;
    }

    if (!query) {
      return true;
    }

    const lowerCasedQuery = query?.toLowerCase();

    return (
      prop?.en?.toLowerCase()?.includes(lowerCasedQuery) ||
      cleanInput(prop?.input)?.toLowerCase()?.includes(lowerCasedQuery)
    );
  };

  return useQuery({
    queryKey: ["list-filtered-words-list", lang, query],
    queryFn: async () => {
      if (query) {
        return Promise.resolve(
          [...(characters || []), ...words]
            ?.filter(filterWord)
            ?.sort((a: any, b: any) => a?.input?.length - b?.input?.length)
        );
      } else {
        return Promise.resolve(
          [...words]
            ?.filter(filterWord)
            ?.sort((a: any, b: any) => a?.input?.length - b?.input?.length)
        );
      }
    },
  });
};
