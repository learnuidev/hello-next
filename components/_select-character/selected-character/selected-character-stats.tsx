"use client";

import { Icons } from "../../ui/icons.v2";
import { SelectedCharacterProps } from "../select-character.types";

import { useListRelatedHSKWords } from "@/hooks/use-list-related-hsk-words";

import { useRelatedHskWordsByCharacter } from "../use-filter-related-hsk-words-by-character";
import { GoogleLink } from "./google-link";
import { YablaLink } from "./yabla-link";
import { HanbookLink } from "./hanbook-link";
import { useListChineseCharactersQuery } from "@/domain/hsk/list-chinese-characters-query";

export const SelectedCharacterStats = (props: SelectedCharacterProps) => {
  const { selectedComp, characterId, selectedComp2 } = props;

  const level = selectedComp?.level || selectedComp2?.level;
  const { data: chineseCharacters } = useListChineseCharactersQuery();

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
        </div>
      )}

      <div className="space-x-4 flex items-center px-2">
        <GoogleLink hanzi={characterId} />
        <YablaLink hanzi={characterId} />
        <HanbookLink hanzi={characterId} />
      </div>
    </div>
  );
};
