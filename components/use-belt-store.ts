import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import { belts } from "@/app/nmm/utils";

export const useBeltStore = create((set: any, get: any) => ({
  selectedBelt: belts?.[6],
  setSelectedBelt: (mode: any) => set({ selectedBelt: mode }),
}));
