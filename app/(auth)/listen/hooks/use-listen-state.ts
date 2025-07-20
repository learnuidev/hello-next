"use client";

import { create } from "zustand";
import { ContentType, FilterType } from "../listen.types";

const useListenStore = create((set: any, get: any) => ({
  addNew: false,
  setAddNew: (addNew: boolean) => set({ addNew }),
  addNewContent: false,
  setAddNewContent: (addNewContent: boolean) => set({ addNewContent }),
  addNewBook: false,
  setAddNewBook: (addNewBook: boolean) => set({ addNewBook }),
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

  const addNewContent = useListenStore((state) => state.addNewContent);
  const setAddNewContent = useListenStore((state) => state.setAddNewContent);

  const addNew = useListenStore((state) => state.addNew);
  const setAddNew = useListenStore((state) => state.setAddNew);

  const addNewBook = useListenStore((state) => state.addNewBook);
  const setAddNewBook = useListenStore((state) => state.setAddNewBook);

  return {
    // Content type state and actions
    contentType,
    setContentType,
    resetContentType,
    // Filter type state and action
    filterType,
    setFilterType,

    // add new
    addNew,
    setAddNew,

    // Add new content
    addNewContent,
    setAddNewContent,

    // Add new book
    addNewBook,
    setAddNewBook,
  };
};
