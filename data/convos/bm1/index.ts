'use client'
import { persist, createJSONStorage } from 'zustand/middleware'
import { create } from 'zustand'

import { lesson1 } from './level_1'
import { lesson2 } from './level_2'
import { lesson3 } from './level_3'
import { lesson4 } from './level_4'
import { lesson5 } from './level_5'
import { lesson6 } from './level_6'
// import { dumplings } from '../../../stories/dumplings'

export const course1 = {
  title: 'Beginner Mandarin',
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5, lesson6]
} as any

export const useConvosStore = create(
  persist(
    (set: any, get: any) => ({
      convos: [...course1.lessons],
      setConvo: (event: any) => set({ convos: get().convos.concat(event) }),
      removeConvo: (lessonId: any) =>
        set({
          convos: get().convos.filter((lesson: any) => lesson?.id !== lessonId)
        })
    }),
    {
      name: 'mandarino/convos', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage) // (optional) by default, 'localStorage' is used
    }
  )
)
