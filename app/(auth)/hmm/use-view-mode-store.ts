import { persist, createJSONStorage } from 'zustand/middleware'
import { create } from 'zustand'

export const useViewModeStore = create((set: any, get: any) => ({
  viewMode: 'lesson',
  setViewMode: (mode: any) => set({ viewMode: mode })
}))
