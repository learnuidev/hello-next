import { createIndexDBStore } from "@/libs/index-db/index-db";

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

  const focusMode = focusModes?.[contentId] || false;
  const setFocusMode = (f: any) => {
    if (typeof f === "function") {
      setFocusModes(contentId, f(focusMode));
    } else {
      setFocusModes(contentId, f);
    }
  };

  return { focusMode, setFocusMode };
};
