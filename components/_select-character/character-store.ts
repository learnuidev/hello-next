import { create } from "zustand";

export const characterStore = create((set: any, get: any) => ({
  pinyin: "",
  setPinyin: (f: any) =>
    typeof f === "function"
      ? set({ pinyin: f(get().pinyin) })
      : set({ pinyin: f }),
}));
