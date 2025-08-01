import { createIndexDBStore } from "@/libs/index-db/index-db";
import { useMemo } from "react";
import { create } from "zustand";

const useContentPlayContextStore = create((set: any, get: any) => ({
  contextId: crypto.randomUUID(),
  setNewContextId: () => set({ contextId: crypto.randomUUID() }),
}));

export const useContextPlayContextState = () => {
  const contextId = useContentPlayContextStore((state) => state.contextId);
  const setNewContextId = useContentPlayContextStore(
    (state) => state.setNewContextId
  );

  return {
    contextId,
    setNewContextId,
  };
};

export const usePlayHistoryStore = createIndexDBStore({
  name: "content/play-history-store-v2",
  handler: (set: any, get: any) => ({
    history: [],

    removeHistoryForContentId: (contentId: string) => {
      const oldHistory = get().history;

      const historyWithContentIdRemoved = oldHistory?.filter(
        (item: any) => item?.contentId !== contentId
      );

      set({ history: historyWithContentIdRemoved });
    },
    setHistory: (f: any) => {
      const oldHistory = get().history;
      if (typeof f === "function") {
        set({ history: f(oldHistory) });
      } else {
        set({ history: oldHistory.concat(f) });
      }
    },
  }),
});

export const usePlayHistoryState = ({ contentId }: { contentId: string }) => {
  const history = usePlayHistoryStore((state) => state.history);
  const setHistory = usePlayHistoryStore((state) => state.setHistory);

  return useMemo(() => {
    return {
      history: history?.filter((item: any) => item?.contentId === contentId),
      setHistory,
    };
  }, [contentId, history, setHistory]);
};
