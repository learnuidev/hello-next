"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { GrammarAnalysis } from "../../grammar-analysis";
import { Summary } from "../../summary/summary";
import { CharacterSentences } from "../character-sentences";
import { SelectedCharacterProps } from "../select-character.types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SelectedCharacterHeader } from "./selected-character-header";
import { useListComponentVariantsQuery } from "@/domain/component/list-component-variants";
import { SentenceItemV2 } from "./sentence-item-v2";

const grammarTypesToTitle = {
  "v.": "verb",
} as any;

export const CharacterOverviewView = (props: SelectedCharacterProps) => {
  const {
    selectedComp,
    selectedChar,
    lang,
    sentences,
    characterId,
    selectedComp2,
  } = props;

  const selectedCompInput =
    selectedComp?.hanzi ||
    selectedComp?.input ||
    selectedComp2?.input ||
    selectedComp2?.hanzi ||
    selectedChar;

  const { data } = useListComponentVariantsQuery({ hanzi: characterId });

  console.log("DATA", data);

  return (
    <div
      className={
        "relative grid grid-cols-1 md:grid-cols-8 gap-x-8 md:grid-rows-[70px_1fr] pt-0"
      }
    >
      <div className={"col-span-5 row-span-2 overflow-hidden"}>
        <SelectedCharacterHeader {...props} />

        <article>
          <div>
            <div className="mt-8">
              <Tabs defaultValue="overview">
                {/* <Tabs defaultValue="dé"> */}
                <div>
                  <TabsList className="space-x-8">
                    <TabsTrigger
                      value="overview"
                      className="px-0 data-[state=active]:text-yellow-500 data-[state=active]:font-bold"
                    >
                      {" "}
                      Overview
                    </TabsTrigger>
                    {(data || [])?.map((item) => {
                      return (
                        <TabsTrigger
                          key={item?.hanbookId}
                          value={item?.pinyin}
                          className="px-0 data-[state=active]:text-yellow-500 data-[state=active]:font-bold"
                        >
                          {item?.pinyin}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>

                <TabsContent value="overview" className="mt-6">
                  <Summary showMeanings={true} characterId={characterId} />
                </TabsContent>

                {(data || [])?.map((item) => {
                  return (
                    <TabsContent value={item?.pinyin} className="mt-6">
                      <div>
                        <h1 className="text-2xl mb-4">
                          <span>{item?.pinyin}</span> has{" "}
                          <strong>{item?.useCases?.length}</strong> use cases
                        </h1>

                        <div className="space-y-12">
                          {item?.useCases?.map((useCase, idx) => {
                            return (
                              <div key={useCase?.en}>
                                <div>
                                  <h2 className="text-xl font-light">
                                    <span className=""> {idx + 1}. </span>
                                    <span>
                                      <strong>
                                        {grammarTypesToTitle[
                                          useCase?.type as string
                                        ] || useCase?.type}
                                      </strong>
                                    </span>
                                  </h2>

                                  <h3 className="text-gray-400">
                                    {useCase?.en
                                      ?.replaceAll("(", "")
                                      ?.replaceAll(")", "")}
                                  </h3>
                                </div>
                                <div className="mt-4 space-y-4">
                                  {useCase?.sentences?.map((sentence) => {
                                    return (
                                      <SentenceItemV2
                                        className="block"
                                        key={sentence?.hanzi}
                                        {...sentence}
                                        href={`/nmm/${sentence?.hanzi}?lang=zh`}
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {/* <code>
                        <pre>{JSON.stringify(item?.useCases, null, 4)}</pre>
                      </code> */}
                    </TabsContent>
                  );
                })}
              </Tabs>
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

      {selectedCompInput?.length >= 32 ? (
        <div className="col-span-5 md:col-span-3">
          <GrammarAnalysis
            contentId={selectedChar}
            lang={lang || selectedComp?.lang}
          />
        </div>
      ) : (
        <div className="col-span-5 md:col-span-3">
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
  );
};
