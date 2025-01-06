"use client";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import { createIndexDBStore } from "@/libs/index-db/index-db";

export const contentTypeStore = create(
  persist(
    (set: any, get: any) => ({
      type: "",
      setType: (event: any) => set({ type: event }),
    }),
    {
      name: "mandarino/convo-content-type", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const contentSouceUrlStore = create(
  persist(
    (set: any, get: any) => ({
      sourceUrl: "",
      setSourcUrl: (event: any) => set({ sourceUrl: event }),
    }),
    {
      name: "mandarino/content-source-url", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
export const contentSouceBucketStore = create(
  persist(
    (set: any, get: any) => ({
      sourceBucket: "",
      setSourceBucket: (event: any) => set({ sourceBucket: event }),
    }),
    {
      name: "mandarino/content-source-bucket", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const contentFilesStore = create((set: any, get: any) => ({
  files: [],
  setFiles: (event: any) =>
    typeof event === "function"
      ? set({ files: event(get().files) })
      : set({ files: event }),
}));
