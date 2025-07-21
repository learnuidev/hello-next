"use client";

import { create } from "zustand";

const useNewChapterSectionsStore = create((set: any, get: any) => ({
  editSection: false,
  setEditSection: (val: boolean) => set({ editSection: val }),
  title: "",
  setTitle: (title: string) => set({ title }),

  sections: [],
  addNewSection: ({ title, mediaId }: { title: string; mediaId: string }) => {
    const oldSections = get().sections;

    const _newSection = {
      title,
      mediaId,
      id: crypto.randomUUID(),
      sectionNumber: oldSections?.length + 1,
    };

    set({ sections: oldSections.concat(_newSection) });
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
    const updatedSections = get().chapters.map(
      (chapter: { id: string; title: string; sectionNumber: number }) => {
        if (chapter.id === updatedSection.id) {
          return {
            ...chapter,
            ...updatedSection,
          };
        }

        return chapter;
      }
    );

    set({ chapters: updatedSections });
  },

  resetState: () => set({ title: "", author: "", sections: [] }),
}));

export const useNewChapterSectionsState = () => {
  const title = useNewChapterSectionsStore((state) => state.title);
  const setTitle = useNewChapterSectionsStore((state) => state.setTitle);

  const sections = useNewChapterSectionsStore((state) => state.sections);
  const addNewSection = useNewChapterSectionsStore(
    (state) => state.addNewSection
  );
  const updateSection = useNewChapterSectionsStore(
    (state) => state.updateSection
  );
  const removeSection = useNewChapterSectionsStore(
    (state) => state.removeSection
  );
  const editSection = useNewChapterSectionsStore((state) => state.editSection);
  const setEditSection = useNewChapterSectionsStore(
    (state) => state.setEditSection
  );

  return {
    title,
    setTitle,

    sections,
    addNewSection,
    updateSection,
    removeSection,
    editSection,
    setEditSection,
  };
};
