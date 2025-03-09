import { createIndexDBStore } from "@/libs/index-db/index-db";

const useClipboardFocusedStore = createIndexDBStore({
  name: "clipboard/focused",
  handler: (set: any, get: any) => ({
    selected: null,
    setFocusedWord: (f: any) =>
      typeof f === "function"
        ? set({ selected: f(get().selected) })
        : set({ selected: f }),
  }),
});

export const useClipboardFocused = () => {
  const focusedWord: any = useClipboardFocusedStore((state) => state.selected);
  const setFocusedWord = useClipboardFocusedStore(
    (state) => state.setFocusedWord
  );

  return { focusedWord, setFocusedWord };
};
