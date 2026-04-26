"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

import { MandoContextMenu } from "@/app/review/review-cloze-content/mando-context-menu";
import { useSelectedCharacterData } from "@/components/use-selected-character";
import { cn } from "@/lib/utils";
import { isSentence } from "@/libs/utils/is-sentence";
import { create } from "zustand";
import { CharacterSentenceTransformations } from "../character-sentence-transformations";
import { useGetCharacterLearningContext } from "./use-get-character-learning-context";
import { useListContentsQuery } from "@/domain/content/content.queries";
import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SentenceItem } from "../sentence-item";
import { Icons } from "@/components/ui/icons.v2";

const useSideBarViewType = create((set: any, get: any) => ({
  sideBarView: "sentences",
  setSideBarView: (sideBarView: any) => set({ sideBarView }),
  selectedContent: "all",
  setSelectedContent: (selectedContent: any) => set({ selectedContent }),
}));

export const CharacterOverviewViewSidebar = ({
  characterId,
}: {
  characterId: string;
}) => {
  const { data: charData } = useSelectedCharacterData({ characterId });

  const { selectedComp, selectedChar, lang, sentences } = charData;

  const sideBarView = useSideBarViewType((state) => state.sideBarView);
  const setSideBarView = useSideBarViewType((state) => state.setSideBarView);
  const selectedContent = useSideBarViewType((state) => state.selectedContent);
  const setSelectedContent = useSideBarViewType(
    (state) => state.setSelectedContent,
  );

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((sentences?.length || 0) / ITEMS_PER_PAGE);
  const paginatedSentences = sentences?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const items = useGetCharacterLearningContext({ lang, characterId });

  const uniqueIds = useMemo(() => {
    const contentIds = items
      ?.map((item: any) => item?.contentId)
      .filter(Boolean);
    return [...new Set(contentIds)] as string[];
  }, [items]);

  const { data: contentItems } = useListContentsQuery({
    contentIds: uniqueIds,
  });

  const uniqueContentTitles = useMemo(() => {
    const contentTitles = contentItems?.items.map((content) => content.title);

    return [
      { title: "all" },
      ...contentTitles.map((title: string) => ({ title })),
    ];
  }, [items, contentItems?.items]);

  const filteredItems = useMemo(() => {
    if (selectedContent === "all") {
      return items;
    }

    const selectedContentItem = contentItems?.items?.find(
      (c: any) => c?.title === selectedContent,
    );

    if (!selectedContentItem) {
      return items;
    }

    return items?.filter(
      (item: any) => item?.contentId === selectedContentItem?.id,
    );
  }, [items, selectedContent, contentItems?.items]);

  const [contentCurrentPage, setContentCurrentPage] = useState(1);
  const contentTotalPages = Math.ceil(
    (filteredItems?.length || 0) / ITEMS_PER_PAGE,
  );
  const paginatedContentItems = filteredItems?.slice(
    (contentCurrentPage - 1) * ITEMS_PER_PAGE,
    contentCurrentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className={"col-span-5 md:col-span-3 hidden sm:block"}>
      <MandoContextMenu lang={lang}>
        <Tabs value={sideBarView} onValueChange={setSideBarView}>
          <TabsList className="space-x-4 mb-4">
            {filteredItems?.length > 0 && (
              <TabsTrigger
                value="content-sentences"
                className="text-sm transition data-[state=active]:dark:text-white data-[state=active]:text-black data-[state=inactive]:text-gray-500"
              >
                Content Examples
              </TabsTrigger>
            )}

            <TabsTrigger
              value="sentences"
              className="text-sm transition data-[state=active]:dark:text-white data-[state=active]:text-black data-[state=inactive]:text-gray-500"
            >
              Sentences
            </TabsTrigger>

            <TabsTrigger
              value="sentence-transformations"
              className="text-sm transition data-[state=active]:dark:text-white data-[state=active]:text-black data-[state=inactive]:text-gray-500"
            >
              句子变换
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sentences">
            <div className="shadows-sm shadow-2 shadow-black px-2 bg-gray-100 dark:bg-[rgb(11,12,13)] rounded-2xl overflow-hidden">
              <div className="">
                <ScrollArea className="hidden md:block space-y-2 h-[600px] rounded-md">
                  <div>
                    {paginatedSentences?.map((item: any) => {
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
                </ScrollArea>

                <div className="md:hidden block">
                  <div>
                    {paginatedSentences?.map((item: any) => {
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
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-between items-center p-4 gap-4">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition",
                        "bg-white dark:bg-black",
                        "border border-gray-200 dark:border-gray-800",
                        "hover:bg-gray-50 dark:hover:bg-gray-900",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                      )}
                    >
                      Previous
                    </button>
                    <span className="text-sm dark:text-gray-400">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={currentPage === totalPages}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition",
                        "bg-white dark:bg-black",
                        "border border-gray-200 dark:border-gray-800",
                        "hover:bg-gray-50 dark:hover:bg-gray-900",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                      )}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content-sentences">
            {uniqueContentTitles?.length > 1 && (
              <div className="mb-4">
                <Select
                  value={selectedContent}
                  onValueChange={(value) => {
                    setSelectedContent(value);
                    setContentCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[320px] text-xs dark:border-gray-800">
                    <SelectValue placeholder="Select content" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-black dark:border-gray-900 w-[300px] text-xs">
                    <SelectGroup>
                      <SelectLabel>Content</SelectLabel>
                      {uniqueContentTitles?.map((topic: any) => {
                        return (
                          <SelectItem
                            value={topic?.title}
                            key={topic?.title}
                            className="text-xs dark:hover:text-white data-[state=unchecked]:dark:text-gray-500 transition dark:data-[state=checked]:text-white"
                          >
                            {topic?.title}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="shadows-sm shadow-2 shadow-black px-2 bg-gray-100 dark:bg-[rgb(11,12,13)] rounded-2xl overflow-hidden">
              <div className="">
                <ScrollArea className="hidden md:block space-y-2 h-[600px] rounded-md">
                  <div>
                    {paginatedContentItems?.map((item: any) => {
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
                </ScrollArea>

                <div className="md:hidden block">
                  <div>
                    {paginatedContentItems?.map((item: any) => {
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
                </div>

                {contentTotalPages > 1 && (
                  <div
                    className="flex justify-between items-center p-4 gap-4"
                    style={{ zIndex: 100000 }}
                  >
                    <button
                      onClick={() =>
                        setContentCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={contentCurrentPage === 1}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition",
                        "bg-white dark:bg-black",
                        "border border-gray-200 dark:border-gray-800",
                        "hover:bg-gray-50 dark:hover:bg-gray-900",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                      )}
                    >
                      <Icons.arrowLeft />
                    </button>
                    <span className="text-sm dark:text-gray-400">
                      {contentCurrentPage} / {contentTotalPages}
                    </span>
                    <button
                      onClick={() =>
                        setContentCurrentPage((prev) =>
                          Math.min(contentTotalPages, prev + 1),
                        )
                      }
                      disabled={contentCurrentPage === contentTotalPages}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition",
                        "bg-white dark:bg-black",
                        "border border-gray-200 dark:border-gray-800",
                        "hover:bg-gray-50 dark:hover:bg-gray-900",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                      )}
                    >
                      <Icons.arrowRight />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sentence-transformations">
            <div className="shadows-sm shadow-2 shadow-black px-2 bg-gray-100 dark:bg-[rgb(11,12,13)] rounded-2xl overflow-hidden">
              <div className="">
                {" "}
                {sentences?.length > 7 ? (
                  <ScrollArea className="hidden md:block space-y-2 h-[600px] rounded-md">
                    <CharacterSentenceTransformations
                      lang={lang}
                      characterId={characterId}
                    />
                  </ScrollArea>
                ) : (
                  <ScrollArea className="hidden md:block space-y-2 h-[600px] rounded-md">
                    <CharacterSentenceTransformations
                      lang={lang}
                      characterId={characterId}
                    />
                  </ScrollArea>
                )}
              </div>

              <div className="md:hidden block">
                <CharacterSentenceTransformations
                  lang={lang}
                  characterId={characterId}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </MandoContextMenu>
    </div>
  );
};
