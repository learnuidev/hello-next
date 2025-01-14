"use client";

import { SelectedCharacterProps } from "../select-character.types";

import { CharacterTitle } from "../character-title";
import { ZoomedCharacter } from "./zoomed-character";
import { useListChineseCharactersQuery } from "@/domain/hsk/list-chinese-characters-query";

export const SelectedCharacterTitle = (props: SelectedCharacterProps) => {
  const { selectedComp, selectedChar, lang, view, characterId, selectedComp2 } =
    props;

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
  const selectedCompEn =
    selectedComp?.en || selectedComp2?.en || offlineCharacter?.en;

  const selectedCompInput =
    selectedComp?.hanzi ||
    selectedComp?.input ||
    selectedComp2?.input ||
    selectedComp2?.hanzi ||
    selectedChar;

  const multiSentence =
    pinyinOrRoman?.split(".")?.length > 1 ||
    pinyinOrRoman?.split("?")?.length > 1;

  // const

  return view === "zoom" ? (
    <div className="mb-4">
      <ZoomedCharacter characterId={characterId} />{" "}
    </div>
  ) : (
    <div className="flex items-center justify-between mb-4 mt-4">
      <CharacterTitle
        pinyinOrRoman={pinyinOrRoman}
        multiSentence={multiSentence}
        characterId={characterId}
        lang={lang}
        selectedCompInput={selectedCompInput}
        selectedCompEn={selectedCompEn}
      />
    </div>
  );
};
