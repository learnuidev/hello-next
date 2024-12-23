import { cn } from "@/lib/utils";
import { SelectedCharacterProps } from "./select-character.types";
import { Icons } from "../ui/icons.v2";

export const SelectedCharacterContentsButton = ({
  setView,
  view,
}: SelectedCharacterProps) => {
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
