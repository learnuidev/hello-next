"use client";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export const usePaginationStore = create((set: any, get: any) => ({
  pagination: {
    start: 0,
    end: 10,
  },
  setPagination: (f: any) =>
    typeof f === "function"
      ? set({ pagination: f(get().pagination) })
      : set({ pagination: f }),
}));
