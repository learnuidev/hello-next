"use client";

import { SelectedCharacterProps } from "../select-character.types";

import { RelatedWords } from "../related-words";

import { chineseCharacters } from "@/langs/chinese /characters";

import { RelatedHskWords } from "./related-hsk-words";

import { CharacterAnalytics } from "@/components/_select-character/character-analytics";
import { PinyinView } from "./pinyin-view";
import { StoryView } from "./story-view";
import { CharacterOverviewView } from "./character-overview-view";
import { HskSentenceView } from "./hsk-sentences-view";
import { HskSuperComponentsWordView } from "./hsk-super-components-view";
import { SimilarCharactersView } from "./similar-characters-view";
import { CharacterContent } from "./character-content/character-content";

export const SelectedCharacter = (props: SelectedCharacterProps) => {
  const { selectedComp, lang, view, characterId, selectedComp2 } = props;

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

  switch (view) {
    case "super-components":
      return <HskSuperComponentsWordView componentId={characterId} />;

    case "pinyin":
      return <PinyinView {...props} />;

    case "words":
      return <RelatedHskWords characterId={characterId} lang={lang} />;

    case "analytics":
      return (
        <div>
          <CharacterAnalytics characterId={characterId} lang={lang} />
        </div>
      );
    case "sentences": {
      return <HskSentenceView {...props} />;
      if (lang === "zh") {
        // return <div>yooo</div>;
        return <HskSentenceView {...props} />;
      }

      return <RelatedWords lang={lang} characterId={characterId} />;
    }
    case "story":
      return <StoryView {...props} />;

    case "similar-looking-characters":
      return <SimilarCharactersView componentId={characterId} />;
    case "content":
      return <CharacterContent characterId={characterId} />;

    default:
      return <CharacterOverviewView {...props} />;
  }
};
