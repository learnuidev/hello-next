"use client";

import React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { NomadMethod } from "@/app/nmm/nomad-method";

import { HeaderView } from "./_select-character/selected-character-header";
import { ViewType } from "./_select-character/character-view-type";
import { useSelectedCharacterData } from "./use-selected-character";

import { FloatingCharacterNavbar } from "./floating-character-navbar";
import { shortCuts } from "@/hooks/use-handle-search";

import { LanguagesList } from "./languages-list";

export function SelectedCharacter({ characterId }: { characterId: string }) {
  const { data } = useSelectedCharacterData({ characterId });

  const searchParams = useSearchParams();

  const lang = searchParams.get("lang") || "";

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
    if (shortCuts?.includes(characterId) || characterId === "ll") {
      return <LanguagesList characterId={characterId} />;
    }

    return <ViewType {...props} />;
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
        <HeaderView {...props} />

        <ShowView />
      </div>

      <FloatingCharacterNavbar {...props} />
    </div>
  );
}
