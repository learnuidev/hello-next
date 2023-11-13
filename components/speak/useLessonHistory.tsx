'use client'
import { persist, createJSONStorage } from 'zustand/middleware'
import { create } from 'zustand'

export const useLessonHistoryStore = create(
  persist(
    (set: any, get: any) => ({
      history: [],
      setHistory: (event: any) => set({ history: get().history.concat(event) }),
      clearHistory: (event: any) => set({ history: [] })
    }),
    {
      name: 'mandarino/lessson-history', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage) // (optional) by default, 'localStorage' is used
    }
  )
)
