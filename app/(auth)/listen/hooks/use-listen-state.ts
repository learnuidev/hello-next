"use client";

import { create } from "zustand";
import { ContentType, FilterType } from "../listen.types";

const useListenStore = create((set: any, get: any) => ({
  contentType: "all",
  setContentType: (contentType: ContentType) => set({ contentType }),
  resetContentType: () => set({ contentType: "all" }),

  filterType: "date-listened",
  setFilterType: (filterType: FilterType) => set({ filterType }),
}));

export const useListenState = () => {
  // Content type state and handlers
  const contentType = useListenStore((state) => state.contentType);
  const setContentType = useListenStore((state) => state.setContentType);
  const resetContentType = useListenStore((state) => state.resetContentType);

  // Filter type state and handler
  const filterType = useListenStore((state) => state.filterType);
  const setFilterType = useListenStore((state) => state.setFilterType);

  return {
    // Content type state and actions
    contentType,
    setContentType,
    resetContentType,
    // Filter type state and action
    filterType,
    setFilterType,
  };
};
