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
