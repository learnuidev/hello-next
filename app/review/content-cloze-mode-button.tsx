import {
  getUserPreferenceKey,
  useGetUserPreferenceQuery,
} from "@/domain/user/use-get-user-preference-query";
import { useUpdateUserPrefenceMutation } from "@/domain/user/use-update-user-preference-mutation";
import { useQueryClient } from "@tanstack/react-query";
import { useIsContent } from "./use-is-content";
import { useGetReviewParams } from "./use-get-review-params";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useGetCharacterLearningContext } from "@/components/_select-character/selected-character/use-get-character-learning-context";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useGetCurrentReviewCharacter } from "./use-get-current-review-character";

export const useClozeContentMode = (contentId?: string) => {
  const { data: userPreferences } = useGetUserPreferenceQuery();
  const updateUserPreferenceMutation = useUpdateUserPrefenceMutation();

  const isContent = useIsContent(contentId || "");

  const queryClient = useQueryClient();

  const clozeContentMode = useMemo(() => {
    if (userPreferences?.clozeContentMode) {
      return userPreferences?.clozeContentMode;
    }

    return isContent ? "content" : "hsk";
  }, [isContent, userPreferences?.clozeContentMode]);

  const setClozeContentMode = (contentMode: "hsk" | "content") => {
    queryClient.setQueryData([getUserPreferenceKey], (old: any) => {
      return { ...old, clozeContentMode: contentMode };
    });
    updateUserPreferenceMutation?.mutate({
      clozeContentMode: contentMode,
    });
  };

  return {
    setClozeContentMode,
    clozeContentMode: clozeContentMode,
  };
};

export const ContentClozeModeButton = ({
  contentId,
}: {
  contentId?: string;
}) => {
  const { clozeContentMode, setClozeContentMode } = useClozeContentMode();

  const { mode } = useGetReviewParams();

  const {
    currentCharacter,
    lang,
    isLoading: isReviewCharactersLoading,
  } = useGetCurrentReviewCharacter();

  const contextSentences = useGetCharacterLearningContext({
    lang,
    characterId: currentCharacter,
  });

  const isContent = useIsContent(contentId || mode);

  // if (!isContent) {
  //   return null;
  // }

  const isContentMode = clozeContentMode === "content";

  // if (!contextSentences?.length) {
  //   return null;
  // }

  return (
    <Button
      className="rounded-full"
      variant={"outline"}
      onClick={() => {
        if (isContentMode) {
          setClozeContentMode("hsk");
        } else {
          setClozeContentMode("content");
        }
      }}
    >
      {isContentMode ? "HSK Mode" : "Content Mode"}
    </Button>
  );
};
