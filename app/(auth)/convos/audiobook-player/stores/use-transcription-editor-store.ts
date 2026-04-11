import { create } from "zustand";

type LocalTranscription = {
  id: string;
  start: number;
  end: number;
  input?: string;
  en?: string;
  pinyin?: string;
  roman?: string;
  hanzi?: string;
  chinglish?: string;
  words?: any[];
  lang?: string;
  _isNew?: boolean;
};

type TranscriptionEditorState = {
  localTranscriptions: LocalTranscription[] | null;
  setLocalTranscriptions: (transcriptions: LocalTranscription[] | null) => void;
  reset: () => void;
};

export const useTranscriptionEditorStore = create<TranscriptionEditorState>((set, get) => ({
  localTranscriptions: null,

  setLocalTranscriptions: (transcriptions) => {
    if (transcriptions) {
      set({ localTranscriptions: [...transcriptions] });
    } else {
      set({ localTranscriptions: null });
    }
  },

  reset: () => set({ localTranscriptions: null })
}));
