import { createIndexDBStore } from "@/libs/index-db/index-db";
import { useSearchParams } from "next/navigation";

const useCurrentTimeStore = createIndexDBStore({
  name: "content/current-time",
  handler: (set: any, get: any) => ({
    durations: {},
    setDurations: (id: string, time: any) =>
      set({
        durations: {
          ...get().durations,
          [id]: time,
        },
      }),
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

export const useCurrentTime = (id: string, useParams?: boolean) => {
  const searchParams = useSearchParams();

  const start: any = searchParams.get("start") || 0;

  const currentTimes: any = useCurrentTimeStore((state) => state.currentTimes);
  const setCurrentTimes = useCurrentTimeStore((state) => state.setCurrentTimes);
  const currentTime = currentTimes?.[id];
  const setCurrentTime = (time: number) => {
    return setCurrentTimes(id, time);
  };
  const durations: any = useCurrentTimeStore((state) => state.durations);
  const setDurations = useCurrentTimeStore((state) => state.setDurations);
  const duration = durations?.[id];
  const setDuration = (time: number) => {
    return setDurations(id, time);
  };

  return {
    currentTime: useParams && start ? parseFloat(start) : currentTime,
    setCurrentTime,
    duration,
    setDuration,
  };
};
