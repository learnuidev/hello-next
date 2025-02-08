"use client";

import { GrammarAnalysis } from "../../grammar-analysis";
import { Summary } from "../../summary/summary";
import { SelectedCharacterProps } from "../select-character.types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useListComponentVariantsQuery } from "@/domain/component/list-component-variants";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { CharacterLearningContext } from "./character-learning-context";
import { CharacterOverviewViewSidebar } from "./character-overview-sidebar";
import { CharacterVariantSummary } from "./character-variant-summary";
import { SelectedCharacterHeader } from "./selected-character-header";
import { StoryEditor } from "./story-editor";
import { useStoryStore } from "./story-store";
import { useGetSelectedCharacterParams } from "./use-get-selected-character-params";
import { CharacterSentences } from "../character-sentences";
import { useSelectedCharacterData } from "@/components/use-selected-character";

export const CharacterOverviewView = ({
  characterId,
}: {
  characterId: string;
}) => {
  const { data } = useSelectedCharacterData({ characterId });

  const { selectedComp, selectedChar, lang } = data;

  const { variant } = useGetSelectedCharacterParams();

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
      <div className={cn("col-span-5 row-span-2 overflow-hidden")}>
        <div className="dark:bg-[rgb(11,12,13)] bg-gray-50 sm:p-8 p-2 rounded-2xl">
          <SelectedCharacterHeader characterId={characterId} />
        </div>

        <>
          <article>
            <div>
              <div className="">
                <Tabs defaultValue="overview">
                  <div className="mt-4 overflow-y-auto">
                    {true && (
                      <TabsList className="space-x-8 overflow-y-auto">
                        <TabsTrigger
                          value="overview"
                          className="px-0 data-[state=active]:text-black data-[state=active]:dark:text-white text-gray-500 data-[state=active]:font-bold"
                        >
                          Overview
                        </TabsTrigger>
                        {/* {selectedComp && ( */}
                        <TabsTrigger
                          value="learning-context"
                          className="px-0 data-[state=active]:text-black data-[state=active]:dark:text-white text-gray-500 data-[state=active]:font-bold"
                        >
                          Learning Context
                        </TabsTrigger>
                        {/* )} */}

                        <TabsTrigger
                          value="grammar-analysis"
                          className="px-0 data-[state=active]:text-black data-[state=active]:dark:text-white text-gray-500 data-[state=active]:font-bold"
                        >
                          Grammar
                        </TabsTrigger>
                        <TabsTrigger
                          value="sentences"
                          className="px-0 data-[state=active]:text-black data-[state=active]:dark:text-white text-gray-500 data-[state=active]:font-bold block sm:hidden"
                        >
                          Sentences
                        </TabsTrigger>
                        {selectedComp?.story && (
                          <TabsTrigger
                            value="story"
                            className="px-0 data-[state=active]:text-black data-[state=active]:dark:text-white text-gray-500 data-[state=active]:font-bold"
                          >
                            Story
                          </TabsTrigger>
                        )}
                      </TabsList>
                    )}
                  </div>

                  <TabsContent value="overview">
                    {/* <div className="dark:bg-[rgb(11,12,13)] bg-gray-50 p-2 sm:px-8 rounded-2xl mt-4"> */}
                    <div>
                      {variant ? (
                        <div className="dark:bg-[rgb(11,12,13)] bg-gray-50 p-2 sm:px-8 rounded-2xl mt-4">
                          <div className="mt-6">
                            <CharacterVariantSummary />
                          </div>
                        </div>
                      ) : (
                        <Summary
                          showMeanings={true}
                          characterId={characterId}
                        />
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="learning-context">
                    <CharacterLearningContext
                      selectedComp={selectedComp}
                      characterId={characterId}
                    />
                  </TabsContent>

                  <TabsContent value="grammar-analysis">
                    <GrammarAnalysis
                      contentId={selectedChar}
                      lang={lang || selectedComp?.lang}
                    />
                  </TabsContent>
                  <TabsContent value="sentences">
                    <CharacterSentences characterId={characterId} />
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

      <CharacterOverviewViewSidebar characterId={characterId} />
    </div>
  );
};
