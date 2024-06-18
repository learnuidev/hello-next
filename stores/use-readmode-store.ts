"use client";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export const useReadModeStore = create((set: any, get: any) => ({
  readMode: false,
  setReadMode: (f: any) =>
    typeof f === "function"
      ? set({ readMode: f(get().readMode) })
      : set({ readMode: f }),
}));
