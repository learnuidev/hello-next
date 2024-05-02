import add from "date-fns/add";
import { create } from "zustand";

const fromDate = add(new Date(), {
  years: 0,
  months: 0,
  weeks: 0,
  days: 7,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

export const useTimelineState = create((set: any, get: any) => ({
  focusLang: "",
  setFocusLang: (f: any) =>
    typeof f === "string"
      ? set({ focusLang: f })
      : set({ focusLang: f(get().focusLang) }),
}));
