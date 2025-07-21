"use client";

import { create } from "zustand";

const useNewBookStore = create((set: any, get: any) => ({
  editChapter: false,
  setEditChapter: (editChapter: boolean) => set({ editChapter }),
  title: "",
  setTitle: (title: string) => set({ title }),
  lang: "",
  setLang: (lang: string) => set({ lang }),
  author: "",
  setAuthor: (author: string) => set({ author }),

  chapters: [],
  setChapters: (chapters: any) => set({ chapters }),
  addNewChapter: () => {
    const oldChapters = get().chapters;

    const _newChapter = {
      title: "",
      id: `temp_${crypto.randomUUID()}`,
      isNew: true,
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

  resetState: () =>
    set({ title: "", author: "", chapters: [], editChapter: false }),
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

  const setChapters = useNewBookStore((state) => state.setChapters);
  const addNewChapter = useNewBookStore((state) => state.addNewChapter);
  const updateChapter = useNewBookStore((state) => state.updateChapter);
  const removeChapter = useNewBookStore((state) => state.removeChapter);

  const editChapter = useNewBookStore((state) => state.editChapter);
  const setEditChapter = useNewBookStore((state) => state.setEditChapter);

  return {
    title,
    setTitle,

    lang,
    setLang,

    author,
    setAuthor,

    resetState,

    chapters,
    setChapters,
    addNewChapter,
    updateChapter,
    removeChapter,

    // edit
    editChapter,
    setEditChapter,
  };
};
