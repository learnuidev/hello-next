import { belts } from "@/app/nmm/utils";
import { create } from "zustand";

export const useBeltStore = create((set: any, get: any) => ({
  selectedBelt: belts[0],
  setSelectedBelt: (mode: any) => set({ selectedBelt: mode }),
}));
