import { persist, createJSONStorage } from 'zustand/middleware'
import { create } from 'zustand'

export const usePinyinModeStore = create((set: any, get: any) => ({
  pinyinMode: false,
  setPinyinMode: (mode: any) => set({ pinyinMode: mode })
}))
export const useModeStore = create((set: any, get: any) => ({
  mode: '',
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




