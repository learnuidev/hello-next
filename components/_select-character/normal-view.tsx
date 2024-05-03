"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { calculateColor } from "@/app/nmm/utils";
import { cleanString } from "@/data/convos/bm1/utils";
import { SelectedCharacterProps } from "./select-character.types";
import { HanziViewer } from "./hanzi-viewer";

export const NormalView = (props: SelectedCharacterProps) => {
  const {
    uniqueAnswerIds,
    answerMap,
    allContents,
    allSteps,
    selectedComp,
    selectedChar,
    sentences,
  } = props;
  const router = useRouter();
  return (
    <div className="w-full">
      {/* <div>{JSON.stringify(sentences, null, 2)}</div>; */}
      <div className="flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
        {uniqueAnswerIds?.map((id: any, idx: number) => {
          const char = answerMap?.[id] || {};

          const currentLesson = allContents?.find(
            (lesson: any) => lesson?.id === char?.phraseId
          );

          const currentPhrase =
            allContents?.find((lesson: any) => lesson?.id === char?.phraseId) ||
            allSteps?.find((step: any) => cleanString(step?.hanzi) === id);

          return (
            <div
              key={`${idx}-${char?.hanzi || char?.input}-${idx}-${Math.random()}`}
            >
              <div role="button" className="pb-8 flex flex-col">
                {" "}
                <Link
                  target="_blank"
                  href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
                    char?.hanzi
                  )}`}
                >
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {currentPhrase?.pinyin || currentPhrase?.roman}
                  </span>
                </Link>
                <span className="text-gray-500 dark:text-gray-300">
                  {currentPhrase?.hanzi
                    ?.split("")
                    ?.map((val: string, idy: number) => {
                      const color = calculateColor({
                        tone: selectedComp?.tone_level,
                      });

                      return (
                        <span
                          key={`${idx}-${val}-${idx}-${idy}-${idy}-${idx}`}
                          onClick={() => {
                            // setSelectedChar(val);
                            console.log("yoo 3");
                            router.push(`/nmm/${val}`);
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

              {currentPhrase?.audio ? (
                <div className="text-white"> Audio </div>
              ) : null}
            </div>
          );
        })}

        <div className="space-y-2 w-full">
          {sentences?.map((sentence: any) => {
            return (
              <HanziViewer
                key={sentence?.id}
                {...props}
                currentPhrase={sentence}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
