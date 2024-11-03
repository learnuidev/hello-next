import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// export const usePinyinChartStore = create((set, get: any) => ({
//   selectedCharacter: '',
//   setSelectedCharacter: (selectedCharacter: any) => set({ selectedCharacter }),
//   filters: [],
//   setFilter: (event: any) => {
//     const filters = get().filters
//     const newFilters = filters.includes(event)
//       ? filters.filter((f: any) => f !== event)
//       : filters.concat(event)
//     set({ filters: newFilters })
//   }
// }))

export const usePinyinChartStore = create(
  persist(
    (set: any, get: any) => ({
      selectedCharacter: "",
      setSelectedCharacter: (selectedCharacter: any) =>
        set({ selectedCharacter }),
      filters: [],
      setFilter: (event: any) => {
        const filters = get().filters;
        const newFilters = filters.includes(event)
          ? filters.filter((f: any) => f !== event)
          : filters.concat(event);
        set({ filters: newFilters });
      },
    }),
    {
      name: "mandarino/pinyin-chart-4", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
