"use client";

import { create } from "zustand";

/**
 * The content picked in the overview sidebar's "Content Examples" tab.
 *
 * It is deliberately shared, not local to the sidebar: the reader view reads
 * the same selection, so picking a content and then opening the reader reads
 * that content instead of everything the character appears in.
 *
 * The id is what filtering needs; the title is kept only to label the reader.
 */
interface SelectedContentState {
  selectedContentId: string;
  selectedContentTitle: string | null;
  setSelectedContent: (content: { id: string; title: string } | null) => void;
}

export const ALL_CONTENTS = "all";

export const useSelectedContentStore = create<SelectedContentState>((set) => ({
  selectedContentId: ALL_CONTENTS,
  selectedContentTitle: null,
  setSelectedContent: (content) =>
    set({
      selectedContentId: content?.id || ALL_CONTENTS,
      selectedContentTitle: content?.title || null,
    }),
}));
