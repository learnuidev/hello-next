import {
  getUserPreferenceKey,
  useGetUserPreferenceQuery,
} from "@/domain/user/use-get-user-preference-query";
import { useUpdateUserPrefenceMutation } from "@/domain/user/use-update-user-preference-mutation";
import { useQueryClient } from "@tanstack/react-query";
import { useIsContent } from "./use-is-content";
import { useGetReviewParams } from "./use-get-review-params";

export const useClozeContentMode = (contentId?: string) => {
  const { data: userPreferences } = useGetUserPreferenceQuery();
  const updateUserPreferenceMutation = useUpdateUserPrefenceMutation();

  const isContent = useIsContent(contentId || "");

  const queryClient = useQueryClient();

  const clozeContentMode =
    userPreferences?.clozeContentMode || isContent ? "content" : "hsk";

  const setClozeContentMode = (contentMode: "hsk" | "content") => {
    queryClient.setQueryData([getUserPreferenceKey], (old: any) => {
      return { ...old, clozeContentMode: contentMode };
    });
    updateUserPreferenceMutation?.mutate({
      clozeContentMode: contentMode,
    });
  };

  return { setClozeContentMode, clozeContentMode };
};

export const ContentClozeModeButton = ({
  contentId,
}: {
  contentId?: string;
}) => {
  const { clozeContentMode, setClozeContentMode } = useClozeContentMode();

  const { mode } = useGetReviewParams();

  const isContent = useIsContent(contentId || mode);

  if (!isContent) {
    return null;
  }

  if (clozeContentMode === "content") {
    return (
      <button
        onClick={() => {
          setClozeContentMode("hsk");
        }}
      >
        Switch to: HSK Mode
      </button>
    );
  }
  return (
    <button
      onClick={() => {
        setClozeContentMode("content");
      }}
    >
      Switch to: Content Mode
    </button>
  );
};
