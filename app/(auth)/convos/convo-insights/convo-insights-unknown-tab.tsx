"use client";

import { ConvoInsightsHskLevelFilter } from "./convo-insights-hsk-level-filter";
import { ConvoInsightsSearch } from "./convo-insights-search";
import { ConvoInsightsUnknownTable } from "./convo-insights-unknown-table";
import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useMemo } from "react";
import { useInsightsSettingsStore } from "../use-insights-settings-store";

export function ConvoInsightsUnknownTab({
  contentId,
  lang,
  onCharacterClick,
}: {
  contentId: string;
  lang: string;
  onCharacterClick: (char: any) => void;
}) {
  const searchQuery = useInsightsSettingsStore((state) => state.searchQuery);
  const hskLevel = useInsightsSettingsStore((state) => state.hskLevel);

  const { data: contentUnknowns } = useListContentUnknownsQuery(contentId);
  const { data: hskWords } = useListHSKWordsQuery();
  const { data: lesson } = useGetContentQuery({ contentId });

  const availableHskLevels = useMemo(() => {
    if (!contentUnknowns?.items) return [];
    const levels = new Set<number>();

    contentUnknowns.items.forEach((item: any) => {
      const hskWord = hskWords?.find((word: any) => word?.hanzi === item?.input);
      if (hskWord?.hskLevel) {
        levels.add(hskWord.hskLevel);
      }
    });

    return Array.from(levels).sort((a, b) => a - b);
  }, [contentUnknowns?.items, hskWords]);

  const hasNaItems = useMemo(() => {
    if (!contentUnknowns?.items) return false;
    return contentUnknowns.items.some((item: any) => {
      const hskWord = hskWords?.find((word: any) => word?.hanzi === item?.input);
      return !hskWord?.hskLevel;
    });
  }, [contentUnknowns?.items, hskWords]);

  const filteredUnknowns = useMemo(() => {
    if (!contentUnknowns?.items) return [];
    let filtered = contentUnknowns.items;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item: any) => {
        return item?.input?.toLowerCase().includes(query);
      });
    }

    const enrichedUnknowns = filtered.map((item: any) => {
      const hskWord = hskWords?.find((word: any) => word?.hanzi === item?.input);
      const itemHskLevel = hskWord?.hskLevel;
      const isCharacter = item?.input?.length === 1;

      const transcriptions = lesson?.transcriptions?.filter(
        (transcription: any) => {
          return (transcription?.hanzi || transcription?.input)?.includes(
            item?.input
          );
        }
      );

      const frequency = transcriptions?.length || 0;

      return {
        ...item,
        hskLevel: itemHskLevel || null,
        isCharacter: isCharacter,
        isHsk: !!itemHskLevel,
        pinyin: hskWord?.pinyin || "-",
        en: hskWord?.en || "-",
        frequency: frequency,
      };
    });

    if (hskLevel !== "all") {
      return enrichedUnknowns.filter((item: any) => {
        if (hskLevel === "na") {
          return !item?.hskLevel;
        }
        return item?.hskLevel === hskLevel;
      });
    }

    return enrichedUnknowns;
  }, [contentUnknowns?.items, searchQuery, hskLevel, hskWords, lesson]);

  return (
    <div className="my-0 sm:my-8">
      <div className="sm:mb-4 flex sm:flex-row sm:justify-between flex-col gap-2">
        <ConvoInsightsSearch />
        <div className="flex gap-2">
          <ConvoInsightsHskLevelFilter
            availableHskLevels={availableHskLevels}
            showNa={hasNaItems}
          />
        </div>
      </div>

      <div className="sm:my-8 my-4">
        <ConvoInsightsUnknownTable
          unknowns={filteredUnknowns}
          lang={lang}
          onCharacterClick={onCharacterClick}
        />
      </div>
    </div>
  );
}
