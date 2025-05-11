import { useGetUserPreferenceQuery } from "@/domain/user/use-get-user-preference-query";
import { useUpdateUserPrefenceMutation } from "@/domain/user/use-update-user-preference-mutation";
import { createIndexDBStore } from "@/libs/index-db/index-db";

const useRecentlyWatchedContentStore = createIndexDBStore({
  name: "recently-watched-content",
  handler: (set: any, get: any) => ({
    recentlyWatched: {},
    setRecentlyWatched: (f: any) =>
      typeof f === "function"
        ? set({ recentlyWatched: f(get().recentlyWatched) })
        : set({
            recentlyWatched: {
              ...get().recentlyWatched,
              [f?.id]: { ...f, watchedAt: Date.now() },
            },
          }),
  }),
});

export const useRecentlyWatchedContent = () => {
  const { data: userPreferences } = useGetUserPreferenceQuery();
  // const _recentlyWatched: any = useRecentlyWatchedContentStore(
  //   (state) => state.recentlyWatched
  // );

  const updateUserPreferenceMutation = useUpdateUserPrefenceMutation();

  const _recentlyWatched = userPreferences?.recentlyWatched || {};
  // const setRecentlyWatched = useRecentlyWatchedContentStore(
  //   (state) => state.setRecentlyWatched
  // );
  const setRecentlyWatched = (item: any) => {
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
