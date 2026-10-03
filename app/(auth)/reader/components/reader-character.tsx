"use client";

import { getCharacterGlyphClassName } from "@/components/_select-character/character-item";
import { usePreviewMode } from "@/components/settings-dialog/use-preview-mode";
import { useListComponentsMapQuery } from "@/domain/lesson/component.queries";
import { useListCharactersMapQuery } from "@/domain/lesson/character.queries";

/**
 * The characters of a text, coloured the way `CharacterItem` colours them.
 *
 * `CharacterItem` fetches its own character, which is right for a grid of a few
 * dozen and far too much for a whole text: every instance adds five hook
 * subscriptions, and a thousand-word article ends up spending seconds in them
 * (measured: ~17s for a 22k character text, ~0.9s once the maps are fetched
 * once). So the reader fetches the two maps once per view and calls the shared
 * `getCharacterGlyphClassName` for each character — the same rules, the same
 * colours, no per-character queries.
 */
export const useReaderCharacterMaps = () => {
  const { data: learnedCharacters } = useListCharactersMapQuery({
    from: "reader-characters",
  });

  const { data: components } = useListComponentsMapQuery();

  const { currentMode } = usePreviewMode();

  return { learnedCharacters, components, currentMode };
};

export interface ReaderCharacterMaps {
  learnedCharacters?: Record<string, any>;
  components?: Record<string, any>;
  currentMode?: any;
}

export const ReaderCharacter = ({
  character,
  maps,
  className,
}: {
  character: string;
  maps: ReaderCharacterMaps;
  className?: string;
}) => (
  <span
    className={getCharacterGlyphClassName({
      character,
      learnedChar: maps?.learnedCharacters?.[character],
      comp: maps?.components?.[character],
      currentMode: maps?.currentMode?.current,
      className,
    })}
  >
    {character}
  </span>
);
