import { create } from "zustand";

export const useConvoStore = create((set) => ({
  view: "",
  setView: (id: string) => set(() => ({ view: id })),
}));
