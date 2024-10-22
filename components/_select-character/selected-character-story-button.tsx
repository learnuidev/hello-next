import { cn } from "@/lib/utils";
import { SelectedCharacterProps } from "./select-character.types";
import { Icons } from "../ui/icons.v2";

export const SelectedCharacterStoryButton = ({
  setView,
  view,
}: SelectedCharacterProps) => {
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
