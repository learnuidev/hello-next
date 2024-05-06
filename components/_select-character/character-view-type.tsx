"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

import React from "react";

import { Summary } from "../summary";

import { Icons } from "../ui/icons.v2";

import { useListSubComponentsQuery } from "@/domain/component/component.queries";
import { GrammarAnalysis } from "../grammar-analysis";

import { SelectedCharacterProps } from "./select-character.types";

import { ReadModeView } from "./readmode-view";

import { NormalView } from "./normal-view";
import { AudioComponent } from "./audio-component";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { persianWords } from "@/langs/persian/persian-words";
import { WordItem } from "../word-item";
import { arabicWords } from "@/langs/arabic/arabic-words";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { persianAlphabets } from "@/langs/persian/persian-alphabets";

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

  const HanziSubComponentsView = () => {
    const { data: sub_components, isLoading } = useListSubComponentsQuery({
      componentId: characterId,
    });

    if (isLoading) {
      return <Skeleton className="w-60 h-12" />;
    }

    if (characterId?.length === 1) {
      return (
        <div className="text-gray-500 flex space-x-4">
          {/* {JSON.stringify(sub_components, null, 2)} */}
          {sub_components?.map((comp: { hanzi: string; en: string }) => {
            return (
              <Link
                key={comp?.hanzi}
                className="space-x-2 flex"
                href={`/nmm/${comp?.hanzi}?lang=zh`}
              >
                <p>{comp?.hanzi}</p>
                <p className="text-gray-400">{comp?.en}</p>
              </Link>
            );
          })}
        </div>
      );
    }
  };

  const FarsiSubComponentView = () => {
    const subComponents = characterId.split("")?.map((comp: any) => {
      const alphabet = persianAlphabets?.find((item) => item?.input === comp);
      return {
        ...alphabet,
      };
    });
    return (
      <div className="text-gray-500 flex space-x-4 my-8">
        {/* {JSON.stringify(sub_components, null, 2)} */}
        {subComponents?.map((item: any) => {
          return (
            <Link
              key={item?.input}
              className="space-x-2 flex"
              href={`/nmm/${item?.input}?lang=${lang}`}
            >
              <p>{item?.input}</p>
              <p className="text-gray-400">{item?.roman}</p>
            </Link>
          );
        })}
      </div>
    );
  };
  const SubComponentsView = () => {
    if (lang === "zh") {
      return <HanziSubComponentsView />;
    }

    if (lang === "fa") {
      return <FarsiSubComponentView />;
    }

    return null;
  };

  const selected = selectedComp || selectedComp2;

  const level = selectedComp?.level || selectedComp2?.level;
  const toneLevel = selectedComp?.tone_level || selectedComp2?.tone_level;
  const initial = selectedComp?.initial || selectedComp2?.initial;
  const final = selected?.final || selectedComp2?.final;

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
    if (lang === "fa") {
      return (
        <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-between">
          {persianWords
            ?.filter((item) => item?.input?.includes(characterId))
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
    }
    if (lang === "ar") {
      return (
        <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-between">
          {arabicWords
            ?.filter((item) => item?.input?.includes(characterId))
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
    }

    if (lang === "zh") {
      return <HskView />;
    }
  }

  return (
    <div
      className={
        "relative grid grid-cols-1 md:grid-cols-[1fr_500px] gap-x-8 md:grid-rows-[70px_1fr] pt-0"
      }
    >
      <div className={"row-span-2 overflow-hidden col-span-1"}>
        {selectedChar?.length > 3 && (
          <div className="flex items-end justify-start space-x-4">
            <div className="flex flex-col items-start space-y-2">
              {!["es", "it", "ro", "fr"]?.includes(selectedComp?.lang) && (
                <h2 className="text-gray-400 font-light">
                  {selectedComp?.pinyin || selectedComp?.roman}
                </h2>
              )}
              <h1 className="text-2xl">
                {selectedComp?.hanzi || selectedChar}
              </h1>

              <h2 className="text-gray-500 font-light">{selectedComp?.en}</h2>
            </div>

            {selectedComp?.audio ? (
              <AudioComponent currentPhrase={selectedComp} />
            ) : null}
          </div>
        )}

        {/* <p>{JSON.stringify(selectedComp2, null, 2)}</p> */}

        {selected && (
          <div className="font-light flex space-x-4 items-center text-gray-400 mb-8">
            {level && (
              <div className="flex space-x-2 items-center">
                <Icons.earthAsia />
                <p>{level}</p>
              </div>
            )}
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

        <SubComponentsView />

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
