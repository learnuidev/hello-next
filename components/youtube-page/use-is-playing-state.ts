import { createIndexDBStore } from "@/libs/index-db/index-db";

const useIsPlayingStore = createIndexDBStore({
  name: "content/is-playing",
  handler: (set: any, get: any) => ({
    isPlayings: {},
    setIsPlayings: (id: string, time: boolean) =>
      set({
        isPlayings: {
          ...get().isPlayings,
          [id]: time,
        },
      }),
  }),
});

export const useIsPlayingState = (id: string) => {
  const isPlayings: any = useIsPlayingStore((state) => state.isPlayings);
  const setIsPlayings = useIsPlayingStore((state) => state.setIsPlayings);
  const isPlaying = isPlayings?.[id];
  const setIsPlaying = (time: boolean) => {
    return setIsPlayings(id, time);
  };

  return {
    isPlaying: !!isPlaying,
    setIsPlaying,
  };
};
