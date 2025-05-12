import {
  getUserPreferenceKey,
  useGetUserPreferenceQuery,
} from "@/domain/user/use-get-user-preference-query";
import { useUpdateUserPrefenceMutation } from "@/domain/user/use-update-user-preference-mutation";
import { useQueryClient } from "@tanstack/react-query";

export const useRecentlyWatchedContent = () => {
  const { data: userPreferences } = useGetUserPreferenceQuery();

  const updateUserPreferenceMutation = useUpdateUserPrefenceMutation();
  const queryClient = useQueryClient();

  const _recentlyWatched = userPreferences?.recentlyWatched || {};

  const setRecentlyWatched = (item: any) => {
    queryClient.setQueryData([getUserPreferenceKey], (old: any) => {
      return {
        ...old,
        recentlyWatched: {
          ...userPreferences?.recentlyWatched,
          [item?.id]: {
            watchedAt: Date.now(),
            id: item?.id,
            title: item?.title,
            audio: item?.audio,
          },
        },
      };
    });

    updateUserPreferenceMutation?.mutate({
      recentlyWatched: {
        ...userPreferences?.recentlyWatched,
        [item?.id]: {
          watchedAt: Date.now(),
          id: item?.id,
          title: item?.title,
          audio: item?.audio,
        },
      },
    });
  };

  const recentlyWatched = Object.values(_recentlyWatched)?.sort(
    (a: any, b: any) => b?.watchedAt - a?.watchedAt
  );

  return { recentlyWatched, setRecentlyWatched };
};
