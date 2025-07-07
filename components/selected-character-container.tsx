"use client";

import { useRouter } from "next/navigation";

import { NomadMethod } from "@/app/nmm/nomad-method";

import { CharacterNavbar } from "./_select-character/character-navbar";
import { useViewTypeStore } from "./use-selected-character";

import { FloatingCharacterNavbar } from "./floating-character-navbar";

import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { SelectedCharacter } from "./_select-character/selected-character/selected-character";
import { LanguagesList, listLanguagesShortCuts } from "./languages-list";

export function SelectedCharacterContainer({
  characterId,
}: {
  characterId: string;
}) {
  const setViews = useViewTypeStore((state) => state.setViews);
  const lang = useGetCurrentLang();

  const setView = (view: any) => {
    return setViews(characterId, view);
  };

  const views = useViewTypeStore((state: any) => state.views) as any;
  const view = views?.[characterId] || "home";

  const router = useRouter();

  if (view === "play") {
    return (
      <NomadMethod
        selectedId={characterId}
        onClose={() => {
          setView("");
        }}
      />
    );
  }

  const ShowView = () => {
    if (listLanguagesShortCuts?.includes(characterId)) {
      return <LanguagesList characterId={characterId} />;
    }

    return <SelectedCharacter characterId={characterId} />;
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
        {view !== "review" && <CharacterNavbar characterId={characterId} />}

        <ShowView />
      </div>

      {view !== "review" && (
        <FloatingCharacterNavbar characterId={characterId} />
      )}
    </div>
  );
}
