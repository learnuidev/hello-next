"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect } from "react";
import { Summary } from "../summary";
import { Icons } from "../ui/icons.v2";
import { GrammarAnalysis } from "../grammar-analysis";
import { SelectedCharacterProps } from "./select-character.types";
import { ReadModeView } from "./readmode-view";
import { NormalView } from "./normal-view";
import { AudioComponent } from "./audio-component";
import { WordItem } from "../word-item";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";

import { SubComponentsView } from "./subcomponents-view";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useStoryStore } from "./story-store";
import { StoryEditor } from "./story-editor";
import { RelatedWords } from "./related-words";

const SentencesView = (props: SelectedCharacterProps) => {
  return (
    <>
      {/* <Summary characterId={selectedChar} showMeanings={false} /> */}
      {props.readMode ? <ReadModeView {...props} /> : <NormalView {...props} />}
    </>
  );
};

export const ViewType = (props: SelectedCharacterProps) => {
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

  const selected = selectedComp || selectedComp2;

  const level = selectedComp?.level || selectedComp2?.level;
  const toneLevel = selectedComp?.tone_level || selectedComp2?.tone_level;
  const initial = selectedComp?.initial || selectedComp2?.initial;
  const final = selected?.final || selectedComp2?.final;
  const { data } = useListCharactersQuery();

  const learnedChar = data?.filter(
    (item: any) => item?.input === characterId
  )?.[0];

  const story = useStoryStore((state: any) => state.story);

  const setStory = useStoryStore((state: any) => state.setStory);

  useEffect(() => {
    if (selectedComp?.story) {
      setStory(selectedComp?.story);
    }
  }, [selectedComp?.story, setStory]);

  const HskView = () => {
    const { data } = useListHSKWordsQuery();
    return (
      <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-start">
        {data
          ?.filter((item: any) => item?.hanzi?.includes(characterId))
          ?.map((prop: any) => {
            return (
              <WordItem
                lang={lang}
                component={prop}
                key={JSON.stringify(prop)}
              />
            );
          })}
      </div>
    );
  };

  if (view === "words") {
    if (lang === "zh") {
      return <HskView />;
    }

    return <RelatedWords lang={lang} characterId={characterId} />;
  }

  console.log("LEARNED CHAR", selectedComp);

  if (view === "story") {
    return (
      <div>
        <div>
          {/* {selectedChar?.length > 3 && ( */}
          <div className="flex items-center justify-between mb-8 mt-4 mr-0 sm:mr-32">
            <div className="flex flex-col items-start space-y-2">
              <h2 className="text-gray-400 font-extralight">
                {selectedComp?.pinyin || selectedComp?.roman}
              </h2>

              <h1 className="text-4xl my-0 py-0 font-extralight">
                {selectedComp?.hanzi || selectedChar}
              </h1>

              <h2 className="text-gray-500 font-light">{selectedComp?.en}</h2>
            </div>

            {level && (
              <div className="text-slate-500  text-extralight flex space-x-2 items-center">
                <Icons.earthAsia />
                <p>{level}</p>
              </div>
            )}

            {selectedComp?.audio ? (
              <AudioComponent currentPhrase={selectedComp} />
            ) : null}
          </div>
          {/* )} */}

          {/* <p>{JSON.stringify(selectedComp2, null, 2)}</p> */}

          {selected && (
            <div className="font-light flex space-x-4 items-center text-gray-400 mb-2">
              {toneLevel && (
                <div className="flex space-x-2 items-center">
                  <Icons.musicNote />
                  <p>{toneLevel}</p>
                </div>
              )}
              {initial && (
                <div className="flex space-x-2 items-center">
                  <p>initial - </p>
                  <p>{initial}</p>
                </div>
              )}
              {final && (
                <div className="flex space-x-2 items-center">
                  <p>final - </p>
                  <p>{final}</p>
                </div>
              )}
            </div>
          )}

          <SubComponentsView lang={lang} characterId={characterId} />

          <div>
            <StoryEditor selectedChar={selectedComp} />
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <StoryEditor selectedChar={selectedComp} />
      </div>
    );
  }

  return (
    <div
      className={
        "relative grid grid-cols-1 md:grid-cols-[1fr_500px] gap-x-8 md:grid-rows-[70px_1fr] pt-0"
      }
    >
      <div className={"row-span-2 overflow-hidden col-span-1"}>
        {/* {selectedChar?.length > 3 && ( */}
        <div className="flex items-center justify-between mb-8 mt-4">
          <div className="flex flex-col items-start space-y-2">
            <h2 className="text-gray-400 font-extralight">
              {selectedComp?.pinyin || selectedComp?.roman}
            </h2>

            <h1 className="text-4xl my-0 py-0 font-extralight">
              {selectedComp?.hanzi || selectedChar}
            </h1>

            <h2 className="text-gray-500 font-light">{selectedComp?.en}</h2>
          </div>

          {level && (
            <div className="text-slate-500  text-extralight flex space-x-2 items-center">
              <Icons.earthAsia />
              <p>{level}</p>
            </div>
          )}

          {selectedComp?.audio ? (
            <AudioComponent currentPhrase={selectedComp} />
          ) : null}
        </div>
        {/* )} */}

        {/* <p>{JSON.stringify(selectedComp2, null, 2)}</p> */}

        {selected && (
          <div className="font-light flex space-x-4 items-center text-gray-400 mb-2">
            {toneLevel && (
              <div className="flex space-x-2 items-center">
                <Icons.musicNote />
                <p>{toneLevel}</p>
              </div>
            )}
            {initial && (
              <div className="flex space-x-2 items-center">
                <p>initial - </p>
                <p>{initial}</p>
              </div>
            )}
            {final && (
              <div className="flex space-x-2 items-center">
                <p>final - </p>
                <p>{final}</p>
              </div>
            )}
          </div>
        )}

        <SubComponentsView lang={lang} characterId={characterId} />

        <article>
          <div>
            {characterId?.length < 10 && (
              <div className="mt-[-32px]">
                <Summary showMeanings={true} characterId={characterId} />
              </div>
            )}

            <div className="my-8">
              <GrammarAnalysis
                contentId={selectedChar}
                lang={lang || selectedComp?.lang}
              />
            </div>
          </div>
        </article>
      </div>

      <div>
        <div className="">
          {" "}
          {sentences?.length > 7 ? (
            <ScrollArea className="hidden md:block space-y-2 h-[700px] rounded-md p-4">
              <SentencesView {...props} />
            </ScrollArea>
          ) : (
            <div className="hidden md:block space-y-2 h-[700px] rounded-mdp-4">
              <SentencesView {...props} />
            </div>
          )}
        </div>

        <div className="md:hidden block">
          <SentencesView {...props} />
        </div>
      </div>
    </div>
  );
};
