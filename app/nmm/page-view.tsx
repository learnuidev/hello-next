"use client";
import React from "react";

import { Music } from "@/components/music";
import { NomadMethod } from "./nomad-method";

import { useListTonePairsQuery } from "@/domain/tone-pairs/tone-pairs.queries";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import * as R from "ramda";

import { calculateColor } from "./utils";

import { useListContentsQuery } from "@/domain/content/content.queries";
import { useListComponentsQuery } from "@/domain/lesson/component.queries";
import { cleanString } from "@/data/convos/bm1/utils";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";

export const PageView = ({
  view,
  setSelectedId,
  belt,
  selectedId,
  setView,
}: any) => {
  // const dict = dictionary?.[selectedId];

  const { data: allAnswers, isLoading } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const relevantAnswers = allAnswers?.filter((answer: any) => {
    return answer?.phraseId?.includes(selectedId);
  }) as {
    hanzi: string;
    journeyId: string;
    phraseId: string;
  }[];

  const answerMap = R.indexBy(R.prop("hanzi"), relevantAnswers) as Record<
    string,
    { hanzi: string; journeyId: string; phraseId: string }
  >;

  const uniqueAnswerIds = [
    // @ts-ignore
    ...new Set(relevantAnswers?.map((answer: any) => answer?.phraseId)),
  ];

  const { data } = useListTonePairsQuery({});

  const relatedData = data?.filter((item: any) =>
    item?.hanzi?.includes(selectedId)
  );

  const { data: contents } = useListContentsQuery();

  const allTranscriptions = contents
    ?.map((content: any) => content?.transcriptions)
    .flat();

  const { data: components } = useListComponentsQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const allSteps =
    components
      ?.map((component: any) => component?.steps)
      ?.filter(Boolean)
      ?.flat() || [];

  const selectedComp = components?.find(
    (component: any) => component?.hanzi === selectedId
  );

  const { data: sentences } = useListSentencesQuery({
    component: selectedId,
  });

  switch (view) {
    case "play":
      return (
        <NomadMethod
          onClose={() => {
            setView("sentences");
          }}
          selectedId={selectedId}
        />
      );
    case "sentences":
      return uniqueAnswerIds?.length ? (
        <div className="my-8 flex justify-center">
          <div className="my-2 flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
            {uniqueAnswerIds?.map((answerId: any, idx: number) => {
              const char = answerMap?.[answerId] || {};
              const lesson = {};

              const currentPhrase =
                allTranscriptions?.find(
                  (lesson: any) => lesson?.id === char?.hanzi
                ) ||
                allSteps?.find(
                  (step: any) => cleanString(step?.hanzi) === answerId
                );

              return (
                <div
                  role="button"
                  className="pb-8 flex flex-col"
                  key={`${idx}-${char?.hanzi}-${idx}`}
                >
                  {" "}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {currentPhrase?.pinyin}
                  </span>
                  <span className="text-gray-500 dark:text-gray-300">
                    {currentPhrase?.hanzi
                      ?.split("")
                      ?.map((val: string, idy: number) => {
                        // const toneLevel = getCharacterToneLevel(
                        //   currentPhrase as ICharacter
                        // );

                        // const color = calculateColor({ tone: toneLevel });

                        const color = calculateColor({
                          tone: selectedComp?.tone_level,
                        });

                        return (
                          <span
                            key={`${idx}-${val}-${idx}-${idy}`}
                            onClick={() => {
                              setSelectedId(val);
                            }}
                            className={`${
                              selectedId === val
                                ? color
                                : "text-gray-400 dark:text-gray-300"
                            }`}
                          >
                            {val}
                          </span>
                        );
                      })}
                  </span>
                  <span className="text-sm text-gray-500">
                    {currentPhrase?.en || currentPhrase?.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="my-8 flex justify-center dark:text-white">
          <h1>Nothing here</h1>
        </div>
      );

    case "words":
      return (
        <div className="my-4 mx-8 md:mx-16 text-black dark:text-white">
          {relatedData?.length ? (
            <div className="flex flex-col items-center">
              <div className="my-4 mx-8 md:mx-16 text-black dark:text-white">
                {relatedData?.length ? (
                  <div className="flex flex-col items-start">
                    <div className="space-y-8 my-4">
                      {relatedData.map((example: any) => {
                        return (
                          <div
                            key={JSON.stringify(example)}
                            className="grid grid-cols-2 w-full"
                          >
                            {example?.sound || example?.audio ? (
                              <Music
                                className="text-md dark:text-gray-500 text-gray-700"
                                url={example?.sound || example?.audio}
                              />
                            ) : null}
                            <div className="">
                              {example?.hanzi.split("").map((item: any) => {
                                return (
                                  <span
                                    key={JSON.stringify(item)}
                                    className={
                                      item === selectedId ||
                                      selectedId.includes(item)
                                        ? calculateColor({
                                            tone: selectedComp?.tone_level,
                                          })
                                        : `dark:text-gray-600 text-gray-300`
                                    }
                                  >
                                    {item}
                                  </span>
                                );
                              })}

                              <p className="dark:text-gray-400 text-gray-500">
                                {example?.en}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="my-8 flex justify-center dark:text-white">
              <h1>Nothing here</h1>
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
};
