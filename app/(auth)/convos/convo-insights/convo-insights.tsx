"use client";

import { SelectedCharacterContainer } from "@/components/selected-character-container";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useSelectedCharacter } from "../use-selected-character";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { HanziLink } from "@/components/hanzi-link";
import { NmmListContainerAll } from "@/components/nmm-list-container-all";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useInsightsSettingsStore } from "../use-insights-settings-store";
import { ConvoContextDialog } from "./convo-context-dialog";
import { ConvoInsightsNoNChinese } from "./convo-insights-non-chinese";
import { ConvoInsightsTabs } from "./convo-insights-tabs";
import { ConvoInsightsCharacterTab } from "./convo-insights-character-tab";
import { ConvoInsightsWordTab } from "./convo-insights-word-tab";
import { ConvoInsightsUnknownTab } from "./convo-insights-unknown-tab";
import { TotalPlaysChart } from "./total-plays-chart";

export function ConvoInsights({ contentId }: { contentId: string }) {
  const viewType = useInsightsSettingsStore((state) => state.type);
  const [selected, setSelected] = useState(null);

  const selectedChar = useSelectedCharacter((state: any) => state?.character);

  const { data: lesson, isLoading } = useGetContentQuery({
    contentId: contentId,
  }) as any;

  const lang = lesson?.lang || lesson?.transcriptions?.[0]?.lang;

  if (isLoading) {
    return <LottieLoadingAnimation />;
  }

  return selectedChar ? (
    <SelectedCharacterContainer characterId={selectedChar} />
  ) : (
    <div className="px-2 sm:px-12 mt-12">
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
            <div className="mb-0 sm:mb-8">
              <ConvoInsightsTabs />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={viewType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {viewType === "character" && (
                  <ConvoInsightsCharacterTab
                    contentId={contentId}
                    lang={lang}
                    onCharacterClick={(char: any) => setSelected(char)}
                  />
                )}

                {viewType === "word" && (
                  <ConvoInsightsWordTab
                    contentId={contentId}
                    lang={lang}
                    onWordClick={(word: any) => setSelected(word)}
                  />
                )}

                {viewType === "sentence" && (
                  <div className="my-8 text-center text-gray-500 dark:text-gray-400">
                    <p>句子功能即将推出...</p>

                    <TotalPlaysChart contentId={contentId} />
                  </div>
                )}

                {viewType === "unknown" && (
                  <ConvoInsightsUnknownTab
                    contentId={contentId}
                    lang={lang}
                    onCharacterClick={(char: any) => setSelected(char)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </ConvoInsightsNoNChinese>
    </div>
  );
}
