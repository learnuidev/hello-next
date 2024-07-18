import { create } from "zustand";

export const useContentTypeStore = create((set: any, get: any) => ({
  contentType: "all",
  setContentType: (contentType: any) => set({ contentType }),
  resetContentType: () => set({ contentType: "all" }),
}));
