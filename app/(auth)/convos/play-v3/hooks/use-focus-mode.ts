import { createIndexDBStore } from "@/libs/index-db/index-db";
import { useGetContentAnalyticsQuery } from "../../convo-insights/hooks/get-content-analytics-query";

const useFocusModesStore = createIndexDBStore({
  name: "content/play-v3.use-focus-mode",
  handler: (set: any, get: any) => ({
    focusModes: {},
    setFocusModes: (contentId: string, mode: any) => {
      set({
        focusModes: {
          ...get().focusModes,
          [contentId]: mode,
        },
      });
    },
  }),
});

export const useFocusMode = (contentId: string) => {
  const focusModes: any = useFocusModesStore((state) => state.focusModes);
  const setFocusModes = useFocusModesStore((state) => state.setFocusModes);

  // const { data } = useGetContentAnalyticsQuery({ contentId });

  const focusMode = focusModes?.[contentId];
  const setFocusMode = (mode: any) => {
    setFocusModes(contentId, mode);
  };

  return { focusMode, setFocusMode };
};
