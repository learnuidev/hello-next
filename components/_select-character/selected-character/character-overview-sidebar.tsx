"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { GrammarAnalysis } from "../../grammar-analysis";
import { CharacterSentences } from "../character-sentences";
import { SelectedCharacterProps } from "../select-character.types";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useStoryStore } from "./story-store";

import { create } from "zustand";

const useSideBarViewType = create((set: any, get: any) => ({
  sideBarView: "grammar",
  setSideBarView: (sideBarView: any) => set({ sideBarView }),
}));

export const CharacterOverviewViewSidebar = (props: SelectedCharacterProps) => {
  const { selectedComp, selectedChar, lang, sentences } = props;

  const sideBarView = useSideBarViewType((state) => state.sideBarView);
  const setSideBarView = useSideBarViewType((state) => state.setSideBarView);

  const setStory = useStoryStore((state: any) => state.setStory);

  useEffect(() => {
    if (selectedComp?.story) {
      setStory(selectedComp?.story);
    }
  }, [selectedComp?.story, setStory]);

  return (
    <div className={"col-span-5 md:col-span-3"}>
      <div className="space-x-4">
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
      </div>
      {sideBarView === "grammar" && (
        <GrammarAnalysis
          contentId={selectedChar}
          lang={lang || selectedComp?.lang}
        />
      )}
      {sideBarView === "sentences" && (
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
  );
};
