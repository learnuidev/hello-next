import { persist, createJSONStorage } from 'zustand/middleware'
import { create } from 'zustand'

export const useFocusModeStore = create((set: any, get: any) => ({
  focusMode: false,
  setFocusMode: (mode: any) => set({ focusMode: mode })
}))
export const useModeStore = create((set: any, get: any) => ({
  mode: 'focus',
  // setMode: (mode: any) => set({ mode: mode })
  setMode: (f: any) =>
    typeof f === 'function' ? set({ mode: f(get().mode) }) : set({ mode: f })
}))
export const useResultsStore = create((set: any, get: any) => ({
  results: {},
  setResults: (f: any) =>
    typeof f === 'function'
      ? set({ results: f(get().results) })
      : set({ results: f })
}))
