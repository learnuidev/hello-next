import { createIndexDBStore } from "@/libs/index-db/index-db";
import { useUpsetContentAnalyticsHandler } from "../../[content-id]/hooks/use-upsert-content-analytics-handler";

const useFocusIndexStore = createIndexDBStore({
  name: "content/play-v3.use-focus-index",
  handler: (set: any, get: any) => ({
    focusIndexes: {},
    setFocusIndexes: (contentId: string, mode: any) => {
      set({
        focusIndexes: {
          ...get().focusIndexes,
          [contentId]: mode,
        },
      });
    },
  }),
});

export const useFocusIndex = (contentId: string) => {
  const focusIndexes: any = useFocusIndexStore((state) => state.focusIndexes);
  const setFocusIndexes = useFocusIndexStore((state) => state.setFocusIndexes);

  const { upsertContentAnalyticsHandler } =
    useUpsetContentAnalyticsHandler(contentId);

  const focusIndex = focusIndexes?.[contentId] || 0;
  const setFocusIndex = (index: any) => {
    upsertContentAnalyticsHandler({ focusIndex: index });
    setFocusIndexes(contentId, index);
  };

  return { focusIndex, setFocusIndex };
};
