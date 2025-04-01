import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useGetComponentQuery } from "@/domain/lesson/use-get-component-query";

import { useGetComponentId } from "@/app/nmm/[component-id]/use-get-component-id";
import { calculateHoverColor } from "@/app/nmm/nmm-utils/calculate-hover-color";
import { cn } from "@/lib/utils";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";

interface ICharacterItem {
  character: any;
  className?: string;
}

export const CharacterItem = ({ character, className }: ICharacterItem) => {
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
  const comp = components?.find((char: any) => char?.hanzi === character);

  const color = calculateColor({
    tone: learnedChar?.tone_level || selectedComp?.tone_level,
  });

  const hoverColor = calculateHoverColor({
    tone: learnedChar?.tone_level || comp?.tone_level,
  });

  return (
    <span
      key={`${character}`}
      className={cn(
        `${
          brightMode || isCharactersLoading
            ? `dark:text-gray-300 text-gray-700 ${hoverColor}`
            : learnedChar
              ? learnedChar?.status === "forgotten"
                ? `text-gray-200 dark:text-gray-600 ${hoverColor}`
                : `text-gray-300 ${color} ${hoverColor}`
              : selectedComp?.length > 1 || selectedComp?.group
                ? `dark:text-gray-500 text-gray-200 ${hoverColor}`
                : `dark:text-gray-200 text-gray-800 ${hoverColor}`
        } ${hoverColor} text-2xl transition lowercase font-light`,
        className
      )}
    >
      {character}
    </span>
  );
};
