import { cn } from "@/lib/utils";
import { Icons } from "../ui/icons.v2";

import { useContentEditStore } from "./use-content-edit-store";

export function ContentEditButton({ className }: { className?: string }) {
  const setEditMode = useContentEditStore((state) => state.setEditMode);
  const editMode = useContentEditStore((state) => state.editMode);

  return (
    <button
      className={cn(editMode ? "dark:text-white" : "text-gray-500", className)}
      onClick={() => {
        setEditMode();
      }}
    >
      <Icons.edit />
    </button>
  );
}
