"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { GrammarAnalysis } from "../../grammar-analysis";
import { Summary } from "../../summary/summary";
import { CharacterSentences } from "../character-sentences";
import { SelectedCharacterProps } from "../select-character.types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useListComponentVariantsQuery } from "@/domain/component/list-component-variants";
import { cn } from "@/lib/utils";
import { CharacterLearningContext } from "./character-learning-context";
import { CharacterVariantSummary } from "./character-variant-summary";
import { SelectedCharacterHeader } from "./selected-character-header";
import { SentenceItemV2 } from "./sentence-item-v2";
import { useGetSelectedCharacterParams } from "./use-get-selected-character-params";
import { StoryEditor } from "./story-editor";
import { useStoryStore } from "./story-store";
import { useEffect } from "react";

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

  const { variant } = useGetSelectedCharacterParams();

  const selectedCompInput =
    selectedComp?.hanzi ||
    selectedComp?.input ||
    selectedComp2?.input ||
    selectedComp2?.hanzi ||
    selectedChar;

  const { data } = useListComponentVariantsQuery({ hanzi: characterId });

  const story = useStoryStore((state: any) => state.story);

  const setStory = useStoryStore((state: any) => state.setStory);

  useEffect(() => {
    if (selectedComp?.story) {
      setStory(selectedComp?.story);
    }
  }, [selectedComp?.story, setStory]);

  return (
    <div
      className={
        "relative grid grid-cols-1 md:grid-cols-8 gap-x-8 md:grid-rows-[70px_1fr] pt-0 pb-32"
      }
    >
      <div
        className={cn(
          "col-span-5 row-span-2 overflow-hidden"
          // "dark:bg-[rgb(11,12,13)] bg-gray-50 px-8 rounded-2xl"
        )}
      >
        <div className="dark:bg-[rgb(11,12,13)] bg-gray-50 sm:p-8 p-2 rounded-2xl">
          <SelectedCharacterHeader {...props} />
        </div>

        <>
          <article>
            <div>
              <div className="">
                <Tabs defaultValue="overview">
                  {/* <Tabs defaultValue="dé"> */}
                  <div className="mb-8">
                    {true && (
                      <TabsList className="space-x-8">
                        <TabsTrigger
                          value="overview"
                          className="px-0 data-[state=active]:text-rose-400 data-[state=active]:font-bold"
                        >
                          Overview
                        </TabsTrigger>
                        {selectedComp && (
                          <TabsTrigger
                            value="learning-context"
                            className="px-0 data-[state=active]:text-rose-400 data-[state=active]:font-bold"
                          >
                            Learning Context
                          </TabsTrigger>
                        )}

                        <TabsTrigger
                          value="grammar-analysis"
                          className="px-0 data-[state=active]:text-rose-400 data-[state=active]:font-bold"
                        >
                          Grammar
                        </TabsTrigger>
                        {selectedComp?.story && (
                          <TabsTrigger
                            value="story"
                            className="px-0 data-[state=active]:text-rose-400 data-[state=active]:font-bold"
                          >
                            Story
                          </TabsTrigger>
                        )}
                      </TabsList>
                    )}
                  </div>

                  <TabsContent value="overview">
                    <div className="dark:bg-[rgb(11,12,13)] bg-gray-50 p-2 sm:px-8 rounded-2xl mt-4">
                      {variant ? (
                        <div className="mt-6">
                          <CharacterVariantSummary />
                        </div>
                      ) : (
                        <Summary
                          showMeanings={true}
                          characterId={characterId}
                        />
                      )}
                    </div>
                  </TabsContent>
                  {selectedComp && (
                    <TabsContent value="learning-context">
                      <CharacterLearningContext selectedComp={selectedComp} />
                    </TabsContent>
                  )}

                  <TabsContent value="grammar-analysis">
                    <GrammarAnalysis
                      contentId={selectedChar}
                      lang={lang || selectedComp?.lang}
                    />
                  </TabsContent>
                  {selectedComp?.story && (
                    <TabsContent value="story">
                      <StoryEditor
                        key={selectedComp?.story}
                        selectedChar={selectedComp}
                        story={story}
                      />
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </div>
          </article>
        </>
      </div>

      <div className={"col-span-5 md:col-span-3"}>
        {selectedCompInput?.length >= 32 || props?.sentences?.length === 0 ? (
          <GrammarAnalysis
            contentId={selectedChar}
            lang={lang || selectedComp?.lang}
          />
        ) : (
          <div className="shadows-sm shadow-2 shadow-black px-2 bg-gray-100 dark:bg-[rgb(11,12,13)] rounded-2xl overflow-hidden">
            <div className="">
              {" "}
              {sentences?.length > 7 ? (
                <ScrollArea className="hidden md:block space-y-2 h-[700px] rounded-md">
                  <CharacterSentences {...props} />
                </ScrollArea>
              ) : (
                <ScrollArea className="hidden md:block space-y-2 h-[700px] rounded-md">
                  <CharacterSentences {...props} />
                </ScrollArea>
              )}
            </div>

            <div className="md:hidden block">
              <CharacterSentences {...props} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
