"use client";

import { useAddCharacterMutation } from "@/domain/lesson/character.mutations";
import { useUpdateCharacterStatusMutation } from "@/domain/lesson/character.mutations";

export function useCharacterActions(lang: string) {
  const addCharacterMutation = useAddCharacterMutation();
  const updateCharacterStatusMutation = useUpdateCharacterStatusMutation();

  const learnCharacter = (character: {
    hanzi: string;
    input?: string;
    journeyId?: string;
    pinyin?: string;
    en?: string;
    story?: string;
    lang?: string;
  }) => {
    console.log("CHAR", character);

    const journeyId = character.journeyId || "";
    (addCharacterMutation as any).mutate({
      hanzi: character.hanzi || character?.input,
      journeyId,
      status: "learned",
      pinyin: character.pinyin,
      en: character.en,
      story: character.story,
      lang: character.lang || lang,
    });
  };

  const masterCharacter = (character: {
    hanzi: string;
    isLearned: boolean;
    id?: string;
  }) => {
    if (!character.isLearned) {
      learnCharacter(character);
    }

    (updateCharacterStatusMutation as any).mutate({
      characterId: character.id || character.hanzi,
      status: "forgotten",
    });
  };

  const unmasterCharacter = (character: { hanzi: string; id?: string }) => {
    (updateCharacterStatusMutation as any).mutate({
      characterId: character.id || character.hanzi,
      status: "learned",
    });
  };

  const bookmarkCharacter = (character: { hanzi: string }) => {
    console.log("Bookmark:", character.hanzi);
  };

  return {
    learnCharacter,
    masterCharacter,
    unmasterCharacter,
    bookmarkCharacter,
    isLearning: addCharacterMutation.isPending,
    isUpdating: updateCharacterStatusMutation.isPending,
  };
}
