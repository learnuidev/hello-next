import { createIndexDBStore } from "@/libs/index-db/index-db";

const useSelectedStore = createIndexDBStore({
  name: "content/current-time",
  handler: (set: any, get: any) => ({
    selected: null,
    setSelected: (selected: any) =>
      set({
        selected,
      }),
  }),
});

export const useSelectedItem = () => {
  const selected = useSelectedStore((state) => state.selected);
  const setSelected = useSelectedStore((state) => state.setSelected);

  return {
    selected,
    setSelected,
  };
};
