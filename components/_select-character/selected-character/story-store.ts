import { create } from "zustand";

export const useStoryStore = create((set) => ({
  story: "",
  setStory: (id: string) => set(() => ({ story: id })),
}));
