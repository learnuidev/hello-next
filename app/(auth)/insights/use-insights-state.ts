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

export const useInsightsState = create((set: any, get: any) => ({
  currentMonth: null,
  toDate: fromDate,
  setToDate: (mode: any) => set({ toDate: mode }),
  setCurrentMonth: (mode: any) => set({ currentMonth: mode }),
}));
