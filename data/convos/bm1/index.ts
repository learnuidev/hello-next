"use client";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

import { lesson1 } from "./level_1";
import { lesson2 } from "./level_2";
import { lesson3 } from "./level_3";
import { lesson4 } from "./level_4";
import { lesson5 } from "./level_5";
import { lesson6 } from "./level_6";
import { lesson7 } from "./level_7";
import { lesson8 } from "./level_8";
import { lesson9 } from "./level_9";
import { lesson10 } from "./level_10";

import { cleanString } from "./utils";

const lessonAdapter = (lesson: any) => {
  const [
    [timeTitle, time],
    [mandarinName, hanzi],
    [pinyinName, pinyin],
    [litName, literal],
    [enName, en],
  ] = lesson;

  return {
    id: cleanString(hanzi as string),
    time,
    names: {
      hanzi: mandarinName,
      pinyin: pinyinName,
      en: enName,
    },
    pinyin: (pinyin as string)?.trim(),
    hanzi,
    en: (en as string)?.trim(),
  };
};

export const course1 = {
  title: "Beginner Mandarin",
  lessons: (
    [
      lesson1,
      lesson2,
      lesson3,
      lesson4,
      lesson5,
      lesson6,
      lesson7,
      lesson8,
      lesson9,
      lesson10,
    ] as any
  )?.map((lesson: any) => {
    return {
      ...lesson,
      lessons: (lesson?.lessonsV2 as any)
        ? lesson?.lessonsV2
        : lesson?.lesson.map(lessonAdapter),
    };
  }),
} as any;

export const useConvosStore = create(
  persist(
    (set: any, get: any) => ({
      convos: [...course1.lessons],
      setConvo: (event: any) => set({ convos: get().convos.concat(event) }),
      removeConvo: (lessonId: any) =>
        set({
          convos: get().convos.filter((lesson: any) => lesson?.id !== lessonId),
        }),
    }),
    {
      name: "mandarino/convos", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
