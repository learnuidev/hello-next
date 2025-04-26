"use client";

import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export const useCharacterEditStore = create(
  persist(
    (set: any, get: any) => ({
      edit: false,
      setEdit: (event: any) =>
        set({
          edit: event,
        }),
    }),
    {
      name: "mandarino/use-character-edit", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
