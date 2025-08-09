import { useListContentsQuery } from "@/domain/content/content.queries";
import {
  getUserPreferenceKey,
  useGetUserPreferenceQuery,
} from "@/domain/user/use-get-user-preference-query";
import { useUpdateUserPrefenceMutation } from "@/domain/user/use-update-user-preference-mutation";
import { useQueryClient } from "@tanstack/react-query";
import { useListPublishedContentsQuery } from "./[content-id]/hooks/use-list-published-contents-query";

const removeFromHistory = (recentlyWatched: any, id: string) => {
  return Object.fromEntries(
    Object.entries(recentlyWatched)?.filter((val) => {
      return val?.[0] !== id;
    })
  );
};

export const useRecentlyWatchedContent = () => {
  const { data: userPreferences } = useGetUserPreferenceQuery();

  const updateUserPreferenceMutation = useUpdateUserPrefenceMutation();
  const queryClient = useQueryClient();

  const { data: publishedContents } = useListPublishedContentsQuery({});

  const { data: contents } = useListContentsQuery();

  const _recentlyWatched = userPreferences?.recentlyWatched || {};

  const setRecentlyWatched = (item: any, action?: "remove" | "update") => {
    let contentItem = publishedContents?.items?.find(
      (content: any) => content?.id === item?.id
    );

    if (!contentItem) {
      contentItem = contents?.items?.find(
        (content: any) => content?.id === item?.id
      );
    }

    if (action === "remove") {
      queryClient.setQueryData([getUserPreferenceKey], (old: any) => {
        return {
          ...old,
          recentlyWatched: removeFromHistory(old?.recentlyWatched, item?.id),
        };
      });

      updateUserPreferenceMutation?.mutate({
        recentlyWatched: removeFromHistory(_recentlyWatched, item?.id),
      });

      return;
    }

    if (item?.id && contentItem?.id) {
      queryClient.setQueryData([getUserPreferenceKey], (old: any) => {
        return {
          ...old,
          recentlyWatched: {
            ...old?.recentlyWatched,
            [item?.id]: {
              watchedAt: Date.now(),
              totalWatched:
                (_recentlyWatched?.[item?.id || contentItem?.id]
                  ?.totalWatched || 0) + 1,
              id: item?.id || contentItem?.id,
              title: item?.title || contentItem?.title,
              audio: item?.audio || contentItem?.audio,
            },
          },
        };
      });

      updateUserPreferenceMutation?.mutate({
        recentlyWatched: {
          ..._recentlyWatched,
          [item?.id || contentItem?.id]: {
            watchedAt: Date.now(),
            totalWatched:
              (_recentlyWatched?.[item?.id || contentItem?.id]?.totalWatched ||
                0) + 1,
            id: item?.id,
            title: item?.title || contentItem?.title,
            audio: item?.audio || contentItem?.title,
          },
        },
      });
    }
  };

  const recentlyWatched = Object.values(_recentlyWatched)?.sort(
    (a: any, b: any) => b?.watchedAt - a?.watchedAt
  );

  return {
    recentlyWatched,
    setRecentlyWatched,
    recentlyWatchedMap: _recentlyWatched,
    isLoading: updateUserPreferenceMutation.isPending,
  };
};
