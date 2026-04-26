"use client";

import { RelatedHskWords } from "./related-hsk-words";

import { CharacterAnalytics } from "@/components/_select-character/character-analytics";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useMemo } from "react";
import { CharacterContent } from "./character-content/character-content";
import { CharacterOverviewView } from "./character-overview-view";
import { HskSuperComponentsWordView } from "./hsk-super-components-view";
import { PinyinView } from "./pinyin-view";
import { SimilarCharactersView } from "./similar-characters-view";

import { DynaClozeSentence } from "@/app/(auth)/convos/[content-id]/dyna-cloze-sentence/dyna-cloze-sentence";
import { useClozeContentMode } from "@/app/review/content-cloze-mode-button";
import { ReviewClozeContent } from "@/app/review/review-cloze-content/review-cloze-content";
import { ReviewCloze } from "@/app/review/review-cloze/review-cloze";
import { CharacterBookmark } from "./character-bookmark";
import { CharacterSearch } from "./character-search";
import { useRouter, useSearchParams } from "next/navigation";
import { getNmmLink } from "@/libs/utils/get-nmm-link";

export const SelectedCharacter = ({ characterId }: { characterId: string }) => {
  const { data: characters } = useListCharactersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );

  const selectedComp = useMemo(
    () =>
      characters?.find(
        (component: any) =>
          (component?.hanzi || component?.item || component?.input) ===
          characterId,
      ),
    [characters, characterId],
  );

  const lang = useGetCurrentLang();

  const searchParams = useSearchParams();
  const searchParamView = searchParams.get("view");

  const router = useRouter();

  const setView = (view: string) => {
    router.push(getNmmLink({ id: characterId, lang, view }));
  };

  const { clozeContentMode } = useClozeContentMode();

  switch (searchParamView) {
    case "review": {
      const isChinese = lang === "zh" && characterId?.length > 4;
      if (isChinese || characterId?.length > 12) {
        return (
          <DynaClozeSentence
            sentence={{ hanzi: characterId, input: characterId, lang: lang }}
          />
        );
      }

      if (clozeContentMode === "content") {
        return (
          <ReviewClozeContent
            backButton={() => {
              return (
                <button
                  onClick={() => {
                    setView("overview");
                  }}
                >
                  Back to overview
                </button>
              );
            }}
            currentCharacter={characterId}
            lang={lang}
            onClose={() => {
              setView("overview");
            }}
          />
        );
      } else {
        return (
          <ReviewCloze
            backButton={() => {
              return (
                <button
                  onClick={() => {
                    setView("overview");
                  }}
                >
                  Back to overview
                </button>
              );
            }}
            currentCharacter={characterId}
            lang={lang}
            onClose={() => {
              setView("overview");
            }}
          />
        );
      }
    }

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

    case "search":
      return <CharacterSearch characterId={characterId} lang={lang} />;
    case "bookmark":
      return <CharacterBookmark characterId={characterId} lang={lang} />;

    case "similar-looking-characters":
      return <SimilarCharactersView componentId={characterId} />;
    case "content":
      return <CharacterContent characterId={characterId} />;

    default:
      return <CharacterOverviewView characterId={characterId} />;
  }
};
