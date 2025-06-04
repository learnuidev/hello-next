import { createIndexDBStore } from "@/libs/index-db/index-db";

export const useCharacterContextStore = createIndexDBStore({
  name: "mandarino/character-context-7",
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

export const useSetIfExists = () => {
  const context = useCharacterContextStore((state) => state.context);
  const setContext = useCharacterContextStore((state) => state.setContext);

  const setIfExists = (evt: any) => {
    const exists = context?.filter(
      (ctx: any) => (ctx?.input || ctx?.hanzi) === (evt?.input || evt?.hanzi)
    )?.[0];

    if (exists) {
      // return setContext(context);
      return null;
    }
    setContext((prev: any) => prev?.concat(evt));
    return null;
  };

  return setIfExists;
};
