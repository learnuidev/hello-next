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
  const _recentlyWatched: any = useRecentlyWatchedContentStore(
    (state) => state.recentlyWatched
  );
  const setRecentlyWatched = useRecentlyWatchedContentStore(
    (state) => state.setRecentlyWatched
  );

  const recentlyWatched = Object.values(_recentlyWatched)?.sort(
    (a: any, b: any) => b?.createdAt - a?.createdAt
  );

  return { recentlyWatched, setRecentlyWatched };
};
