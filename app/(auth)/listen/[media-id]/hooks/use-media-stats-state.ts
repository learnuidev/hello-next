import { createIndexDBStore } from "@/libs/index-db/index-db";

const useMediaHistoryStore = createIndexDBStore({
  name: "mandarino/media-repeat-history",
  handler: (set: any, get: any) => ({
    history: [],
    setHistory: (event: any) => set({ history: get().history.concat(event) }),
    clearHistory: (event: any) => set({ history: [] }),
  }),
});

export const useMediaStatsState = (mediaId: string) => {
  const _history = useMediaHistoryStore((state) => state.history);

  const history = _history?.filter((item: any) => item?.mediaId === mediaId);

  const setHistory = useMediaHistoryStore((state) => state.setHistory);
  const clearHistory = useMediaHistoryStore((state) => state.clearHistory);

  return {
    history,
    setHistory,
    clearHistory,
  };
};
