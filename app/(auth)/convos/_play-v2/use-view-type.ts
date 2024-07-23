import { create } from "zustand";

export const useViewType = create((set: any, get: any) => ({
  view: "default",
  setView: (f: any) =>
    typeof f === "function" ? set({ view: f(get().view) }) : set({ view: f }),
  focus: "hanzi",
  setFocus: (f: any) =>
    typeof f === "function"
      ? set({ focus: f(get().focus) })
      : set({ focus: f }),
  displayGrammar: false,
  setDisplayGrammar: (f: any) =>
    typeof f === "function"
      ? set({ displayGrammar: f(get().displayGrammar) })
      : set({ displayGrammar: f }),
  hanzi: "",
  setHanzi: (f: any) =>
    typeof f === "function"
      ? set({ hanzi: f(get().hanzi) })
      : set({ hanzi: f }),
}));
