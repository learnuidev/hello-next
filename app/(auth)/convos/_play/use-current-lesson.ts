import { create } from 'zustand'

export const useCurrentLesson = create((set: any, get: any) => ({
  lessonId: null,
  setCurrentLesson: (mode: any) => set({ lessonId: mode })
}))
