import { create } from "zustand";

const useBookStore = create((set: any, get: any) => ({
  showEndPage: false,
  setShowEndPage: (showEndPage: any) => set({ showEndPage }),
}));

export const useBookState = () => {
  const showEndPage = useBookStore((state) => state.showEndPage);
  const setShowEndPage = useBookStore((state) => state.setShowEndPage);

  return {
    showEndPage,
    setShowEndPage,
  };
};
