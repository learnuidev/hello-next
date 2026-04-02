import { cn } from "@/lib/utils";
import { Icons } from "../ui/icons.v2";

import { useContentEditStore } from "./use-content-edit-store";
import { useGetAuthUserProfileQuery } from "@/hooks/user/use-get-auth-user-profile";
import { useParams } from "next/navigation";
import { useGetContentQuery } from "@/domain/content/content.queries";

function useIsContentAuthor(contentId: string) {
  const { data } = useGetAuthUserProfileQuery();

  const { data: content } = useGetContentQuery({
    contentId,
  });

  return content?.userId === data?.email;
}

export function ContentEditButton({ className }: { className?: string }) {
  const setEditMode = useContentEditStore((state) => state.setEditMode);
  const editMode = useContentEditStore((state) => state.editMode);
  const params = useParams<{ "content-id": string }>();

  const isAuthor = useIsContentAuthor(params["content-id"]);

  if (!isAuthor) {
    return null;
  }

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
