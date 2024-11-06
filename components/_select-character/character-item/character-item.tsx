"use client";

import { SelectedCharacterProps } from "./../select-character.types";

import { RelatedWords } from "./../related-words";

import { chineseCharacters } from "@/langs/chinese /characters";

import { RelatedHskWords } from "./../related-hsk-words";

import { CharacterAnalytics } from "@/components/_select-character/character-analytics";
import { PinyinView } from "./../pinyin-view";
import { StoryView } from "./../story-view";
import { CharacterItemView } from "./character-item-view";
import { HskSentenceView } from "./hsk-sentences-view";
import { HskSuperComponentsWordView } from "./hsk-super-components-view";

export const CharacterItem = (props: SelectedCharacterProps) => {
  const {
    uniqueAnswerIds,
    answerMap,
    allContents,
    allSteps,
    components,
    selectedComp,
    selectedChar,
    routeName,
    lang,
    view,
    sentences,
    characterId,
    selectedComp2,
  } = props;

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
      return <HskSentenceView {...props} />;
      if (lang === "zh") {
        // return <div>yooo</div>;
        return <HskSentenceView {...props} />;
      }

      return <RelatedWords lang={lang} characterId={characterId} />;
    }
    case "story":
      return <StoryView {...props} />;

    default:
      return <CharacterItemView {...props} />;
  }
};
