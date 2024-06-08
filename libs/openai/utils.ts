export const humanLangs = {
  ne: "Nepali",
  hi: "Hindi",
  nepali: "Nepali",
  hindi: "Hindi",
  hi_IN: "Hindi",
  zh: "Mandarin Chinese (Simple)",
  ml: "Malayalam",
  fr: "French",
  es: "Spanish",
  mo: "Romanian (Moldova)",
} as any;

export const resolveHumanLangs = (lang: string) => humanLangs[lang] || lang;

export const langCodes = {
  ne: "ne",
  hi: "hi",
  nepali: "ne",
  hindi: "hi",
  hi_IN: "hi",
  zh_CN: "zh",
  "zh-CN": "zh",
  zh: "zh",
  ml: "ml",
  fr: "fr",
  es: "es",
  mo: "mo",
  ar: "ar",
} as any;

export const resolveLangCode = (lang: string) => langCodes[lang] || lang;
