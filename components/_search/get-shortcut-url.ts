export const getShortCutUrl = (query: string) => {
  // const [objective, lang, ...rest] = query?.split(" ");

  const shortCutLangs = {
    ko: "ko",
    korean: "ko",
    ja: "ja",
    jp: "ja",
    japan: "ja",
    japanese: "ja",
    es: "es",
    spanish: "es",
    fr: "fr",
    french: "fr",
    zh: "zh",
    chinese: "zh",
    hanzi: "zh",
    fa: "fa",
    farsi: "fa",
    persian: "fa",
    ne: "ne",
    nepali: "ne",
    ar: "ar",
    arabic: "ar",
    v: "v",
    vi: "vi",
    viet: "vi",
    vietnam: "vi",
    vietnamese: "vi",
    ur: "ur",
    urdu: "ur",

    russian: "ru",
    ru: "ru",
    putin: "ru",
    ruski: "ru",
    russkiy: "ru",
  } as any;

  const shortCutLang = shortCutLangs[query.toLowerCase()];

  if (shortCutLang) {
    return `/nmm?lang=${shortCutLang}`;
  }
};
