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
];

export const isNonRomanLang = (lang: string) =>
  nonRomanLanguages.includes(lang);
