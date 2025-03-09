import { createIndexDBStore } from "@/libs/index-db/index-db";

const useReadModeStore = createIndexDBStore({
  name: "clipboard/read-mode-store",
  handler: (set: any, get: any) => ({
    selected: null,
    setFocusedWord: (f: any) =>
      typeof f === "function"
        ? set({ selected: f(get().selected) })
        : set({ selected: f }),
  }),
});

export const useClipboardFocused = () => {
  const focusedWord: any = useReadModeStore((state) => state.selected);
  const setFocusedWord = useReadModeStore((state) => state.setFocusedWord);

  return { focusedWord, setFocusedWord };
};
