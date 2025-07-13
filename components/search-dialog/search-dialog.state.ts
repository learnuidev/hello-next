import { create } from "zustand";

export const useSearchDialogState = create((set: any, get: any) => ({
  isOpen: false,
  setIsOpen: (isOpen: any) => set({ isOpen }),
  tab: "learn",
  setCurrentTab: (tab: any) => set({ tab }),
  userPreferenceState: {},
  setUserPreferenceState: (props: any) => {
    set({
      userPreferenceState: {
        ...get().userPreferenceState,
        ...props,
      },
    });
  },
}));
