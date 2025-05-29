import { createIndexDBStore } from "@/libs/index-db/index-db";
import { useSearchParams } from "next/navigation";

const useCurrentTimeStore = createIndexDBStore({
  name: "content/current-time",
  handler: (set: any, get: any) => ({
    currentTimes: {},
    setCurrentTimes: (id: string, time: any) =>
      set({
        currentTimes: {
          ...get().currentTimes,
          [id]: time,
        },
      }),
  }),
});

export const useCurrentTime = (id: string) => {
  const searchParams = useSearchParams();

  const start: any = searchParams.get("start") || 0;

  const currentTimes: any = useCurrentTimeStore((state) => state.currentTimes);
  const setCurrentTimes = useCurrentTimeStore((state) => state.setCurrentTimes);
  const currentTime = currentTimes?.[id];
  const setCurrentTime = (time: number) => {
    return setCurrentTimes(id, time);
  };

  return {
    currentTime: start ? parseFloat(start) : currentTime,
    setCurrentTime,
  };
};
