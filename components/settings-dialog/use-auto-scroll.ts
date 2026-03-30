import {
  getUserPreferenceKey,
  useGetUserPreferenceQuery,
} from "@/domain/user/use-get-user-preference-query";
import { useUpdateUserPrefenceMutation } from "@/domain/user/use-update-user-preference-mutation";
import { useQueryClient } from "@tanstack/react-query";

export const useAutoScroll = () => {
  const { data: userPreferences } = useGetUserPreferenceQuery();
  const updateUserPreferenceMutation = useUpdateUserPrefenceMutation();

  const queryClient = useQueryClient();

  const setAutoScroll = (value: boolean) => {
    queryClient.setQueryData([getUserPreferenceKey], (old: any) => {
      return { ...old, autoScroll: value };
    });
    updateUserPreferenceMutation?.mutate({
      autoScroll: value,
    });
  };

  const autoScroll = userPreferences?.autoScroll || false;

  return {
    autoScrollWhilePlaying: autoScroll,
    setAutoScrollWhilePlaying: setAutoScroll,
  };
};
