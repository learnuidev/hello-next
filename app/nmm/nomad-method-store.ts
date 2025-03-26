import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

// export const useCurrentStepStore = create((set: any, get: any) => ({
//   currentStepId: 0,
//   setCurrentStepId: (f: any) =>
//     set((state: any) => ({
//       currentStepId: typeof f === "function" ? f(state.currentStepId) : f,
//     })),
// }));

// import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

const useCurrentStepStore = create(
  persist(
    (set, get) => ({
      currentStepId: 0,
      setCurrentStepId: (f: any) =>
        set((state: any) => ({
          currentStepId: typeof f === "function" ? f(state.currentStepId) : f,
        })),
    }),
    {
      name: "current-step-id", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const initCharacter = {
  hanzi: "",
  pinyin: "",
  level: "",
  en: "",
  nomad: "",
  destination: "",
  location: "",
  journeyId: "",
  // todo | completed
  status: "",
  story: "",
  sub_components: "",
};
export const useCharacterStore = create(
  persist(
    (set, get) => ({
      character: initCharacter,
      setCharacter: (f: any) =>
        set((state: any) => ({
          character: typeof f === "function" ? f(state) : f,
        })),
    }),
    {
      name: "current-chracter-id", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
