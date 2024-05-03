"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { calculateColor } from "@/app/nmm/utils";
import { cleanString } from "@/data/convos/bm1/utils";
import { useDiscoverMutation } from "@/domain/nmm/discover.mutations";
import { SelectedCharacterProps } from "./select-character.types";
import { HanziViewer } from "./hanzi-viewer";

export const ReadModeView = (props: SelectedCharacterProps) => {
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
    sentences,
    addHistoryMutation,
  } = props;
  const discoverMutation = useDiscoverMutation();

  const router = useRouter();
  return (
    <div className="w-full">
      <div className="flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
        {uniqueAnswerIds?.map((id: any, idx: number) => {
          const char = answerMap?.[id] || {};

          const currentLesson = allContents?.find(
            (lesson: any) => lesson?.id === char?.phraseId
          );

          const currentPhrase =
            allContents?.find((lesson: any) => lesson?.id === char?.phraseId) ||
            allSteps?.find((step: any) => cleanString(step?.hanzi) === id);

          const currentPhrasePinyin = currentPhrase?.hanzi
            ?.split("")
            ?.filter((item: any) => {
              return components?.find(
                (component: any) => component?.hanzi === item
              );
            })
            .map((item: any) => {
              const currComp = components?.find(
                (component: any) => component?.hanzi === item
              );
              return {
                hanzi: currComp?.hanzi,
                pinyin: currComp?.pinyin || "??",
              };
            });

          return (
            <div
              key={`${idx}-${char?.hanzi}-${idx}-${Math.random()}`}
              className="flex justify-between w-full"
            >
              <div role="button" className="pb-8 flex flex-col">
                <div className="flex flex-row space-x-[1px]">
                  {currentPhrase?.hanzi
                    ?.split("")
                    ?.map((val: string, idy: number) => {
                      const color = calculateColor({
                        tone: selectedComp?.tone_level,
                      });

                      const hanz = currentPhrasePinyin?.find(
                        (x: any) => x?.hanzi === val
                      );

                      return (
                        <div
                          key={`${val}-${idx}-${idx}-${val}`}
                          className={`flex items-center flex-col ${
                            selectedChar === val
                              ? color
                              : "text-gray-400 dark:text-gray-300"
                          }`}
                        >
                          <button
                            onClick={() => {
                              alert("yoo 4");
                              // setSelectedChar(val);
                              router.push(`/nmm/${val}`);

                              if (hanz?.pinyin === "??") {
                                return discoverMutation
                                  .mutateAsync({
                                    hanzi: hanz?.hanzi,
                                  })
                                  .then((resp) => {
                                    console.log("Discovered!!");
                                  });
                              }
                            }}
                            className={`text-sm ${
                              selectedChar === val
                                ? color
                                : "text-gray-500 dark:text-gray-400 "
                            }`}
                          >
                            {hanz?.pinyin?.toLocaleLowerCase()}
                          </button>
                          {/* </Link> */}
                          <button
                            onClick={() => {
                              addHistoryMutation.mutate({
                                hanzi: val,
                                lang: lang,
                                pathName: routeName,
                                contentId: selectedComp?.id || "",
                                eventType: "CONTENT_VIEWED",
                              } as any);

                              router.push(`/nmm/${val}`);

                              if (hanz?.pinyin === "??") {
                                return discoverMutation
                                  .mutateAsync({
                                    hanzi: hanz?.hanzi,
                                  })
                                  .then((resp) => {
                                    console.log("Discovered!!");
                                  });
                              }
                            }}
                          >
                            {hanz?.hanzi}
                          </button>
                        </div>
                      );
                    })}
                </div>
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

        {sentences?.slice(0, 10)?.map((sentence: any) => {
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
  );
};
