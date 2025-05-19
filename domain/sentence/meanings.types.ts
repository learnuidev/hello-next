export interface HanziUseCase {
  en: string;
  hanzi: string;
  pinyin: string;
  explanation: string;
}

export interface MeaningItem {
  explanation: string;
  meaning: string;
  use_cases: HanziUseCase[];
}

export interface ListMeaningsResponse {
  summary: string;
  sentenceId: string;
  creator: string;
  meanings: MeaningItem[];
  createdAt: number;
  id: string;
  lang?: string;
  details: {
    pinyin: string;
    hanzi: string;
    en: string;
    roman: string;
  };

  audioUrl?: string;
}
