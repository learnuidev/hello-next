import { createIndexDBStore } from "@/libs/index-db/index-db";

const useAudioProviderStore = createIndexDBStore({
  name: "mando/audio-provider",
  handler: (set: any, get: any) => ({
    provider: "minimax",
    setProvider: (f: any) => set({ provider: f }),
  }),
});

export const useAudioProviderState = () => {
  const provider: any = useAudioProviderStore((state) => state.provider);
  const setProvider = useAudioProviderStore((state) => state.setProvider);

  return { provider, setProvider };
};
