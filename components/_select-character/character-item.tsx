import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import {
  useListCharactersMapQuery,
  useListCharactersQuery,
} from "@/domain/lesson/character.queries";
import {
  useListComponents,
  useListComponentsMapQuery,
} from "@/domain/lesson/component.queries";
import { useGetComponentQuery } from "@/domain/lesson/use-get-component-query";

import { useGetComponentId } from "@/app/nmm/[component-id]/use-get-component-id";
import { calculateHoverColor } from "@/app/nmm/nmm-utils/calculate-hover-color";
import { cn } from "@/lib/utils";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";
import { useCommonCharacterMode } from "@/stores/use-common-character-mode-store";

interface ICharacterItem {
  character: any;
  className?: string;
  disableClass?: boolean;
  disableForgotten?: boolean;
}

function calculatePopularityColor(comp: any) {
  const mandarinoIndex = comp?.mandarinoIndex;
  if (mandarinoIndex > 100) {
    return "text-gray-800";
  }

  if (mandarinoIndex > 30) {
    return "text-gray-500";
  }

  if (mandarinoIndex > 5) {
    return "text-gray-300";
  }

  return "text-gray-200";
}

export const CharacterItem = ({
  character,
  className,
  disableClass,
  disableForgotten,
}: ICharacterItem) => {
  const { data: learnedCharacters2, isLoading: isCharactersLoading } =
    useListCharactersMapQuery();

  const { data: components, isLoading: isComponentsLoading } =
    useListComponentsMapQuery();

  const brightMode = useBrightModeStore((state: any) => state.mode);

  const learnedChar = learnedCharacters2?.[character];

  const comp = components?.[character];

  const hasHskword = comp?.hskWords > 0;

  const popularityColor = calculatePopularityColor(comp);

  const color = calculateColor({
    ...learnedChar,
    tone: learnedChar?.tone_level,
  });

  const hoverColor = calculateHoverColor({
    tone: learnedChar?.tone_level || comp?.tone_level,
  });

  const { commonCharacterMode } = useCommonCharacterMode();

  return (
    <span
      key={`${character}`}
      className={cn(
        `${
          commonCharacterMode
            ? hasHskword
              ? popularityColor
              : "。？，"?.includes(character)
                ? "dark:text-white text-black"
                : "text-yellow-500"
            : brightMode || isCharactersLoading
              ? `dark:text-gray-300 text-gray-700 ${hoverColor}`
              : learnedChar
                ? disableForgotten
                  ? `text-gray-300 ${color} ${hoverColor}`
                  : learnedChar?.status === "forgotten"
                    ? `text-gray-300 dark:text-gray-800 ${hoverColor}`
                    : `text-gray-300 ${color} ${hoverColor}`
                : `dark:text-gray-200 text-gray-800 ${hoverColor}`
        } ${hoverColor}`,
        disableClass
          ? ""
          : "lg:text-2xl text-xl transition lowercase font-light",

        className
      )}
    >
      {character}
    </span>
  );
};
