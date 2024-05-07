"use client";

import React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { NomadMethod } from "@/app/nmm/nomad-method";

import { HeaderView } from "./_select-character/header-view";
import { ViewType } from "./_select-character/character-view-type";
import { useSelectedCharacterData } from "./use-selected-character";

import { FloatingCharacterNavbar } from "./floating-character-navbar";

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

        <ViewType {...props} />
      </div>

      <FloatingCharacterNavbar {...props} />
    </div>
  );
}
