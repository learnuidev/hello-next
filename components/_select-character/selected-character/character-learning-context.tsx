import { Nothing } from "@/app/nmm/nothing";
import { useGetCharacterQuery } from "@/domain/character/use-get-character-query";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { SentenceItem } from "../sentence-item";
import { useGetCharacterLearningContext } from "./use-get-character-learning-context";

export function useCharacterLearningContext({
  characterId,
}: {
  characterId: string;
}) {
  const lang = useGetCurrentLang();

  const items = useGetCharacterLearningContext({ lang, characterId });

  const { data: learnedCharacter } = useGetCharacterQuery({
    hanzi: characterId,
  });

  const contentContext = [
    ...new Set(
      (learnedCharacter?.contentContext || []).map((item: any) =>
        JSON.stringify(item),
      ),
    ),
  ]
    ?.map((item: any) => JSON.parse(item))
    ?.filter((item) => item?.contentId);

  return contentContext;
}

export const CharacterLearningContext = ({
  selectedComp,

  characterId,
}: any) => {
  const contentContext = useCharacterLearningContext({ characterId });

  if (!contentContext?.length) {
    return <Nothing message="Nothing found" />;
  }

  if (contentContext?.length) {
    return (
      <div>
        {contentContext?.map((item: any) => {
          return (
            <SentenceItem
              key={JSON.stringify(item)}
              currentPhrase={item}
              selectedComp={selectedComp}
              selectedChar={characterId}
              lang={item?.lang}
            />
          );
        })}
      </div>
    );
  }
};
