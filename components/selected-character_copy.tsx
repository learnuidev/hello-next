// import Image from 'next/image'
"use client";

import { useState } from "react";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";

import * as R from "ramda";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";

import { faXmark } from "@fortawesome/pro-light-svg-icons/faXmark";

import { course1 } from "@/data/convos/bm1/index";

import { faX } from "@fortawesome/pro-thin-svg-icons";

import { useParams, useSearchParams } from "next/navigation";

import Link from "next/link";
import { useSelectedCharacter } from "@/app/(auth)/convos/use-selected-character";

import { useListContentsQuery } from "@/domain/content/content.queries";

import { useListComponents } from "@/domain/lesson/component.queries";
import { calculateColor } from "@/app/nmm/utils";
import { cleanString } from "@/data/convos/bm1/utils";

export function SelectedCharacter({
  unlockedCharactersHMM,
}: {
  setSelectedChar: any;
  selectedChar: any;
  unlockedCharactersHMM: string[];
}) {
  const searchParams = useSearchParams();

  const lessonId = searchParams.get("lessonId");
  // const params = useParams() as {
  //   lessonId: string
  // }
  const { data: allAnswers, isLoading } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const { data: contents } = useListContentsQuery();

  const allContents = contents
    ?.map((content: any) => content?.transcriptions)
    ?.flat();

  const selectedChar = useSelectedCharacter((state: any) => state?.character);
  const setSelectedChar = useSelectedCharacter(
    (state: any) => state?.setCharacter
  );

  const relevantAnswersHanzi = [
    // @ts-ignore
    ...new Set(
      allAnswers
        ?.filter((answer: any) => {
          return answer?.phraseId?.includes(selectedChar);
        })
        ?.map((x: any) => x?.phraseId)
    ),
  ];

  const relevantAnswers = allAnswers?.filter((answer: any) => {
    return answer?.phraseId?.includes(selectedChar?.hanzi || selectedChar);
  });

  const uniqueAnswers = relevantAnswersHanzi?.map((x: string) => {
    return relevantAnswers?.find((ans: any) => ans?.hanzi === x);
  });

  const answerMap = R.indexBy(R.prop("hanzi"), relevantAnswers) as Record<
    string,
    { hanzi: string; journeyId: string; phraseId: string }
  >;

  const uniqueAnswerIds = [
    // @ts-ignore
    ...new Set(relevantAnswers?.map((answer: any) => answer?.hanzi)),
  ];

  const { data: components } = useListComponents();

  const allSteps =
    components
      ?.map((component: any) => component?.steps)
      ?.filter(Boolean)
      ?.flat() || [];

  const selectedComp = components?.find(
    (component: any) => component?.hanzi === selectedChar
  );

  return (
    <div className="w-full px-4 md:px-12">
      <div className="flex justify-between items-center">
        <button
          className="text-xl"
          onClick={() => {
            setSelectedChar("");
          }}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <h2 className="text-4xl my-4 font-extralight text-gray-500 dark:text-gray-300">
          <Link
            target="_blank"
            href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
              selectedChar?.hanzi || selectedChar
            )}`}
            className="flex items-end space-x-2"
          >
            {" "}
            <span>{selectedChar?.hanzi || selectedChar}</span>{" "}
            <span className="text-xs">{selectedComp?.en}</span>
          </Link>
        </h2>
      </div>
      <div className="my-8">
        <div className="my-2 flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
          {uniqueAnswerIds?.map((id: any, idx: number) => {
            const char = answerMap?.[id] || {};

            const currentLesson = allContents?.find(
              (lesson: any) => lesson?.id === char?.phraseId
            );

            const currentPhrase =
              allContents?.find(
                (lesson: any) => lesson?.id === char?.phraseId
              ) ||
              allSteps?.find((step: any) => cleanString(step?.hanzi) === id);

            return (
              <div
                role="button"
                className="pb-8 flex flex-col"
                key={`${idx}-${char?.hanzi}-${idx}-${Math.random()}`}
              >
                {" "}
                <Link
                  target="_blank"
                  href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
                    char?.hanzi
                  )}`}
                  // className="flex items-end space-x-2"
                >
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {currentPhrase?.pinyin}
                  </span>
                </Link>
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
                          key={`${idx}-${val}-${idx}-${idy}-${idy}-${idx}`}
                          onClick={() => {
                            setSelectedChar(val);
                          }}
                          className={`${
                            selectedChar === val
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
              // <div
              //   role="button"
              //   className="pb-8 flex flex-col"
              //   key={`${idx}-${char?.hanzi}-${idx}`}
              // >
              //   {" "}
              //   <span className="text-md text-gray-600 dark:text-gray-300">
              //     {currentPhrase?.pinyin}
              //   </span>
              //   <p>
              //     {currentPhrase?.hanzi?.split("")?.map((str: string) => {
              //       return (
              //         <span
              //           key={`${selectedChar}-${str}`}
              //           className={`${
              //             selectedChar === str
              //               ? "text-gray-700 dark:text-yellow-300"
              //               : "text-gray-500 dark:text-gray-300"
              //           }`}
              //         >
              //           {str}
              //         </span>
              //       );
              //     })}
              //   </p>
              //   <span className="text-md text-gray-700 dark:text-gray-400">
              //     {currentPhrase?.en || title}
              //   </span>
              // </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
