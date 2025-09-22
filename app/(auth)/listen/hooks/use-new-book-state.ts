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
  coverPhotoId: "",
  setCoverPhotoId: (coverPhotoId: string) => set({ coverPhotoId }),

  chapters: [],
  sections: [],
  addNewSection: (section?: any) => {
    const oldSections = get().sections;

    const exists = oldSections?.filter((s: any) => s.id === section.id);

    if (exists?.length > 0) {
      set({
        sections: oldSections.filter((s: any) => s?.id !== section?.id),
      });
    } else {
      set({
        sections: oldSections.concat({
          ...section,
          sectionNumber: oldSections?.length + 1,
        }),
      });
    }
  },

  removeSection: (id: string) => {
    const updatedSections = get()
      .sections?.filter((section: { id: string }) => section.id !== id)
      .map((section: any, idx: number) => {
        return {
          ...section,
          sectionNumber: idx + 1,
        };
      });

    set({ sections: updatedSections });
  },

  updateSection: (updatedSection: { title: string; id: string }) => {
    const updatedSections = get().sections.map((section: any) => {
      if (section.id === updatedSection.id) {
        return {
          ...section,
          ...updatedSection,
        };
      }

      return section;
    });

    set({ sections: updatedSections });
  },
  setSections: (sections: any) => set({ sections }),
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
    set({
      title: "",
      author: "",
      lang: "",
      coverPhotoId: "",
      chapters: [],
      sections: [],
      editChapter: false,
    }),
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
  const sections = useNewBookStore((state) => state.sections);

  const setChapters = useNewBookStore((state) => state.setChapters);
  const addNewChapter = useNewBookStore((state) => state.addNewChapter);
  const updateChapter = useNewBookStore((state) => state.updateChapter);
  const removeChapter = useNewBookStore((state) => state.removeChapter);

  const editChapter = useNewBookStore((state) => state.editChapter);
  const setEditChapter = useNewBookStore((state) => state.setEditChapter);

  const coverPhotoId = useNewBookStore((state) => state.coverPhotoId);
  const setCoverPhotoId = useNewBookStore((state) => state.setCoverPhotoId);

  const addNewSection = useNewBookStore((state) => state.addNewSection);
  const setSections = useNewBookStore((state) => state.setSections);
  const removeSection = useNewBookStore((state) => state.removeSection);

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

    // cover image id
    coverPhotoId,
    setCoverPhotoId,

    // sections
    sections,
    addNewSection,
    setSections,
    removeSection,
  };
};
