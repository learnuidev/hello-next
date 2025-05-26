"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { CharacterSentences } from "../character-sentences";

import { useEffect } from "react";
import { useStoryStore } from "./story-store";

import { useSelectedCharacterData } from "@/components/use-selected-character";
import { create } from "zustand";

const useSideBarViewType = create((set: any, get: any) => ({
  sideBarView: "sentences",
  setSideBarView: (sideBarView: any) => set({ sideBarView }),
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

  return (
    <div className={"col-span-5 md:col-span-3 hidden sm:block"}>
      {/* <div className="space-x-4">
        <button
          className={cn(
            "text-sm transition",
            sideBarView === "grammar"
              ? "dark:text-white text-black"
              : "text-gray-500"
          )}
          onClick={() => {
            setSideBarView("grammar");
          }}
        >
          Grammar
        </button>
        <button
          className={cn(
            "text-sm transition",
            sideBarView === "sentences"
              ? "dark:text-white text-black"
              : "text-gray-500"
          )}
          onClick={() => {
            setSideBarView("sentences");
          }}
        >
          Sentences
        </button>
      </div> */}
      {/* {sideBarView === "grammar" && (
        <GrammarAnalysis
          contentId={selectedChar}
          lang={lang || selectedComp?.lang}
        />
      )} */}
      {sideBarView === "sentences" && (
        <div className="shadows-sm shadow-2 shadow-black px-2 bg-gray-100 dark:bg-[rgb(11,12,13)] rounded-2xl overflow-hidden">
          <div className="">
            {" "}
            {sentences?.length > 7 ? (
              <ScrollArea className="hidden md:block space-y-2 h-[700px] rounded-md">
                <CharacterSentences characterId={characterId} />
              </ScrollArea>
            ) : (
              <ScrollArea className="hidden md:block space-y-2 h-[700px] rounded-md">
                <CharacterSentences characterId={characterId} />
              </ScrollArea>
            )}
          </div>

          <div className="md:hidden block">
            <CharacterSentences characterId={characterId} />
          </div>
        </div>
      )}
    </div>
  );
};
