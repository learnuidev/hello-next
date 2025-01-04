import { createIndexDBStore } from "@/libs/index-db/index-db";

export const useCharacterContextStore = createIndexDBStore({
  name: "mandarino/character-context-4",
  handler: (set: any, get: any) => ({
    context: [],
    // setContext: (event: any) => set({ context: get().context.concat(event) }),
    setContext: (f: any) =>
      typeof f === "function"
        ? set({ context: f(get().context) })
        : set({ context: get().context.concat(f) }),
    clearContext: (event: any) => set({ context: [] }),
  }),
});
