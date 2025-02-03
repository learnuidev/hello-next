import { cn } from "@/lib/utils";
import { SelectedCharacterProps } from "./select-character.types";
import { Icons } from "../ui/icons.v2";
import { useSelectedCharacterData } from "../use-selected-character";

export const SelectedCharacterStoryButton = ({
  characterId,
}: {
  characterId: string;
}) => {
  const { data: characterData } = useSelectedCharacterData({ characterId });

  const { view, setView } = characterData;

  return (
    <button
      className={cn(
        "text-xl transition",
        view === "story" ? "text-white" : "text-gray-400"
      )}
      onClick={() => {
        setView("story");
      }}
    >
      <Icons.compass />
    </button>
  );
};
