import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
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
}

function calculatePopularityColor(comp: any) {
  const mandarinoIndex = comp?.mandarinoIndex;
  if (mandarinoIndex > 100) {
    return "dark:text-gray-800 text-gray-200";
  }

  if (mandarinoIndex > 30) {
    return "dark:text-gray-700 text-gray-400";
  }

  if (mandarinoIndex > 8) {
    return "dark:text-gray-500 text-gray-600";
  }

  if (mandarinoIndex > 5) {
    return "dark:text-gray-400 text-gray-700";
  }

  return "dark:text-gray-300 text-gray-800";
}

export const CharacterItem = ({
  character,
  className,
  disableClass,
}: ICharacterItem) => {
  const { data: learnedCharacters2, isLoading: isCharactersLoading } =
    useListCharactersQuery();

  const componentId = useGetComponentId();

  const { data: components, isLoading: isComponentsLoading } =
    useListComponents({ includeAll: true });

  const { data: selectedComp } = useGetComponentQuery({
    hanzi: componentId,
  });

  const brightMode = useBrightModeStore((state: any) => state.mode);

  const learnedChar = learnedCharacters2?.find(
    (char: any) => char?.hanzi === character
  );

  console.log("SELECT COMP", selectedComp);

  const comp = components?.find((char: any) => char?.hanzi === character);

  const popularityColor = calculatePopularityColor(comp);

  console.log("LEARNED CHAR", comp);

  const color = calculateColor({
    ...(learnedChar || selectedComp),
    tone: learnedChar?.tone_level || selectedComp?.tone_level,
  });

  const hoverColor = calculateHoverColor({
    tone: learnedChar?.tone_level || comp?.tone_level,
  });

  const { commonCharacterMode } = useCommonCharacterMode();

  console.log("LOGGED", commonCharacterMode);

  return (
    <span
      key={`${character}`}
      className={cn(
        `${
          commonCharacterMode
            ? popularityColor
            : brightMode || isCharactersLoading
              ? `dark:text-gray-300 text-gray-700 ${hoverColor}`
              : learnedChar
                ? learnedChar?.status === "forgotten"
                  ? `text-gray-300 dark:text-gray-800 ${hoverColor}`
                  : `text-gray-300 ${color} ${hoverColor}`
                : selectedComp?.length > 1 || selectedComp?.group
                  ? `dark:text-white text-black ${hoverColor}`
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
