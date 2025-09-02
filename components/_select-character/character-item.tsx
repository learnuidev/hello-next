import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { useListCharactersMapQuery } from "@/domain/lesson/character.queries";
import { useListComponentsMapQuery } from "@/domain/lesson/component.queries";

import { calculateHoverColor } from "@/app/nmm/nmm-utils/calculate-hover-color";
import { cn } from "@/lib/utils";
import { usePreviewMode } from "../settings-dialog/use-preview-mode";

interface ICharacterItem {
  character: any;
  className?: string;
  disableClass?: boolean;
  disableForgotten?: boolean;
  onClick?: () => void;
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
  onClick,
  character,
  className,
  disableClass,
  disableForgotten,
}: ICharacterItem) => {
  const { data: learnedCharacters2, isLoading: isCharactersLoading } =
    useListCharactersMapQuery();

  const { data: components, isLoading: isComponentsLoading } =
    useListComponentsMapQuery();

  const { currentMode } = usePreviewMode();

  const brightMode = currentMode?.current === "focus";

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

  const commonCharacterMode = currentMode?.current === "melanin";

  console.log("CURRENT MODE", currentMode);

  return (
    <span
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      key={`${character}`}
      className={cn(
        "lg:text-2xl text-xl transition lowercase font-light",

        commonCharacterMode && hasHskword
          ? popularityColor
          : "。？，"?.includes(character)
            ? "dark:text-white text-black"
            : "",

        brightMode &&
          (learnedChar?.status === "forgotten"
            ? `text-gray-300 dark:text-gray-800 ${hoverColor}`
            : `${color} ${hoverColor}`),

        currentMode.current === "normal" && "dark:text-white text-black",
        className
      )}
    >
      {character}
    </span>
  );
};
