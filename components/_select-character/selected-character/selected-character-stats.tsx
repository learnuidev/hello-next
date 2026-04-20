"use client";

import { Icons } from "../../ui/icons.v2";
import { SelectedCharacterProps } from "../select-character.types";

import { useListRelatedHSKWords } from "@/hooks/use-list-related-hsk-words";

import { useRelatedHskWordsByCharacter } from "../use-filter-related-hsk-words-by-character";
import { GoogleTranslateLink } from "./google-translate-link";
import { YablaLink } from "./yabla-link";
import { HanbookLink } from "./hanbook-link";
import { useListChineseCharactersQuery } from "@/domain/hsk/list-chinese-characters-query";
import { useSelectedCharacterData } from "@/components/use-selected-character";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { YoutubeLink } from "./youtube-link";
import { useGetCharacter } from "@/hooks/use-get-character";
import {
  calculateTotalDaysLearnedDate,
  calculateTotalMasteryDate,
} from "@/app/overview/utils/calculate-total-mastery-date";
import { useMemo } from "react";
import { BibilliLink } from "./billibilli-link/billibilli-link";
import { formatPercentage } from "@/app/insights-overview/utils/format-percentage";
import { calculateCharacterStats } from "@/lib/utils";

export const SelectedCharacterStats = ({
  characterId,
}: {
  characterId: string;
}) => {
  const { data } = useSelectedCharacterData({ characterId });

  const selectedCharacter = useGetCharacter({ characterId });

  const totalDaysLearned = useMemo(
    () =>
      selectedCharacter ? calculateTotalDaysLearnedDate(selectedCharacter) : 0,
    [selectedCharacter],
  );

  const { selectedComp, selectedComp2 } = data;

  const level = selectedComp?.mandarinoIndex || selectedComp2?.mandarinoIndex;
  const { data: chineseCharacters } = useListChineseCharactersQuery();

  const lang = useGetCurrentLang();

  const offlineCharacter = chineseCharacters?.find(
    (char: any) => char?.hanzi === characterId || char?.input === characterId,
  );

  const pinyinOrRoman =
    selectedComp?.pinyin ||
    selectedComp?.roman ||
    selectedComp2?.pinyin ||
    selectedComp2?.roman ||
    offlineCharacter?.pinyin ||
    offlineCharacter?.roman;

  const { data: totalRelatedHskWords } = useListRelatedHSKWords(characterId);

  const relatedHskWords = useRelatedHskWordsByCharacter({
    characterId,
  });

  const totalRelatedSentences =
    totalRelatedHskWords?.length - relatedHskWords?.length;

  const multiSentence =
    pinyinOrRoman?.split(".")?.length > 1 ||
    pinyinOrRoman?.split("?")?.length > 1;

  const stats = calculateCharacterStats(selectedCharacter);

  return (
    <div className="text-gray-500 flex space-x-4 my-4 overflow-y-auto pb-4">
      <div className="flex justify-between w-full items-center">
        {multiSentence ? null : (
          <div className="flex items-center space-x-4">
            {stats && (
              <div className="text-slate-500  text-extralight flex space-x-2 items-center">
                <Icons.bullsEye />
                <p className="text-black dark:text-white">
                  {stats?.accuracyRate}
                </p>
              </div>
            )}
            {stats && (
              <div className="text-slate-500  text-extralight flex space-x-2 items-center">
                <Icons.xMark />
                <p className="text-black dark:text-white">
                  {stats?.totalIncorrect}
                </p>
              </div>
            )}

            {totalDaysLearned === 0 ? null : (
              <div className="text-slate-500  text-extralight flex space-x-2 items-center w-16">
                <span>
                  <Icons.lightBulb />
                </span>
                <p className="text-black dark:text-white">
                  {totalDaysLearned}d
                </p>
              </div>
            )}
          </div>
        )}

        <div className="space-x-4 flex items-center px-2">
          {/* <GoogleTranslateLink hanzi={characterId} /> */}
          {lang === "zh" && <YablaLink hanzi={characterId} />}
          {lang === "zh" && <HanbookLink hanzi={characterId} />}
          {lang !== "zh" && <YoutubeLink characterId={characterId} />}
          {lang === "zh" && (
            <BibilliLink className="text-2xl" hanzi={characterId} />
          )}
        </div>
      </div>
    </div>
  );
};
