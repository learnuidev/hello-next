"use client";

import { useRouter, useSearchParams } from "next/navigation";

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

  const views = useViewTypeStore((state: any) => state.views) as any;
  const view = views?.[characterId] || "home";
  const searchParams = useSearchParams();
  const searchParamView = searchParams.get("view");

  const router = useRouter();

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
          router.push(`/${lang ? `?lang=${lang}` : ""}`);
        }
      }}
    >
      <div className="px-4 md:px-12">
        {searchParamView !== "review" && (
          <CharacterNavbar characterId={characterId} />
        )}

        <ShowView />
      </div>

      {searchParamView !== "review" && (
        <FloatingCharacterNavbar characterId={characterId} />
      )}
    </div>
  );
}
