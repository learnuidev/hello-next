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
// import { lesson11 } from "./level_11";
// import { lesson12 } from "./level_12";
// import { lesson13 } from "./level_13";
// import { lesson14 } from "./level_14";
// import { lesson15 } from "./level_15";

import { cleanString } from "./utils";
import { lesson21 } from "./lesson_21";
import { lesson23 } from "./lesson_23";
import { lesson22 } from "./lesson_22";
import { lesson24 } from "./lesson_24";
import { lesson25 } from "./lesson_25";
import { lesson26 } from "./lesson_26";
import { lesson27 } from "./lesson_27";
import { lesson28 } from "./lesson_28";
import { lesson29 } from "./lesson_29";
import { lesson30 } from "./lesson_30";
import { lesson31 } from "./lesson_31";
import { lesson32 } from "./lesson_32";
import { lesson33 } from "./lesson_33";
import { lesson34 } from "./lesson_34";
import { lesson35 } from "./lesson_35";
import { lesson36 } from "./lesson_36";
import { lesson37 } from "./lesson_37";
import { lesson38 } from "./lesson_38";
import { lesson39 } from "./lesson_39";
import { lesson40 } from "./lesson_40";

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
      lesson21,
      lesson22,
      lesson23,
      lesson24,
      lesson25,
      lesson26,
      lesson27,
      lesson28,
      lesson29,
      lesson30,
      lesson31,
      lesson32,
      lesson33,
      lesson34,
      lesson35,
      lesson36,
      lesson37,
      lesson38,
      lesson39,
      lesson40,
      // lesson11,
      // lesson12,
      // lesson13,
      // lesson14,
      // lesson15,
    ] as any
  )
    ?.map((lesson: any) => {
      return {
        ...lesson,
        lessons: (lesson?.lessonsV2 as any)
          ? lesson?.lessonsV2
          : lesson?.lesson.map(lessonAdapter),
      };
    })
    ?.map((lesson: any) => {
      return {
        ...lesson,
        lesson: lesson?.lessons?.map((v: any) => {
          const val = [
            ["time", v?.time || [[0, 1.8, "你好!"]]],
            ["", v?.hanzi],
            ["", v?.pinyin],
            ["", v.literal || ""],
            ["", v.en],
          ];

          // console.log("VAL:::", val);

          // return {
          //   id: cleanString(hanzi as string),
          //   time,
          //   names: {
          //     hanzi: mandarinName,
          //     pinyin: pinyinName,
          //     en: enName,
          //   },
          //   pinyin: (pinyin as string)?.trim(),
          //   hanzi,
          //   en: (en as string)?.trim(),
          // };

          return val;

          return [
            ["time", [[0, 1.8, "你好!"]]],
            ["Cindy", " 你 好 ！"],
            ["Cindy", " Nǐhǎo!"],
            ["Cindy", " You-good!"],
            ["Cindy", " Hi!"],
          ];
        }),
      };
    }),
} as any;

console.log("course 1", course1);

export const useConvosStore = create(
  // persist(
  (set: any, get: any) => ({
    convos: [...course1.lessons],
    setConvo: (event: any) => set({ convos: get().convos.concat(event) }),
    removeConvo: (lessonId: any) =>
      set({
        convos: get().convos.filter((lesson: any) => lesson?.id !== lessonId),
      }),
  })
  // {
  //   name: "mandarino/convos", // name of the item in the storage (must be unique)
  //   storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  // }
  // )
);
