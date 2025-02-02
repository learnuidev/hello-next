"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useListContentsQuery } from "@/domain/content/content.queries";
import { useDiscoverMutation } from "@/domain/nmm/discover.mutations";
import { Icons } from "../ui/icons.v2";
import { useSelectedCharacterData } from "../use-selected-character";
import { SelectedCharacterProps } from "./select-character.types";
import { SentenceItem } from "./sentence-item";

import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useContentViewStore } from "./use-content-view-store";
import { useListCharacterSentences } from "./use-list-character-sentences";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { AnimatedLoadingText } from "../animated-loading-text";
import { Nothing } from "@/app/nmm/nothing";
import { useListPublishedContentsQuery } from "@/app/(auth)/convos/[content-id]/hooks/use-list-published-contents-query";

const ContentSentences = ({
  characterId,

  ...props
}: SelectedCharacterProps) => {
  const { data: contentItems } = useListPublishedContentsQuery({});

  const contents = contentItems?.items;
  const searchParams = useSearchParams();

  const view = useContentViewStore((state) => state.view);
  const setView = useContentViewStore((state) => state.setView);

  const searchParamsLang = useGetCurrentLang();

  const lang = props?.lang || searchParamsLang;

  const allSentences = useListCharacterSentences(characterId);

  const contentTitles = useMemo(
    () => [
      { title: "all" },
      ...(contents || [])?.filter((c: any) =>
        JSON.stringify(c)?.includes(characterId)
      ),
    ],
    [characterId, contents]
  );

  return (
    <div>
      <div>
        <Select
          value={view}
          onValueChange={(topic) => {
            setView(topic);
          }}
        >
          <SelectTrigger className="w-[320px] text-xs dark:border-gray-800">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent className="bg-black dark:border-gray-900 w-[300px] text-xs">
            <SelectGroup>
              <SelectLabel>Contents</SelectLabel>

              {contentTitles?.map((topic: any) => {
                return (
                  <SelectItem
                    value={topic?.title}
                    key={topic?.title}
                    className="text-xs dark:hover:text-white data-[state=unchecked]:dark:text-gray-500 transition data-[state=checked]:text-white"
                  >
                    {topic?.title} {topic?.lang ? `[${topic?.lang}]` : ""}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
          {allSentences?.slice(0, 100)?.map((sentence: any) => {
            const resolvedLang = sentence?.lang || lang;
            return (
              <SentenceItem
                key={sentence?.id}
                {...props}
                lang={resolvedLang === "zh-CN" ? "zh" : resolvedLang}
                currentPhrase={sentence}
              />
            );
          })}
        </div>
      </div>

      {/* <section>
        <code>
          <pre>{JSON.stringify(relevantSentences?.length, null, 2)}</pre>
        </code>
      </section> */}
    </div>
  );
};
const ContentDropdown = ({
  characterId,

  ...props
}: SelectedCharacterProps) => {
  const { data: contentItems } = useListPublishedContentsQuery({});

  const contents = contentItems?.items;
  const searchParams = useSearchParams();

  const view = useContentViewStore((state) => state.view);
  const setView = useContentViewStore((state) => state.setView);

  const slang = useGetCurrentLang();

  const lang = props?.lang || slang;

  const filteredContents = contents?.filter((content: any) => {
    if (view === "all") {
      // if (lang) {
      //   return content?.lang === lang;
      // }

      return true;
    }

    return content?.title === view;
  });

  const allSentences = filteredContents
    ?.map((content: any) => content?.transcriptions)
    ?.flat()
    ?.sort(
      (a: any, b: any) => JSON.stringify(a)?.length - JSON.stringify(b)?.length
    )
    ?.filter((item: any) => JSON.stringify(item)?.includes(characterId));

  const contentTitles = useMemo(
    () => [
      { title: "all" },
      ...(contents || [])?.filter((c: any) =>
        JSON.stringify(c)?.includes(characterId)
      ),
    ],
    [characterId, contents]
  );

  return (
    <div>
      <div>
        <Select
          value={view}
          onValueChange={(topic) => {
            setView(topic);
          }}
        >
          <SelectTrigger className="w-[320px] text-xs dark:border-gray-800">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent className="bg-black dark:border-gray-900 w-[300px] text-xs">
            <SelectGroup>
              <SelectLabel>Contents</SelectLabel>

              {contentTitles?.map((topic: any) => {
                return (
                  <SelectItem
                    value={topic?.title}
                    key={topic?.title}
                    className="text-xs dark:hover:text-white data-[state=unchecked]:dark:text-gray-500 transition data-[state=checked]:text-white"
                  >
                    {topic?.title} {topic?.lang ? `[${topic?.lang}]` : ""}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
          {allSentences?.slice(0, 100)?.map((sentence: any) => {
            const resolvedLang = sentence?.lang || lang;
            return (
              <SentenceItem
                key={sentence?.id}
                {...props}
                lang={resolvedLang === "zh-CN" ? "zh" : resolvedLang}
                currentPhrase={sentence}
              />
            );
          })}
        </div>
      </div>

      {/* <section>
        <code>
          <pre>{JSON.stringify(relevantSentences?.length, null, 2)}</pre>
        </code>
      </section> */}
    </div>
  );
};

export const CharacterSentences = (props: { characterId: string }) => {
  const { data } = useSelectedCharacterData({
    characterId: props?.characterId,
  });

  const { data: components } = useListComponents();

  const {
    uniqueAnswerIds,
    answerMap,
    allContents,
    selectedComp,
    selectedChar,
    characterId,
    lang,
  } = data;
  const discoverMutation = useDiscoverMutation();

  const router = useRouter();

  const searchParams = useSearchParams();

  const sentenceView = searchParams.get("sentence-view") || "ai";

  const { data: contentItems } = useListPublishedContentsQuery({});

  const contents = contentItems?.items;

  const allSentences = useListCharacterSentences(props.characterId);

  const contentLang = searchParams.get("content") || "";

  const {
    data: sentences,
    isLoading,
    isError,
  } = useListSentencesQuery({
    component: characterId,
    lang,
    contentLang,
  });

  if (isLoading) {
    return (
      <div className="my-4">
        <AnimatedLoadingText
          className="text-xl font-bold"
          message="Generating sentences..."
        />
      </div>
    );
  }

  if (isError) {
    return <Nothing message={"Error loading sentences"} />;
  }

  return (
    <div className="w-full">
      <Tabs
        defaultValue="ai"
        className="p-0"
        value={sentenceView}
        onValueChange={(value) => {
          router.push(
            `/nmm/${characterId}/${lang ? `?lang=${lang}` : ""}${lang ? `&sentence-view=${value}` : `?sentence-view=${value}`}`
          );
        }}
      >
        <div className="mt-2 flex justify-between items-center">
          {allSentences !== undefined && allSentences?.length > 0 && (
            <TabsList className="space-x-8">
              {(contents || [])?.length > 0 && (
                <TabsTrigger
                  value="content"
                  className="px-0 dark:data-[state=active]:text-white data-[state=active]:text-black text-gray-700 dark:text-gray-400"
                >
                  <Icons.content className="text-2xl" />
                </TabsTrigger>
              )}

              {uniqueAnswerIds?.length > 0 && (
                <TabsTrigger
                  value="answers"
                  className="px-0 dark:data-[state=active]:text-white data-[state=active]:text-black text-gray-700 dark:text-gray-400"
                >
                  <Icons.info className="text-2xl" />
                </TabsTrigger>
              )}

              <TabsTrigger
                value="ai"
                className="px-0 dark:data-[state=active]:text-white data-[state=active]:text-black text-gray-700 dark:text-gray-400"
              >
                <Icons.ai className="text-2xl" />
              </TabsTrigger>
            </TabsList>
          )}

          <div className="space-x-4"></div>
        </div>

        <TabsContent value="answers" className="my-2">
          {uniqueAnswerIds?.map((id: any, idx: number) => {
            const char = answerMap?.[id] || {};

            const currentLesson = allContents?.find(
              (lesson: any) => lesson?.id === char?.phraseId
            );

            const currentPhrase = allContents?.find(
              (lesson: any) => lesson?.id === char?.phraseId
            );

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
        <TabsContent value="ai" className="my-2">
          <div className="flex justify-start flex-col items-start text-2xl text-gray-700 flex-wrap">
            {sentences?.slice(0, 10)?.map((sentence: any) => {
              return (
                <SentenceItem
                  key={sentence?.id}
                  {...props}
                  currentPhrase={sentence}
                />
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="content" className="my-2">
          <ContentSentences {...data} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
