import { arabicWords } from "./arabic/arabic-words";
import { catalanWords } from "./catalan/catalan-words";
import { frenchWords } from "./french/french-words";
import { japaneseWords } from "./japanese/japanese-words";
import { koreanWords } from "./korean/korean-words";
import { persianWords } from "./persian/persian-words";
import { russianWords } from "./russian/russian-words";
import { spanishWords } from "./spanish/spanish-words";
import { urduWords } from "./urdu/urdu-words";
import { vietnameseWords } from "./vietnamese/vietnamese-words";

export const wordsDict = {
  ar: arabicWords,
  fa: persianWords,
  ja: japaneseWords,
  ko: koreanWords,
  es: spanishWords,
  fr: frenchWords,
  ca: catalanWords,
  vi: vietnameseWords,
  ur: urduWords,
  ru: russianWords,
} as any;
