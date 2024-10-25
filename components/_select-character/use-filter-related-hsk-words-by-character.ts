import { useListRelatedHSKWords } from "@/hooks/use-list-related-hsk-words";

import { useListComponents } from "@/domain/lesson/component.queries";
import { chineseCharacters } from "@/langs/chinese /characters";

export const useRelatedHskWordsByCharacter = ({
  characterId,
}: {
  characterId: string;
}) => {
  const { data: relatedHskWords } = useListRelatedHSKWords(characterId);

  const { data: componentsAll } = useListComponents({
    includeAll: true,
  });

  const comps = componentsAll ? componentsAll : chineseCharacters;

  const filteredRelatedHskWords = relatedHskWords
    ?.filter((item: any) => (item?.hanzi || item?.input)?.length <= 4)
    // ?.filter((item) => item?.level === 2)
    ?.sort((a, b) => a?.hanzi?.length - b?.hanzi?.length);

  return filteredRelatedHskWords;
};
