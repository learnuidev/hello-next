"use client";

import { create } from "zustand";

const useNewBookStore = create((set: any, get: any) => ({
  title: "",
  setTitle: (title: string) => set({ title }),
  lang: "",
  setLang: (lang: string) => set({ lang }),
  author: "",
  setAuthor: (author: string) => set({ author }),

  chapters: [],
  addNewChapter: () => {
    const oldChapters = get().chapters;

    const _newChapter = {
      title: "",
      id: crypto.randomUUID(),
      chapterNumber: oldChapters?.length + 1,
    };

    set({ chapters: oldChapters.concat(_newChapter) });
  },

  removeChapter: (id: string) => {
    const updatedChapters = get()
      .chapters?.filter((chapter: { id: string }) => chapter.id !== id)
      .map((chapter: any, idx: number) => {
        return {
          ...chapter,
          chapterNumber: idx + 1,
        };
      });

    set({ chapters: updatedChapters });
  },

  updateChapter: (updatedChapter: { title: string; id: string }) => {
    const updatedChapters = get().chapters.map(
      (chapter: { id: string; title: string; chapterNumber: number }) => {
        if (chapter.id === updatedChapter.id) {
          return {
            ...chapter,
            ...updatedChapter,
          };
        }

        return chapter;
      }
    );

    set({ chapters: updatedChapters });
  },

  resetState: () => set({ title: "", author: "", chapters: [] }),
}));

export const useNewBookState = () => {
  const title = useNewBookStore((state) => state.title);
  const setTitle = useNewBookStore((state) => state.setTitle);
  const lang = useNewBookStore((state) => state.lang);
  const setLang = useNewBookStore((state) => state.setLang);
  const author = useNewBookStore((state) => state.author);
  const setAuthor = useNewBookStore((state) => state.setAuthor);
  const resetState = useNewBookStore((state) => state.resetState);

  const chapters = useNewBookStore((state) => state.chapters);
  const addNewChapter = useNewBookStore((state) => state.addNewChapter);
  const updateChapter = useNewBookStore((state) => state.updateChapter);
  const removeChapter = useNewBookStore((state) => state.removeChapter);

  return {
    title,
    setTitle,

    lang,
    setLang,

    author,
    setAuthor,

    resetState,

    chapters,
    addNewChapter,
    updateChapter,
    removeChapter,
  };
};
