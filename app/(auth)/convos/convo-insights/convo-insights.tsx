"use client";

import { SelectedCharacterContainer } from "@/components/selected-character-container";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useSelectedCharacter } from "../use-selected-character";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { HanziLink } from "@/components/hanzi-link";
import { NmmListContainerAll } from "@/components/nmm-list-container-all";
import { useState } from "react";
import { useGetContentInsightsNew } from "../use-get-content-insights.new";
import { useInsightsSettingsStore } from "../use-insights-settings-store";
import { ConvoContextDialog } from "./convo-context-dialog";
import { ConvoInsightOverview } from "./convo-insight-overview";
import { ConvoInsightsFilter } from "./convo-insights-filter";
import { ConvoInsightsHeader } from "./convo-insights-header";
import { ConvoInsightsNoNChinese } from "./convo-insights-non-chinese";
import { TotalPlaysChart } from "./total-plays-chart";

export function ConvoInsights({ contentId }: { contentId: string }) {
  const viewType = useInsightsSettingsStore((state) => state.type);
  const [selected, setSelected] = useState(null);

  const selectedChar = useSelectedCharacter((state: any) => state?.character);

  const { data: lesson, isLoading } = useGetContentQuery({
    contentId: contentId,
  }) as any;

  const lang = lesson?.lang || lesson?.transcriptions?.[0]?.lang;

  const { data } = useGetContentInsightsNew({ contentId });

  if (isLoading || !data) {
    return <LottieLoadingAnimation />;
  }

  const {
    masteryRate,
    understandingRate,
    filteredHskWords,
    uniqueCharactersMemo,
    totalNewCharaters,
    uniqueCharacters,
  } = data;

  return selectedChar ? (
    <SelectedCharacterContainer characterId={selectedChar} />
  ) : (
    <div className="max-w-6xl m-auto mt-12">
      <ConvoInsightOverview contentId={contentId} />

      <TotalPlaysChart contentId={contentId} />

      <ConvoInsightsNoNChinese contentId={contentId}>
        <div className="w-full px-4 my-4 md:my-8">
          {selected && (
            <ConvoContextDialog
              selected={selected}
              contentId={contentId}
              isOpen={!!selected}
              closeDialog={() => {
                setSelected(null);
              }}
            />
          )}
          <div>
            <ConvoInsightsHeader
              totalCharacters={uniqueCharacters?.length}
              newCharacters={uniqueCharacters?.length - totalNewCharaters}
              masteryRate={masteryRate}
              understandingRate={understandingRate}
            />

            <ConvoInsightsFilter />

            {viewType === "character" && (
              <div className="my-8">
                <NmmListContainerAll>
                  {uniqueCharactersMemo.map((char: any, idx: number) => {
                    if (char.isLearned) {
                      return (
                        <HanziLink
                          onClick={() => {
                            setSelected(char);
                          }}
                          frequency={char?.frequency}
                          character={{
                            ...char,
                            input: char?.hanzi || char?.input,
                            hanzi: char?.hanzi || char?.input,
                          }}
                          key={`${char?.hanzi}-chars-${idx}`}
                          lang={lang}
                        />
                      );
                    } else {
                      const newChar: any = {
                        input: char?.hanzi || char?.input,
                        hanzi: char?.hanzi || char?.input,
                        hskLevel: 9,
                        pinyin: "",
                        en: "",
                      };
                      return (
                        <HanziLink
                          onClick={() => {
                            setSelected(newChar);
                          }}
                          lang={lang}
                          frequency={char?.frequency}
                          character={newChar}
                          key={`${char?.input}-chars-${idx}`}
                        />
                      );
                    }
                  })}
                </NmmListContainerAll>
              </div>
            )}

            {viewType === "word" && (
              <div className="my-8">
                <NmmListContainerAll className="gap-4">
                  {filteredHskWords?.map((char: any, idx: number) => {
                    return (
                      <HanziLink
                        lang={lang}
                        frequency={char?.frequency}
                        character={char}
                        key={`${char?.hanzi}-chars-${idx}`}
                      />
                    );
                  })}
                </NmmListContainerAll>
              </div>
            )}
          </div>
        </div>
      </ConvoInsightsNoNChinese>
    </div>
  );
}
