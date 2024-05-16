export type Transcription = {
  hanzi: string;
  pinyin: string;
  start: number;
  en: string;
  end: number;
  step: number;
  pinyn_added_at: number;
  lit?: string;
  seek: number;
  input?: string;
};
