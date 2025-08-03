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
const romanLanguages = ["fr", "it", "ro", "es"];

export const isNonRomanLang = (lang: string) =>
  nonRomanLanguages.includes(lang);
export const isRomanLang = (lang: string) => romanLanguages.includes(lang);
