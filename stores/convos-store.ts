import { create } from "zustand";

export const useConvosStore = create((set) => ({
  convoId: null,
  setConvoId: (id: string) => set(() => ({ convoId: id })),
  removeConvoId: () => set(() => ({ convoId: null })),

  //    View Types: Used Display Differnt view types
  viewType: "listen",
  setViewType: (id: string) => set(() => ({ viewType: id })),
}));
