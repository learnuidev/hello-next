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

import { SubComponentsView } from "./subcomponents-view";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useStoryStore } from "./story-store";
import { StoryEditor } from "./story-editor";
import { RelatedWords } from "./related-words";
import { useListRelatedHSKWords } from "@/hooks/use-list-related-hsk-words";
import { Authenticated } from "../Authenticated";
import { Authenticate } from "../Authenticate";
import { Authenticated2 } from "../Authenticated2";
import { chineseCharacters } from "@/langs/chinese /characters";
import Link from "next/link";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { useSearchQueryStore } from "../search/state";
import { useSelectedCharacterData } from "../use-selected-character";
import { useSearchParams } from "next/navigation";
import { useAddCharacterMutation } from "@/domain/lesson/character.mutations";
import { useGetCharacter } from "@/hooks/use-get-character";

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

  const HskWordView = () => {
    return (
      <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-start">
        {relatedHskWords
          ?.filter((item) => (item?.hanzi || item?.input)?.length <= 4)
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
  const HskSentenceView = () => {
    const query = useSearchQueryStore((state) => state.query);

    const addHistoryMutation = useAddHistoryMutation();

    return (
      <div className="mt-12 text-black dark:text-white gap-8 grid grid-cols-1 sm:grid-cols-2">
        {relatedHskWords
          ?.filter((item) => (item?.hanzi || item?.input)?.length > 4)
          ?.sort((a, b) => a?.pinyin?.length - b?.pinyin?.length)
          ?.map((prop: any) => {
            return (
              <Link
                href={`/nmm/${prop?.input || prop?.hanzi}?lang=${prop?.lang || lang}`}
                key={JSON.stringify(prop)}
                className="font-extralight text-xl"
                onClick={() => {
                  if (!addHistoryMutation?.isLoading) {
                    addHistoryMutation.mutate({
                      // pathName: routeName,
                      hanzi: prop?.input || prop?.hanzi,
                      lang: prop?.lang || lang,
                      query: query,
                      contentId: prop?.id,
                      eventType: "CONTENT_VIEWED",
                    } as any);
                  }
                }}
              >
                <p className="text-gray-400">{prop?.pinyin}</p>
                <p>{prop?.hanzi}</p>
                <p className="text-gray-500">{prop?.en}</p>
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
    );
  };

  if (view === "words") {
    if (lang === "zh") {
      // return <div>yooo</div>;
      return <HskWordView />;
    }

    return <RelatedWords lang={lang} characterId={characterId} />;
  }
  if (view === "sentences") {
    if (lang === "zh") {
      // return <div>yooo</div>;
      return <HskSentenceView />;
    }

    return <RelatedWords lang={lang} characterId={characterId} />;
  }

  if (view === "story") {
    return (
      <div>
        <div>
          {/* {selectedChar?.length > 3 && ( */}
          <div className="flex items-center justify-between mb-8 mt-4 mr-0 sm:mr-32">
            <div className="flex flex-col items-start space-y-2">
              <h2 className="text-gray-400 font-extralight">{pinyinOrRoman}</h2>

              <h1 className="text-4xl my-0 py-0 font-extralight">
                {selectedComp?.hanzi || selectedChar}
              </h1>

              <h2 className="text-gray-500 font-light">{selectedCompEn}</h2>
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

  const multiSentence =
    pinyinOrRoman?.split(".")?.length > 1 ||
    pinyinOrRoman?.split("?")?.length > 1;

  // const

  return (
    // <Authenticated2>
    <div
      className={
        "relative grid grid-cols-1 md:grid-cols-8 gap-x-8 md:grid-rows-[70px_1fr] pt-0"
      }
    >
      <div className={"col-span-5 row-span-2 overflow-hidden"}>
        {/* {selectedChar?.length > 3 && ( */}

        {view === "zoom" ? (
          <div>
            <ZoomedCharacter characterId={characterId} />{" "}
          </div>
        ) : (
          <div className="flex items-center justify-between mb-8 mt-4">
            <div className="flex flex-col items-start space-y-2">
              <h2 className="text-gray-400 font-extralight">{pinyinOrRoman}</h2>

              {lang === "zh" && multiSentence ? (
                <h1 className="text-xl my-0 py-0 font-extralight">
                  {selectedCompInput}
                </h1>
              ) : (
                <h1 className="text-4xl my-0 py-0 font-extralight">
                  {selectedCompInput}
                </h1>
              )}

              <h2 className="text-gray-500 font-light">{selectedCompEn}</h2>
            </div>

            {selectedComp?.audio ? (
              <AudioComponent currentPhrase={selectedComp} />
            ) : null}
          </div>
        )}

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
      )}
    </div>
    // </Authenticated2>
  );
};
