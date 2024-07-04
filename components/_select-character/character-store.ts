"use client";

import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export const useContentViewStore = create(
  persist(
    (set: any, get: any) => ({
      view: "all",
      setView: (event: any) =>
        set({
          view: event,
        }),
    }),
    {
      name: "mandarino/content-sentence-view-type", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
