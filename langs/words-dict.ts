import { arabicWords } from "./arabic/arabic-words";
import { frenchWords } from "./french/french-words";
import { japaneseWords } from "./japanese/japanese-words";
import { koreanWords } from "./korean/korean-words";
import { persianWords } from "./persian/persian-words";
import { spanishWords } from "./spanish/spanish-words";

export const wordsDict = {
  ar: arabicWords,
  fa: persianWords,
  ja: japaneseWords,
  ko: koreanWords,
  es: spanishWords,
  fr: frenchWords,
} as any;
