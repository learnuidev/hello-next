interface YablaCaption {
  transcript: string;
  translation: string;
  romanization: string;
  time_in: number;
  time_out: number;
  romanization_words: { word: string; lookup: string }[];
  translation_words: { word: string; lookup: string }[];
}

export const parseYablaCaptions = (captions: YablaCaption[]) => {
  return JSON.parse(JSON.stringify(captions)).map((item: YablaCaption) => {
    return {
      lang: "zh",
      id: crypto.randomUUID(),
      input: item.transcript,
      hanzi: item.transcript,
      en: item.translation,
      pinyin: item.romanization,
      roman: item.romanization,
      start: item.time_in,
      end: item.time_out,
      words: item.romanization_words.map((v, idx) => {
        const en = item?.translation_words?.[idx]?.word;
        return {
          roman: v.word,
          hanzi: v.lookup,
          en,
        };
      }),
    };
  });
};
