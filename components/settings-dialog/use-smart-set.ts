import {
  getUserPreferenceKey,
  useGetUserPreferenceQuery,
} from "@/domain/user/use-get-user-preference-query";
import { useUpdateUserPrefenceMutation } from "@/domain/user/use-update-user-preference-mutation";
import { useQueryClient } from "@tanstack/react-query";

export const useSmartSet = () => {
  const { data: userPreferences } = useGetUserPreferenceQuery();
  const updateUserPreferenceMutation = useUpdateUserPrefenceMutation();

  const queryClient = useQueryClient();

  const setSmartSet = (value: boolean) => {
    queryClient.setQueryData([getUserPreferenceKey], (old: any) => {
      return { ...old, smartSet: value };
    });
    updateUserPreferenceMutation?.mutate({
      smartSet: value,
    });
  };

  const smartSet = userPreferences?.smartSet || false;

  return {
    smartSet,
    setSmartSet,
  };
};
