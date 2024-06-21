"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { calculateColor } from "@/app/nmm/utils";
import { cleanString } from "@/data/convos/bm1/utils";
import { useDiscoverMutation } from "@/domain/nmm/discover.mutations";
import { SelectedCharacterProps } from "./select-character.types";
import { HanziViewer } from "./hanzi-viewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "../ui/icons.v2";
import { useListContentsQuery } from "@/domain/content/content.queries";

const ContentSentences = ({
  characterId,

  ...props
}: SelectedCharacterProps) => {
  const { data: contents } = useListContentsQuery();
  const searchParams = useSearchParams();

  const lang = props?.lang || searchParams.get("lang") || "";

  const relevantSentences = contents
    ?.map((content: any) => content?.transcriptions)
    ?.flat()
    ?.sort(
      (a: any, b: any) => JSON.stringify(a)?.length - JSON.stringify(b)?.length
    )
    ?.filter((item: any) => JSON.stringify(item)?.includes(characterId));

  return (
    <div>
      <div className="flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
        {relevantSentences?.slice(0, 100)?.map((sentence: any) => {
          return (
            <HanziViewer
              key={sentence?.id}
              {...props}
              lang={lang}
              currentPhrase={sentence}
            />
          );
        })}
      </div>

      {/* <section>
        <code>
          <pre>{JSON.stringify(relevantSentences?.length, null, 2)}</pre>
        </code>
      </section> */}
    </div>
  );
};

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
    characterId,
    lang,
    sentences,
    addHistoryMutation,
  } = props;
  const discoverMutation = useDiscoverMutation();

  const router = useRouter();

  const { data: contents } = useListContentsQuery();

  return (
    <div className="w-full">
      <Tabs defaultValue="ai" className="p-0">
        <div className="mt-8 flex justify-between items-center">
          <TabsList className="space-x-8">
            {contents?.length > 0 && (
              <TabsTrigger
                value="content"
                className="px-0 data-[state=active]:text-white text-gray-400"
              >
                <Icons.content className="text-2xl" />
              </TabsTrigger>
            )}

            {uniqueAnswerIds?.length > 0 && (
              <TabsTrigger
                value="answers"
                className="px-0 data-[state=active]:text-white text-gray-400"
              >
                <Icons.info className="text-2xl" />
              </TabsTrigger>
            )}

            <TabsTrigger
              value="ai"
              className="px-0 data-[state=active]:text-white text-gray-400"
            >
              <Icons.ai className="text-2xl" />
            </TabsTrigger>
          </TabsList>

          <div className="space-x-4"></div>
        </div>

        <TabsContent value="answers" className="my-8">
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

                                router.push(
                                  `/nmm/${val}${lang ? `?lang=${lang}` : ""}`
                                );

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

                            <button
                              onClick={() => {
                                // addHistoryMutation.mutate({
                                //   hanzi: val,
                                //   lang: lang,
                                //   pathName: routeName,
                                //   contentId: selectedComp?.id || "",
                                //   eventType: "CONTENT_VIEWED",
                                // } as any);

                                router.push(
                                  `/nmm/${val}${lang ? `?lang=${lang}` : ""}`
                                );

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
        </TabsContent>
        <TabsContent value="ai" className="my-8">
          <div className="flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
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
        </TabsContent>
        <TabsContent value="content" className="my-8">
          <ContentSentences {...props} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
