import { cn } from "@/lib/utils";
import { SelectedCharacterProps } from "./select-character.types";
import { Icons } from "../ui/icons.v2";
import { useSelectedCharacterData } from "../use-selected-character";

export const SelectedCharacterContentsButton = ({
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
        view === "content" ? "dark:text-white text-rose-400" : "text-gray-400"
      )}
      onClick={() => {
        setView("content");
      }}
    >
      {view === "content" ? <Icons.contentSolid /> : <Icons.content />}
    </button>
  );
};
