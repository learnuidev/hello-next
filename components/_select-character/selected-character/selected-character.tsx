"use client";

import { SelectedCharacterProps } from "../select-character.types";

import { RelatedWords } from "../related-words";

import { RelatedHskWords } from "./related-hsk-words";

import { CharacterAnalytics } from "@/components/_select-character/character-analytics";
import { PinyinView } from "./pinyin-view";
import { StoryView } from "./story-view";
import { CharacterOverviewView } from "./character-overview-view";
import { HskSentenceView } from "./hsk-sentences-view";
import { HskSuperComponentsWordView } from "./hsk-super-components-view";
import { SimilarCharactersView } from "./similar-characters-view";
import { CharacterContent } from "./character-content/character-content";
import { useListChineseCharactersQuery } from "@/domain/hsk/list-chinese-characters-query";
import {
  useSelectedCharacterData,
  useViewTypeStore,
} from "@/components/use-selected-character";
import { useMemo } from "react";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useGetComponentQuery } from "@/domain/lesson/use-get-component-query";

export const SelectedCharacter = ({ characterId }: { characterId: string }) => {
  const { data: characters } = useListCharactersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const selectedComp = useMemo(
    () =>
      characters?.find(
        (component: any) =>
          (component?.hanzi || component?.item || component?.input) ===
          characterId
      ),
    [characters, characterId]
  );

  const lang = useGetCurrentLang();

  const views = useViewTypeStore((state: any) => state.views) as any;
  const view = views?.[characterId] || "home";
  // const setViews = useViewTypeStore((state) => state.setViews);
  // const setView = (view: any) => {
  //   return setViews(characterId, view);
  // };

  const { data: selectedComp2 } = useGetComponentQuery({
    hanzi: characterId || "",
  });

  // const {   selectedComp2 } = data;

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

  switch (view) {
    case "super-components":
      return <HskSuperComponentsWordView componentId={characterId} />;

    case "pinyin":
      return <PinyinView characterId={characterId} />;

    case "words":
      return <RelatedHskWords characterId={characterId} lang={lang} />;

    case "analytics":
      return (
        <div>
          <CharacterAnalytics characterId={characterId} lang={lang} />
        </div>
      );
    case "sentences": {
      return <HskSentenceView characterId={characterId} />;

      return <RelatedWords lang={lang} characterId={characterId} />;
    }
    case "story":
      return <StoryView characterId={characterId} />;

    case "similar-looking-characters":
      return <SimilarCharactersView componentId={characterId} />;
    case "content":
      return <CharacterContent characterId={characterId} />;

    default:
      return <CharacterOverviewView characterId={characterId} />;
  }
};
