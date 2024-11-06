"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { GrammarAnalysis } from "../../grammar-analysis";
import { Summary } from "../../summary/summary";
import { CharacterSentences } from "../character-sentences";
import { SelectedCharacterProps } from "../select-character.types";

import { useListRelatedHSKWords } from "@/hooks/use-list-related-hsk-words";
import { chineseCharacters } from "@/langs/chinese /characters";
import { useRelatedHskWordsByCharacter } from "../use-filter-related-hsk-words-by-character";
import { SelectedCharacterHeader } from "./selected-character-header";

export const CharacterOverviewView = (props: SelectedCharacterProps) => {
  const {
    uniqueAnswerIds,
    answerMap,
    allContents,
    allSteps,
    components,
    selectedComp,
    selectedChar,
    routeName,
    lang,
    view,
    sentences,
    characterId,
    selectedComp2,
  } = props;

  const level = selectedComp?.level || selectedComp2?.level;

  const offlineCharacter = chineseCharacters?.find(
    (char) => char?.hanzi === characterId || char?.input === characterId
  );

  const pinyinOrRoman =
    selectedComp?.pinyin ||
    selectedComp?.roman ||
    selectedComp2?.pinyin ||
    selectedComp2?.roman ||
    offlineCharacter?.pinyin ||
    offlineCharacter?.roman;
  const selectedCompEn =
    selectedComp?.en || selectedComp2?.en || offlineCharacter?.en;

  const selectedCompInput =
    selectedComp?.hanzi ||
    selectedComp?.input ||
    selectedComp2?.input ||
    selectedComp2?.hanzi ||
    selectedChar;

  const { data: totalRelatedHskWords } = useListRelatedHSKWords(characterId);

  const relatedHskWords = useRelatedHskWordsByCharacter({
    characterId,
  });

  const totalRelatedSentences =
    totalRelatedHskWords?.length - relatedHskWords?.length;

  const multiSentence =
    pinyinOrRoman?.split(".")?.length > 1 ||
    pinyinOrRoman?.split("?")?.length > 1;

  // const

  return (
    <div
      className={
        "relative grid grid-cols-1 md:grid-cols-8 gap-x-8 md:grid-rows-[70px_1fr] pt-0"
      }
    >
      <div className={"col-span-5 row-span-2 overflow-hidden"}>
        <SelectedCharacterHeader {...props} />

        <article>
          <div>
            <div className="mt-8">
              <Summary showMeanings={true} characterId={characterId} />
            </div>

            {selectedCompInput?.length < 32 && (
              <div className="my-8">
                <GrammarAnalysis
                  contentId={selectedChar}
                  lang={lang || selectedComp?.lang}
                />
              </div>
            )}
          </div>
        </article>
      </div>

      {selectedCompInput?.length >= 32 ? (
        <div className="col-span-5 md:col-span-3">
          <GrammarAnalysis
            contentId={selectedChar}
            lang={lang || selectedComp?.lang}
          />
        </div>
      ) : (
        <div className="col-span-5 md:col-span-3">
          <div className="">
            {" "}
            {sentences?.length > 7 ? (
              <ScrollArea className="hidden md:block space-y-2 h-[700px] rounded-md p-4">
                <CharacterSentences {...props} />
              </ScrollArea>
            ) : (
              <div className="hidden md:block space-y-2 h-[700px] rounded-mdp-4">
                <CharacterSentences {...props} />
              </div>
            )}
          </div>

          <div className="md:hidden block">
            <CharacterSentences {...props} />
          </div>
        </div>
      )}
    </div>
  );
};
