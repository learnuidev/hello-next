"use client";

import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

import { SelectedCharacterStats } from "./selected-character-stats";
import { SelectedCharacterTitle } from "./selected-character-title";
import { SubComponentsView } from "./subcomponents-view";

export const SelectedCharacterHeader = (props: { characterId: string }) => {
  const { characterId } = props;

  const lang = useGetCurrentLang();

  return (
    <>
      <SelectedCharacterTitle characterId={characterId} />
      <SelectedCharacterStats characterId={characterId} />
      <SubComponentsView lang={lang} characterId={characterId} />
    </>
  );
};
