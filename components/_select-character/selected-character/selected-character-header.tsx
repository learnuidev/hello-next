"use client";

import { SelectedCharacterProps } from "../select-character.types";

import { SelectedCharacterAudio } from "./selected-character-audio";
import { SelectedCharacterStats } from "./selected-character-stats";
import { SelectedCharacterTitle } from "./selected-character-title";
import { SubComponentsView } from "./subcomponents-view";

export const SelectedCharacterHeader = (props: SelectedCharacterProps) => {
  const { lang, characterId } = props;

  return (
    <>
      <SelectedCharacterTitle {...props} />
      <SelectedCharacterAudio {...props} />
      <SelectedCharacterStats {...props} />
      <SubComponentsView lang={lang} characterId={characterId} />
    </>
  );
};
