import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface InitialLoadingBannerState {
  lastShownDate: string | null;
  setLastShownDate: (date: string) => void;
}

export const useInitialLoadingBannerStore = create<InitialLoadingBannerState>()(
  persist(
    (set) => ({
      lastShownDate: null,
      setLastShownDate: (date) => set({ lastShownDate: date }),
    }),
    {
      name: "loading-banner-store-v0",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
