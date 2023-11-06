"use client";
import React from "react";

import { dictionary } from "@/data/hmm/data/dictionary";
import { Music } from "@/components/music";
import { NomadMethod } from "./nomad-method";

import { useListTonePairsQuery } from "@/domain/tone-pairs/tone-pairs.queries";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { course1 } from "@/data/convos/bm1";

import * as R from "ramda";

import { calculateColor } from "./utils";
import { ICharacter, getCharacterToneLevel } from "@/data/hmm/data/utils";
import { useListContentsQuery } from "@/domain/content/content.queries";

export const PageView = ({ view, setSelectedId, belt, selectedId }: any) => {
  const dict = dictionary?.[selectedId];

  const { data: allAnswers, isLoading } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  console.log("ALL", allAnswers);

  const relevantAnswers = allAnswers?.filter((answer: any) => {
    return answer?.hanzi?.includes(selectedId);
  }) as {
    hanzi: string;
    journeyId: string;
    phraseId: string;
  }[];

  console.log("ALL_relevant", relevantAnswers);

  const answerMap = R.indexBy(R.prop("hanzi"), relevantAnswers) as Record<
    string,
    { hanzi: string; journeyId: string; phraseId: string }
  >;

  const uniqueAnswerIds = [
    // @ts-ignore
    ...new Set(relevantAnswers?.map((answer: any) => answer?.hanzi)),
  ];

  console.log("UNIQUE ANSWER IDS", uniqueAnswerIds);
  console.log("ANSWER MAP", answerMap);

  const { data } = useListTonePairsQuery({});

  const relatedData = data?.filter((item: any) =>
    item?.hanzi?.includes(dict?.hanzi)
  );

  const { data: contents } = useListContentsQuery();

  const allTranscriptions = contents?.map((content: any) => content?.transcriptions).flat()


  console.log("allTranscriptions", allTranscriptions)

  switch (view) {
    case "play":
      return <NomadMethod />;
    case "sentences":
      return uniqueAnswerIds?.length ? (
        <div className="my-8 flex justify-center">
          <div className="my-2 flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
            {uniqueAnswerIds?.map((answerId: any, idx: number) => {
              const char = answerMap?.[answerId] || {};
              const lesson = {};

              console.log("---------------------")

              console.log("ANSWER ID", answerId)

              // const currentLesson = allTranscriptions?.find(
              //   (lesson: any) => lesson?.id === char?.journeyId
              // );

              console.log("CHAR", char)

              console.log("allTranscriptions", allTranscriptions)
  
              const currentPhrase = allTranscriptions?.find(
                (lesson: any) => lesson?.id === char?.hanzi
              );

              console.log("CURRENT PHRASE", currentPhrase)
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
                        const toneLevel = getCharacterToneLevel(
                          currentPhrase as ICharacter
                        );

                        const color = calculateColor({ tone: toneLevel });

                        return (
                          <span
                            key={`${idx}-${val}-${idx}-${idy}`}
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
                    {currentPhrase?.en}
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
                                        ? calculateColor(dict)
                                        : `dark:text-gray-600 text-gray-300`
                                    }
                                  >
                                    {item}
                                  </span>
                                );
                              })}
                              {/* <p className="dark:text-gray-500 text-gray-400">
                                {example?.pinyin}
                              </p> */}
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

              <div className="space-y-8 my-4">
                {dict?.examples?.map((example: any) => {
                  return (
                    <div
                      key={JSON.stringify(example)}
                      className="flex space-x-4 items-start"
                    >
                      {example?.sound ? (
                        <Music
                          className="min-w-[40px] text-2xl dark:text-gray-500 text-gray-700"
                          url={example?.sound}
                        />
                      ) : null}
                      <div className="">
                        {example?.hanzi.split("").map((item: any) => {
                          return (
                            <span
                              key={JSON.stringify(item)}
                              className={
                                item === selectedId || selectedId.includes(item)
                                  ? calculateColor(dict)
                                  : `dark:text-gray-600 text-gray-300`
                              }
                            >
                              {item}
                            </span>
                          );
                        })}
                        <p className="dark:text-gray-500 text-gray-400">
                          {example?.pinyin}
                        </p>
                        <p className="dark:text-gray-400 text-gray-500">
                          {example?.en}
                        </p>
                      </div>
                    </div>
                  );
                })}
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
