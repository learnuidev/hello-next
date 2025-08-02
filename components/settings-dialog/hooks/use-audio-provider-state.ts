import { createIndexDBStore } from "@/libs/index-db/index-db";

const useAudioProviderStore = createIndexDBStore({
  name: "mando/audio-provider",
  handler: (set: any, get: any) => ({
    provider: "minimax",
    setProvider: (f: any) => set({ provider: f }),
  }),
});

export const officialAudioProviders = [
  { id: "narakeet", title: "Narakeet" },
  { id: "speechify", title: "Speechify" },
  { id: "minimax", title: "Minimax" },
];

export const useAudioProviderState = () => {
  const provider: any = useAudioProviderStore((state) => state.provider);
  const setProvider = useAudioProviderStore((state) => state.setProvider);

  return { provider, setProvider };
};
