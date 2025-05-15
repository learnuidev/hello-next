import {
  getUserPreferenceKey,
  useGetUserPreferenceQuery,
} from "@/domain/user/use-get-user-preference-query";
import { useUpdateUserPrefenceMutation } from "@/domain/user/use-update-user-preference-mutation";
import { useQueryClient } from "@tanstack/react-query";

export const useLearningMode = () => {
  const { data: userPreferences } = useGetUserPreferenceQuery();
  const updateUserPreferenceMutation = useUpdateUserPrefenceMutation();

  const queryClient = useQueryClient();

  const setMode = (type: string) => {
    queryClient.setQueryData([getUserPreferenceKey], (old: any) => {
      return { ...old, activeContent: type };
    });
    updateUserPreferenceMutation?.mutate({
      activeContent: type,
    });
  };

  const mode = userPreferences?.activeContent || "nmm";

  return {
    mode,
    setMode,
  };
};
