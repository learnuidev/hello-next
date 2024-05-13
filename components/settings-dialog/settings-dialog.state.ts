import { create } from "zustand";

export const useSettingsDialogState = create((set: any, get: any) => ({
  isOpen: false,
  setIsOpen: (isOpen: any) => set({ isOpen }),
  tab: "account",
  setCurrentTab: (tab: any) => set({ tab }),
}));
