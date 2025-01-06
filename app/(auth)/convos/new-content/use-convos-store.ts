"use client";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export const convoContentStore = create(
  persist(
    (set: any, get: any) => ({
      content: "",
      setContent: (event: any) => set({ content: event }),
    }),
    {
      name: "mandarino/convo-content", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const useConvosStore = create(
  persist(
    (set: any, get: any) => ({
      convos: [],
      setConvo: (event: any) => set({ convos: get().convos.concat(event) }),
      removeConvo: (lessonId: any) =>
        set({
          convos: get().convos.filter((lesson: any) => lesson?.id !== lessonId),
        }),
    }),
    {
      name: "mandarino/convos", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
