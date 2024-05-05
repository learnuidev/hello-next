"use client";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import { nepaliConsonants } from "./data";

export const useWordsStore = create(
  persist(
    (set: any, get: any) => ({
      words: [],
      addWord: (event: any) => set({ words: get().words.concat(event) }),
      setWords: (event: any) => set({ words: event }),
      clearWords: (event: any) => set({ words: [] }),
    }),
    {
      name: "mandarino/nepali-words-2", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

// nepaliConsonants

const determineCharacterStatus = ({
  currentCharacter,
  destinations,
  actors,
  symbols,
}: any) => {
  return [true, {}];
};

export const useNomadMethodStore = create(
  persist(
    (set: any, get: any) => ({
      currentCharacter: "क",
      clearError: () => set({ error: null }),
      setCurrentCharacter: (char: string) => {
        const [status, msg] = determineCharacterStatus({
          currentCharacter: get().currentCharacter,
          destinations: get().destinations,
          actors: get().actors,
          symbols: get().symbols,
        });
        if (status) {
          return set({ currentCharacter: char });
        } else {
          const currentCharacter = get().currentCharacter;
          return set({
            error: {
              type: "character:set",
              message: msg,
              context: {
                currentCharacter,
              },
            },
          });
        }
      },
      destinations: {},
      addDestination: (key: string, event: any) => {
        // const destinations =
        return set({
          destinations: {
            ...get().destinations,
            [key]: event,
          },
        });
      },
      stories: {},
      addStory: (key: string, event: any) => {
        // const destinations =
        return set({
          stories: {
            ...get().stories,
            [key]: event,
          },
        });
      },
      nomads: {},
      addNomad: (key: string, event: any) => {
        // const destinations =
        return set({
          nomads: {
            ...get().nomads,
            [key]: event,
          },
        });
      },
      symbols: {},
      addSymbol: (key: string, event: any) => {
        // const destinations =
        return set({
          symbols: {
            ...get().symbols,
            [key]: event,
          },
        });
      },
    }),
    {
      name: "mandarino/nom-v1", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
