"use client";

import { Icons } from "../../ui/icons.v2";
import { SelectedCharacterProps } from "../select-character.types";

import { useListRelatedHSKWords } from "@/hooks/use-list-related-hsk-words";

import { useRelatedHskWordsByCharacter } from "../use-filter-related-hsk-words-by-character";
import { GoogleLink } from "./google-link";
import { YablaLink } from "./yabla-link";
import { HanbookLink } from "./hanbook-link";
import { useListChineseCharactersQuery } from "@/domain/hsk/list-chinese-characters-query";
import { useSelectedCharacterData } from "@/components/use-selected-character";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { YoutubeLink } from "./youtube-link";
import { useGetCharacter } from "@/hooks/use-get-character";
import { calculateTotalMasteryDate } from "@/app/overview/utils/calculate-total-mastery-date";

export const SelectedCharacterStats = ({
  characterId,
}: {
  characterId: string;
}) => {
  const { data } = useSelectedCharacterData({ characterId });

  const selectedCharacter = useGetCharacter({ characterId });

  const totalMasteryDays = selectedCharacter
    ? calculateTotalMasteryDate(selectedCharacter)
    : 0;

  const { selectedComp, selectedComp2 } = data;

  const level = selectedComp?.mandarinoIndex || selectedComp2?.mandarinoIndex;
  // const level = selectedComp?.level || selectedComp2?.level;
  const { data: chineseCharacters } = useListChineseCharactersQuery();

  const lang = useGetCurrentLang();

  const offlineCharacter = chineseCharacters?.find(
    (char: any) => char?.hanzi === characterId || char?.input === characterId
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

  // const

  return (
    <div className="flex justify-between items-center">
      {multiSentence ? null : (
        <div className="flex items-center space-x-4">
          {relatedHskWords?.length > 0 && (
            <div className="text-slate-500  text-extralight flex space-x-2 items-center">
              <Icons.word />
              <p>{relatedHskWords?.length}</p>
            </div>
          )}
          {totalRelatedSentences > 0 && (
            <div className="text-slate-500  text-extralight flex space-x-2 items-center">
              <Icons.sentence />
              <p>{totalRelatedSentences}</p>
            </div>
          )}
          {level && (
            <div className="text-slate-500  text-extralight flex space-x-2 items-center">
              <Icons.earthAsia />
              <p>{level}</p>
            </div>
          )}
          {totalMasteryDays && (
            <div className="text-slate-500  text-extralight flex space-x-2 items-center">
              <Icons.fireDuoTone />
              <p>{totalMasteryDays}d</p>
            </div>
          )}
        </div>
      )}

      <div className="space-x-4 flex items-center px-2">
        <GoogleLink hanzi={characterId} />
        {lang === "zh" && <YablaLink hanzi={characterId} />}
        {lang === "zh" && <HanbookLink hanzi={characterId} />}
        <YoutubeLink characterId={characterId} />
      </div>
    </div>
  );
};
