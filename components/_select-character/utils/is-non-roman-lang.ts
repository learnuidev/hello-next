const nonRomanLanguages = [
  "zh",
  "ru",
  "ja",
  "hi",
  "ne",
  "ko",
  "ar",
  "fa",
  "ur",
  "kz",
];

export const isNonRomanLang = (lang: string) =>
  nonRomanLanguages.includes(lang);
