"use client";

import { SelectedCharacterProps } from "../select-character.types";

import { chineseCharacters } from "@/langs/chinese /characters";
import { CharacterTitle } from "../character-title";
import { ZoomedCharacter } from "./zoomed-character";

export const SelectedCharacterTitle = (props: SelectedCharacterProps) => {
  const { selectedComp, selectedChar, lang, view, characterId, selectedComp2 } =
    props;

  const offlineCharacter = chineseCharacters?.find(
    (char) => char?.hanzi === characterId || char?.input === characterId
  );

  const pinyinOrRoman =
    selectedComp?.pinyin ||
    selectedComp?.roman ||
    selectedComp2?.pinyin ||
    selectedComp2?.roman ||
    offlineCharacter?.pinyin ||
    offlineCharacter?.roman;

  const multiSentence =
    pinyinOrRoman?.split(".")?.length > 1 ||
    pinyinOrRoman?.split("?")?.length > 1;

  // const

  return view === "zoom" ? (
    <div className="mb-4">
      <ZoomedCharacter characterId={characterId} />{" "}
    </div>
  ) : (
    <div className="flex items-center justify-between mb-4 mt-4 pr-4">
      <CharacterTitle
        lang={lang}
        multiSentence={multiSentence}
        characterId={characterId}
      />
    </div>
  );
};
