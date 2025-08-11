"use client";

import { SelectedCharacterProps } from "./select-character.types";

import { useRouter } from "next/navigation";

import { Icons } from "../ui/icons.v2";

import { useListSuperComponentsQuery } from "@/domain/component/super-component.queries";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { cn } from "@/lib/utils";
import { useGetSimilarLookingCharacters } from "./selected-character/use-get-similar-looking-characters";
import { SelectedCharacterStoryButton } from "./selected-character-story-button";
import { useRelatedHskWordsByCharacter } from "./use-filter-related-hsk-words-by-character";
import { useSlicedRelatedSentencesByCharacter } from "./use-sliced-related-sentences-by-character";
import { useSelectedCharacterData } from "../use-selected-character";
import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import { useListBookmarksQuery } from "@/domain/bookmark/use-list-bookmarks-query";
import { useListBookmarks } from "./hooks/use-list-bookmarks";

export const CharacterNavbar = ({ characterId }: { characterId: string }) => {
  const { data: characterData } = useSelectedCharacterData({ characterId });
  const { lang, view, setView } = characterData;
  const router = useRouter();

  const { data: superComponents_ } = useListSuperComponentsQuery({
    componentId: characterId,
  });

  const filteredRelatedHskWords = useRelatedHskWordsByCharacter({
    characterId,
  });

  const similarLookingCharacters = useGetSimilarLookingCharacters(characterId);

  const relatedSentences = useSlicedRelatedSentencesByCharacter(characterId);

  const superComponents = superComponents_ as any;

  const { data } = useListCharactersQuery();

  const { data: groups } = useListLearnedCharactersByDate({
    variant: "search",
    query: characterId,
  });

  const filteredSearchResults = groups?.map((group) => group.items)?.flat();

  const filteredBookMarks = useListBookmarks(characterId);

  const learnedChar = data?.filter(
    (item: any) => (item?.input || item?.hanzi) === characterId
  )?.[0];

  const styleFn = (currentView: string) => {
    return view === currentView
      ? "dark:text-white text-rose-400"
      : "dark:text-gray-400 text-gray-600";
  };

  return (
    <div className="flex my-4 justify-start items-center w-full">
      <div className="flex jusify-between items-center space-x-32">
        <div className="space-x-6 lg:space-x-8 flex items-center">
          <button
            className={"text-xl"}
            onClick={() => {
              router.push(`/nmm${lang ? `?lang=${lang}` : ""}`);
            }}
          >
            <Icons.xMark className="text-2xl" />
          </button>

          <button
            className={cn("text-xl transition", styleFn("home"))}
            onClick={() => {
              setView("home");
            }}
          >
            {view === "home" ? <Icons.mandarinSolid /> : <Icons.mandarin />}
          </button>
          {filteredRelatedHskWords?.length > 0 && (
            <button
              className={cn("text-xl transition", styleFn("words"))}
              onClick={() => {
                setView("words");
              }}
            >
              {view === "words" ? <Icons.seedlingSolid /> : <Icons.seedling />}
            </button>
          )}
          {relatedSentences?.length > 0 && (
            <button
              className={cn("text-xl transition", styleFn("sentences"))}
              onClick={() => {
                setView("sentences");
              }}
            >
              {view === "sentences" ? <Icons.treeSolid /> : <Icons.tree />}
            </button>
          )}

          {filteredSearchResults?.length > 0 && (
            <button
              className={cn("text-xl transition", styleFn("sentences"))}
              onClick={() => {
                setView("search");
              }}
            >
              <Icons.magnifyingGlass
                className={
                  view === "search"
                    ? "dark:text-white text-black"
                    : "text-gray-500"
                }
              />
            </button>
          )}
          {filteredBookMarks?.length > 0 && (
            <button
              className={cn("text-xl transition", styleFn("sentences"))}
              onClick={() => {
                setView("bookmark");
              }}
            >
              {view === "bookmark" ? (
                <Icons.bookmarkSolid className={"dark:text-white text-black"} />
              ) : (
                <Icons.bookmark className={"text-gray-500"} />
              )}
            </button>
          )}

          {superComponents?.length > 0 && (
            <button
              className={cn("text-xl transition", styleFn("super-components"))}
              onClick={() => {
                setView("super-components");
              }}
            >
              {view === "super-components" ? (
                <Icons.lightningSolid />
              ) : (
                <Icons.lightning />
              )}
            </button>
          )}
          {characterId?.length > 1 && (
            <button
              className={cn("text-xl transition", styleFn("analytics"))}
              onClick={() => {
                setView("analytics");
              }}
            >
              {view === "analytics" ? (
                <Icons.chartColumnSolid />
              ) : (
                <Icons.chartColumn />
              )}
            </button>
          )}
          {similarLookingCharacters?.length > 0 && (
            <button
              className={cn(
                "text-xl transition",

                styleFn("similar-looking-characters")
              )}
              onClick={() => {
                setView("similar-looking-characters");
              }}
            >
              {view === "similar-looking-characters" ? (
                <Icons.connectDevelop />
              ) : (
                <Icons.connectDevelop />
              )}
            </button>
          )}

          {characterId?.length === 1 && (
            <button
              className={cn("text-xl transition", styleFn("pinyin"))}
              onClick={() => {
                setView("pinyin");
              }}
            >
              <Icons.pinyinChart />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
