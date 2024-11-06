"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { GrammarAnalysis } from "../../grammar-analysis";
import { Summary } from "../../summary/summary";
import { Icons } from "../../ui/icons.v2";
import { CharacterSentences } from "./../character-sentences";
import { SelectedCharacterProps } from "./../select-character.types";

import { useListRelatedHSKWords } from "@/hooks/use-list-related-hsk-words";
import { chineseCharacters } from "@/langs/chinese /characters";
import { AddAudioButton } from "./../add-audio-button";
import { AudioComponent } from "./../audio-component";
import { CharacterTitle } from "./../character-title";
import { SubComponentsView } from "./../subcomponents-view";
import { useRelatedHskWordsByCharacter } from "./../use-filter-related-hsk-words-by-character";
import { ZoomedCharacter } from "./zoomed-character";

export const CharacterItemView = (props: SelectedCharacterProps) => {
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
        {/* {selectedChar?.length > 3 && ( */}

        {view === "zoom" ? (
          <div className="mb-4">
            <ZoomedCharacter characterId={characterId} />{" "}
          </div>
        ) : (
          <div className="flex items-center justify-between mb-4 mt-4 pr-4">
            <CharacterTitle
              pinyinOrRoman={pinyinOrRoman}
              multiSentence={multiSentence}
              lang={lang}
              selectedCompInput={selectedCompInput}
              selectedCompEn={selectedCompEn}
            />

            {/* {(selectedComp2?.input || selectedComp2?.hanzi)?.length <= 8 && (
              <div className="p-2">
                {selectedComp2 ? (
                  selectedComp2?.audio ? (
                    <AudioComponent
                      key={JSON.stringify(selectedComp2)}
                      currentPhrase={selectedComp2}
                    />
                  ) : (
                    <AddAudioButton
                      key={JSON.stringify(selectedComp2)}
                      currentPhrase={selectedComp2}
                    />
                  )
                ) : null}
              </div>
            )} */}
          </div>
        )}

        {(selectedComp2?.input || selectedComp2?.hanzi) && (
          <div className="my-8">
            {selectedComp2 ? (
              selectedComp2?.audio ? (
                <AudioComponent
                  key={JSON.stringify(selectedComp2)}
                  currentPhrase={selectedComp2}
                />
              ) : (
                <AddAudioButton
                  key={JSON.stringify(selectedComp2)}
                  currentPhrase={selectedComp2}
                />
              )
            ) : null}
          </div>
        )}

        {/* {selectedChar_ !== selectedChar && (
          <h2 className="text-4xl my-0 py-0 font-extralight">
            {selectedChar_}
          </h2>
        )} */}

        {multiSentence ? null : (
          <div className="flex items-center space-x-4">
            {relatedHskWords?.length > 0 && (
              <div className="text-slate-500  text-extralight flex space-x-2 items-center">
                <Icons.word />
                <p>{relatedHskWords?.length}</p>
              </div>
            )}
            {totalRelatedSentences > 0 && (
              <div className="text-slate-500  text-extralight flex space-x-2 items-center">
                <Icons.sentence />
                <p>{totalRelatedSentences}</p>
              </div>
            )}
            {level && (
              <div className="text-slate-500  text-extralight flex space-x-2 items-center">
                <Icons.earthAsia />
                <p>{level}</p>
              </div>
            )}
          </div>
        )}

        <SubComponentsView lang={lang} characterId={characterId} />

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
