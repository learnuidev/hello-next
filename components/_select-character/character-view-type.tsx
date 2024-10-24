"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect } from "react";
import { Summary } from "../summary";
import { Icons } from "../ui/icons.v2";
import { GrammarAnalysis } from "../grammar-analysis";
import { SelectedCharacterProps } from "./select-character.types";
import { CharacterSentences } from "./character-sentences";

import { AudioComponent } from "./audio-component";
import { useShowsStore, WordItem } from "../word-item";

import { SubComponentsView } from "./subcomponents-view";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useStoryStore } from "./story-store";
import { StoryEditor } from "./story-editor";
import { RelatedWords } from "./related-words";
import { useListRelatedHSKWords } from "@/hooks/use-list-related-hsk-words";

import { chineseCharacters } from "@/langs/chinese /characters";
import Link from "next/link";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { useSearchQueryStore } from "../search/state";
import { useSelectedCharacterData } from "../use-selected-character";
import { useSearchParams } from "next/navigation";
import { useAddCharacterMutation } from "@/domain/lesson/character.mutations";
import { useGetCharacter } from "@/hooks/use-get-character";
import { useReadModeStore } from "@/stores/use-readmode-store";
import { usePaginationStore } from "@/stores/use-pagination-store";
import { useListSuperComponentsQuery } from "@/domain/component/super-component.queries";

import { RelatedHskWords } from "./related-hsk-words";
import { AddAudioButton } from "./add-audio-button";

import { PinyinView } from "./pinyin-view";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";
import { cn } from "@/lib/utils";
import { CharacterAnalytics } from "@/components/_select-character/character-analytics";
import { StoryView } from "./story-view";
import { CharacterTitle } from "./character-title";

const HskSuperComponentsWordView = ({
  componentId,
}: {
  componentId: string;
}) => {
  const { data: superComponents_ } = useListSuperComponentsQuery({
    componentId,
  });

  const superComponents = superComponents_ as any;

  return (
    <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap">
      {superComponents
        // ?.sort((a: any, b: any) => (a?.en?.length || 0) - (b?.en?.length || 0))
        ?.sort((a: any, b: any) => (a?.level || 20000) - (b?.level || 20000))
        ?.map((prop: any) => {
          return (
            <WordItem
              lang={prop?.lang}
              component={prop}
              key={JSON.stringify(prop)}
            />
          );
        })}
    </div>
  );
};

const hanziToSentences = (hanzi: string) =>
  hanzi
    .split("。")
    .filter(Boolean)
    .map((x) => `${x}。`)
    .map((item) => {
      const hasQuestion = item?.split("？");
      if (hasQuestion) {
        return item?.split("？").map((item) => {
          return item?.includes("。") ? item : `${item}？`;
        });
      }
    })
    .flat()
    .map((item) => {
      return {
        input: item,
        hanzi: item,
        lang: "zh",
      };
    });

const ZoomedCharacterItem = ({
  sentence,
}: {
  sentence: { input: string; hanzi: string; lang: string };
}) => {
  const addCharacterMutation = useAddCharacterMutation();

  const character = useGetCharacter({ characterId: sentence?.input });

  if (!character) {
    return (
      <div className="text-extralight">
        <p> {sentence?.input}</p>

        <button
          disabled={addCharacterMutation.isLoading}
          onClick={() => {
            addCharacterMutation?.mutateAsync({
              lang: sentence?.lang,
              status: "DISCOVERED",
              story: "todo",
              hanzi: sentence?.input,
              journeyId: "default",
            });
          }}
        >
          {addCharacterMutation.isLoading ? (
            <Icons.spinner spinPulse />
          ) : addCharacterMutation.isSuccess ? (
            <Icons.checkCircle className="transition" />
          ) : (
            <Icons.discover />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="font-light text-lg">
      <p className="font-light text-gray-400">{character?.pinyin}</p>
      <p className="font-light"> {sentence?.input}</p>

      <p className="font-extralight text-gray-500">{character?.en}</p>
    </div>
  );
};

const ZoomedCharacter = ({ characterId }: { characterId: string }) => {
  const sents = hanziToSentences(characterId) as {
    input: string;
    hanzi: string;
    lang: string;
  }[];

  return (
    <div className="space-y-12 mt-12">
      {sents?.map((item) => {
        return (
          <ZoomedCharacterItem key={JSON.stringify(item)} sentence={item} />
        );
      })}
    </div>
  );
};

export const CharacterViewType = (props: SelectedCharacterProps) => {
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

  const selected = selectedComp2 || selectedComp;

  // const characterId = traditionalToSimplified(characterId_);
  // const selectedChar = traditionalToSimplified(selectedChar_);

  const level = selectedComp?.level || selectedComp2?.level;
  const toneLevel = selectedComp?.tone_level || selectedComp2?.tone_level;
  const initial = selectedComp?.initial || selectedComp2?.initial;
  const final = selected?.final || selectedComp2?.final;
  const { data } = useListCharactersQuery();

  const learnedChar = data?.filter(
    (item: any) => item?.input === characterId
  )?.[0];

  const offlineCharacter = chineseCharacters?.find(
    (char) => char?.hanzi === characterId || char?.input === characterId
  );

  const { data: characterData } = useSelectedCharacterData({ characterId });

  const searchParams = useSearchParams();

  // const lang = searchParams.get("lang") || "";

  // const { selectedChar, setView, view } = characterData;

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

  const story = useStoryStore((state: any) => state.story);

  const setStory = useStoryStore((state: any) => state.setStory);

  useEffect(() => {
    if (selectedComp?.story) {
      setStory(selectedComp?.story);
    }
  }, [selectedComp?.story, setStory]);

  const { data: relatedHskWords } = useListRelatedHSKWords(characterId);

  const HskSentenceView = () => {
    const query = useSearchQueryStore((state) => state.query);

    const brightMode = useBrightModeStore((state: any) => state.mode);

    // const readMode = useReadModeStore((state) => state.readMode);

    const pagination = usePaginationStore((state) => state.pagination);
    const setPagination = usePaginationStore((state) => state.setPagination);

    const shows = useShowsStore((state) => state.shows) as any;
    const setShows = useShowsStore((state) => state.setShows) as any;
    const readMode = useReadModeStore((state) => state.readMode);

    const addHistoryMutation = useAddHistoryMutation();

    const relatedSentences = relatedHskWords
      ?.filter((item) => (item?.hanzi || item?.input)?.length > 4)
      ?.sort((a, b) => a?.pinyin?.length - b?.pinyin?.length);

    const totalSentencs = Math.ceil(relatedSentences?.length / 10);

    const options = Array(totalSentencs)
      .fill(1)
      .map((val, idx) => {
        return {
          start: idx === 0 ? idx : idx * 10,
          end: (1 + idx) * 10,
        };
      });

    const sliced = relatedSentences?.slice(
      pagination?.start || 0,
      pagination?.end || 10
    );

    return (
      <div>
        <div className="flex justify-center mt-8">
          {options?.map((option) => {
            return (
              <button
                key={JSON.stringify(option)}
                onClick={() => {
                  setPagination(option);
                }}
                className={`mx-4 my-2 text-xl dark:hover:text-white font-extralight text-black`}
              >
                <div
                  className={`${
                    pagination?.start === option?.start
                      ? "text-slate-300 dark:text-slate-900 bg-slate-200 hover:bg-white"
                      : "text-slate-900 bg-slate-500 hover:bg-white"
                  } h-2 w-2 rounded-full transition`}
                ></div>
              </button>
            );
          })}
        </div>

        {sliced?.length > 5 ? (
          <div className="mt-12 text-black dark:text-white gap-8 grid grid-cols-1 sm:grid-cols-3">
            {sliced?.map((prop: any) => {
              const show = shows?.[prop?.hanzi];

              const setShow = (show: boolean) => {
                setShows({ ...shows, [prop?.hanzi]: show });
              };

              return (
                <Link
                  href={`/nmm/${prop?.input || prop?.hanzi}?lang=${prop?.lang || lang}`}
                  key={JSON.stringify(prop)}
                  className="font-extralight text-xl"
                  onClick={() => {
                    if (!addHistoryMutation?.isLoading) {
                      // addHistoryMutation.mutate({
                      //   // pathName: routeName,
                      //   hanzi: prop?.input || prop?.hanzi,
                      //   lang: prop?.lang || lang,
                      //   query: query,
                      //   contentId: prop?.id,
                      //   eventType: "CONTENT_VIEWED",
                      // } as any);
                    }
                  }}
                >
                  {brightMode || show || readMode ? (
                    <p className="text-gray-400 text-sm fade-in-100 transition">
                      {prop?.pinyin}
                    </p>
                  ) : (
                    <p className="text-black text-sm">{prop?.pinyin}</p>
                  )}
                  <p
                    onClick={() => {
                      setShow(!!show);
                    }}
                    onMouseEnter={() => {
                      setShow(true);
                    }}
                    onMouseLeave={() => {
                      setShow(false);
                    }}
                  >
                    {prop?.hanzi}
                  </p>
                  {brightMode || show || readMode ? (
                    <p className="text-gray-500 text-sm transition fade-in-100">
                      {prop?.en}
                    </p>
                  ) : (
                    <p className="text-black text-sm">{prop?.en}</p>
                  )}
                </Link>
              );
              // return (
              //   <WordItem
              //     lang={lang}
              //     component={prop}
              //     key={JSON.stringify(prop)}
              //   />
              // );
            })}
          </div>
        ) : (
          <div className="mt-12 text-black dark:text-white gap-8 grid grid-cols-1 mx-0 md:mx-36">
            {sliced?.map((prop: any) => {
              const show = shows?.[prop?.hanzi];

              const setShow = (show: boolean) => {
                setShows({ ...shows, [prop?.hanzi]: show });
              };

              return (
                <Link
                  href={`/nmm/${prop?.input || prop?.hanzi}?lang=${prop?.lang || lang}`}
                  key={JSON.stringify(prop)}
                  className="font-extralight text-xl"
                  onClick={() => {
                    // if (!addHistoryMutation?.isLoading) {
                    //   addHistoryMutation.mutate({
                    //     // pathName: routeName,
                    //     hanzi: prop?.input || prop?.hanzi,
                    //     lang: prop?.lang || lang,
                    //     query: query,
                    //     contentId: prop?.id,
                    //     eventType: "CONTENT_VIEWED",
                    //   } as any);
                    // }
                  }}
                >
                  {brightMode || show || readMode ? (
                    <p className="text-gray-400 text-sm fade-in-100 transition">
                      {prop?.pinyin}
                    </p>
                  ) : (
                    <p className="text-black text-sm">{prop?.pinyin}</p>
                  )}
                  <p
                    onClick={() => {
                      setShow(!!show);
                    }}
                    onMouseEnter={() => {
                      setShow(true);
                    }}
                    onMouseLeave={() => {
                      setShow(false);
                    }}
                  >
                    {prop?.hanzi}
                  </p>
                  {brightMode || show || readMode ? (
                    <p className="text-gray-500 text-sm transition fade-in-100">
                      {prop?.en}
                    </p>
                  ) : (
                    <p className="text-black text-sm">{prop?.en}</p>
                  )}
                </Link>
              );
              // return (
              //   <WordItem
              //     lang={lang}
              //     component={prop}
              //     key={JSON.stringify(prop)}
              //   />
              // );
            })}
          </div>
        )}
      </div>
    );
  };

  if (view === "super-components") {
    return <HskSuperComponentsWordView componentId={characterId} />;
  }

  if (view === "pinyin") {
    return <PinyinView characterId={characterId} />;
  }

  if (view === "words") {
    return <RelatedHskWords characterId={characterId} lang={lang} />;
  }

  if (view === "analytics") {
    return (
      <div>
        <CharacterAnalytics characterId={characterId} lang={lang} />
      </div>
    );
  }
  if (view === "sentences") {
    return <HskSentenceView />;
    if (lang === "zh") {
      // return <div>yooo</div>;
      return <HskSentenceView />;
    }

    return <RelatedWords lang={lang} characterId={characterId} />;
  }

  if (view === "story") {
    return <StoryView {...props} />;
  }

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

      {selectedCompInput?.length > 32 ? (
        <div className="col-span-3">
          <GrammarAnalysis
            contentId={selectedChar}
            lang={lang || selectedComp?.lang}
          />
        </div>
      ) : (
        <div className="col-span-3">
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
    // </Authenticated2>
  );
};
