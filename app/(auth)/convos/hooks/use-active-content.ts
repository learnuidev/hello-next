import {
  getUserPreferenceKey,
  useGetUserPreferenceQuery,
} from "@/domain/user/use-get-user-preference-query";
import { useUpdateUserPrefenceMutation } from "@/domain/user/use-update-user-preference-mutation";
import { useQueryClient } from "@tanstack/react-query";

export const useActiveContent = () => {
  const queryClient = useQueryClient();

  // const setContentType = useContentTypeStore((state) => state.setContentType);
  // const contentType = useContentTypeStore((state) => state.contentType);

  const { data: userPreferences } = useGetUserPreferenceQuery();
  const updateUserPreferenceMutation = useUpdateUserPrefenceMutation();

  const setActiveContent = (type: string) => {
    queryClient.setQueryData([getUserPreferenceKey], (old: any) => {
      return { ...old, activeContent: type };
    });
    updateUserPreferenceMutation?.mutate({
      activeContent: type,
    });
  };

  const activeContent = userPreferences?.activeContent;

  return {
    activeContent,
    setActiveContent,
  };
};
