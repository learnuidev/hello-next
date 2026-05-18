"use client";

import { GrammarAnalysis } from "../../grammar-analysis";
import { Summary } from "../../summary/summary";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useSelectedCharacterData } from "@/components/use-selected-character";
import { cn } from "@/lib/utils";
import {
  CharacterLearningContext,
  useCharacterLearningContext,
} from "./character-learning-context";
import { CharacterOverviewViewSidebar } from "./character-overview-sidebar";
import { CharacterVariantSummary } from "./character-variant-summary";
import { SelectedCharacterHeader } from "./selected-character-header";

import { useGetSelectedCharacterParams } from "./use-get-selected-character-params";

import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { isSentence } from "@/libs/utils/is-sentence";
import { CharacterSentenceTransformations } from "../character-sentence-transformations";
import { SentenceItem } from "../sentence-item";
import { AdvancedSearchView } from "./advanced-search-view/advanced-search-view";
import { AntonymsView } from "./antonyms-view";
import { SynonymsView } from "./synonyms-view";
import { useGetCharacterLearningContext } from "./use-get-character-learning-context";

export const CharacterOverviewView = ({
  characterId,
}: {
  characterId: string;
}) => {
  const { data } = useSelectedCharacterData({ characterId });

  const { selectedComp, selectedChar, lang } = data;

  const { variant } = useGetSelectedCharacterParams();

  const _isSentence = isSentence(characterId);

  const items = useGetCharacterLearningContext({ lang, characterId });

  const { data: sentences } = useListSentencesQuery({
    component: characterId,
    lang,
  });

  const characterLearningContext = useCharacterLearningContext({ characterId });

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

                        <TabsTrigger
                          value="grammar-analysis"
                          className="px-0 data-[state=active]:text-black data-[state=active]:dark:text-white text-gray-500 data-[state=active]:font-bold"
                        >
                          Grammar
                        </TabsTrigger>

                        {characterLearningContext?.length > 0 && (
                          <TabsTrigger
                            value="learning-context"
                            className="px-0 data-[state=active]:text-black data-[state=active]:dark:text-white text-gray-500 data-[state=active]:font-bold"
                          >
                            Learning Context
                          </TabsTrigger>
                        )}

                        {characterId?.length <= 4 && (
                          <TabsTrigger
                            value="synonyms"
                            className="px-0 data-[state=active]:text-black data-[state=active]:dark:text-white text-gray-500 data-[state=active]:font-bold"
                          >
                            Synonyms
                          </TabsTrigger>
                        )}

                        {characterId?.length <= 4 && (
                          <TabsTrigger
                            value="antonyms"
                            className="px-0 data-[state=active]:text-black data-[state=active]:dark:text-white text-gray-500 data-[state=active]:font-bold"
                          >
                            Antonyms
                          </TabsTrigger>
                        )}

                        {items?.length > 0 && (
                          <TabsTrigger
                            value="content-sentences"
                            className="px-0 data-[state=active]:text-black data-[state=active]:dark:text-white text-gray-500 data-[state=active]:font-bold block sm:hidden"
                          >
                            Content Examples
                          </TabsTrigger>
                        )}

                        <TabsTrigger
                          value="sentences"
                          className="px-0 data-[state=active]:text-black data-[state=active]:dark:text-white text-gray-500 data-[state=active]:font-bold block sm:hidden"
                        >
                          Sentences
                        </TabsTrigger>
                        {_isSentence && (
                          <TabsTrigger
                            value="sentence-transformations"
                            className="px-0 data-[state=active]:text-black data-[state=active]:dark:text-white text-gray-500 data-[state=active]:font-bold block sm:hidden"
                          >
                            句子变换
                          </TabsTrigger>
                        )}

                        <TabsTrigger
                          value="search"
                          className="px-0 data-[state=active]:text-black data-[state=active]:dark:text-white text-gray-500 data-[state=active]:font-bold"
                        >
                          Advanced Search
                        </TabsTrigger>
                      </TabsList>
                    )}
                  </div>

                  <TabsContent value="overview">
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
                  <TabsContent value="content-sentences">
                    <div>
                      {items?.map((item: any) => {
                        return (
                          <SentenceItem
                            key={JSON.stringify(item)}
                            currentPhrase={item}
                            selectedComp={selectedComp}
                            selectedChar={characterId}
                            lang={item?.lang}
                          />
                        );
                      })}
                    </div>
                  </TabsContent>

                  <TabsContent value="sentences">
                    <div>
                      {sentences?.map((item: any) => {
                        return (
                          <SentenceItem
                            key={JSON.stringify(item)}
                            currentPhrase={item}
                            selectedComp={selectedComp}
                            selectedChar={characterId}
                            lang={item?.lang}
                          />
                        );
                      })}
                    </div>
                  </TabsContent>
                  {_isSentence && (
                    <TabsContent value="sentence-transformations">
                      <CharacterSentenceTransformations
                        lang={lang}
                        characterId={characterId}
                      />
                    </TabsContent>
                  )}

                  <TabsContent value="search">
                    <AdvancedSearchView characterId={characterId} lang={lang} />
                  </TabsContent>

                  {characterId?.length <= 4 && (
                    <TabsContent value="synonyms">
                      <SynonymsView characterId={characterId} />
                    </TabsContent>
                  )}

                  {characterId?.length <= 4 && (
                    <TabsContent value="antonyms">
                      <AntonymsView characterId={characterId} />
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
