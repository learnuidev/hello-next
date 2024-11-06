"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { NomadMethod } from "@/app/nmm/nomad-method";

import { CharacterNavbar } from "./_select-character/character-navbar";
import { useSelectedCharacterData } from "./use-selected-character";

import { FloatingCharacterNavbar } from "./floating-character-navbar";

import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { SelectedCharacter } from "./_select-character/selected-character/selected-character";
import { LanguagesList, listLanguagesShortCuts } from "./languages-list";

export function SelectedCharacterContainer({
  characterId,
}: {
  characterId: string;
}) {
  const { data } = useSelectedCharacterData({ characterId });

  const searchParams = useSearchParams();

  const lang = useGetCurrentLang();
  const { selectedChar, setView, view } = data;

  const router = useRouter();

  if (view === "play") {
    return (
      <NomadMethod
        selectedId={selectedChar}
        onClose={() => {
          setView("");
        }}
      />
    );
  }

  const props = {
    ...data,
    characterId,
  };

  const ShowView = () => {
    if (listLanguagesShortCuts?.includes(characterId)) {
      return <LanguagesList characterId={characterId} />;
    }

    return <SelectedCharacter {...props} />;
  };

  return (
    <div
      className="relative w-full"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          router.push(`/nmm${lang ? `?lang=${lang}` : ""}`);
        }
      }}
    >
      <div className="px-4 md:px-12">
        <CharacterNavbar {...props} />

        <ShowView />
      </div>

      <FloatingCharacterNavbar {...props} />
    </div>
  );
}
