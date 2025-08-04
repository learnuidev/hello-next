import {
  getUserPreferenceKey,
  useGetUserPreferenceQuery,
} from "@/domain/user/use-get-user-preference-query";
import { useUpdateUserPrefenceMutation } from "@/domain/user/use-update-user-preference-mutation";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListPublishedContentsQuery,
  usePublishedContentsStore,
} from "./[content-id]/hooks/use-list-published-contents-query";

const removeFromHistory = (recentlyWatched: any, item: any) => {
  return Object.fromEntries(
    Object.entries(recentlyWatched)?.filter((val) => {
      return val?.[0] !== item;
    })
  );
};

export const useRecentlyWatchedContent = () => {
  const { data: userPreferences } = useGetUserPreferenceQuery();

  const updateUserPreferenceMutation = useUpdateUserPrefenceMutation();
  const queryClient = useQueryClient();

  const { data: publishedContents } = useListPublishedContentsQuery({});

  const contents: any = usePublishedContentsStore((state) => state.contents);

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

    if (item?.id && contentItem?.id) {
      queryClient.setQueryData([getUserPreferenceKey], (old: any) => {
        if (action === "remove") {
          return {
            ...old,
            recentlyWatched: removeFromHistory(old?.recentlyWatched, item),
          };
        }
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

      if (action === "remove") {
        updateUserPreferenceMutation?.mutate({
          recentlyWatched: removeFromHistory(_recentlyWatched, contentItem),
        });
      } else {
        updateUserPreferenceMutation?.mutate({
          recentlyWatched: {
            ..._recentlyWatched,
            [item?.id || contentItem?.id]: {
              watchedAt: Date.now(),
              totalWatched:
                (_recentlyWatched?.[item?.id || contentItem?.id]
                  ?.totalWatched || 0) + 1,
              id: item?.id,
              title: item?.title || contentItem?.title,
              audio: item?.audio || contentItem?.title,
            },
          },
        });
      }
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
