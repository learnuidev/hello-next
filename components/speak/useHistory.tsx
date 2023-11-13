'use client'
import { persist, createJSONStorage } from 'zustand/middleware'
import { create } from 'zustand'

export const useHistoryStore = create(
  persist(
    (set: any, get: any) => ({
      history: [],
      setHistory: (event: any) => set({ history: get().history.concat(event) }),
      clearHistory: (event: any) => set({ history: [] })
    }),
    {
      name: 'mandarino/speech-history', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage) // (optional) by default, 'localStorage' is used
    }
  )
)
