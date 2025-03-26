"use client";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

import {
  // course,
  course2,
  course3,
  course4,
  course5,
  course6,
  course7,
  course8,
  course9,
} from "./pronounciation_data";
const pronunciationMasterclass = {
  title: "Pronunciation Masterclass",
  appType: "speak",
  lessons: [
    // course,
    course2,
    course3,
    course4,
    course5,
    course6,
    course7,
    course8,
    course9,
  ],
} as any;

export const useSpeakStore = create(
  persist(
    (set: any, get: any) => ({
      lessons: [...pronunciationMasterclass.lessons],
      setLesson: (event: any) => set({ lessons: get().lessons.concat(event) }),
      setSpeak: (lessonId: string, event: any) => {
        console.log("YO");
        const updatedLessons = get().lessons.map((lesson: any) => {
          if (lesson.id === lessonId) {
            const newLesson = {
              id: event?.id,
              pinyin: event?.pinyin,
              title: event?.title,
              hanzi: event?.hanzi,
              hanziV2: event?.hanzi,
              en: event?.en,
              soundFemale: event?.audio,
              sound: event?.audio,
              type: "quiz",
            };

            console.log("NEW LESSON", newLesson);
            const updatedLesson = {
              ...lesson,
              lessons: lesson?.lessons?.concat(newLesson),
            };

            console.log("UPDATED LESSON", updatedLesson);
            return updatedLesson;
          }

          return lesson;
        });
        return set({ lessons: updatedLessons });
      },
      removeLesson: (lessonId: string, speakId: string) => {
        console.log("YO");
        const updatedLessons = get().lessons.map((lesson: any) => {
          if (lesson.id === lessonId) {
            const updatedLesson = {
              ...lesson,
              lessons: lesson?.lessons?.filter((l: any) => l.id !== speakId),
            };

            console.log("UPDATED LESSON", updatedLesson);
            return updatedLesson;
          }

          return lesson;
        });
        return set({ lessons: updatedLessons });
      },
    }),
    {
      name: "mandarino/speak-v2023-07-07-3", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
