import { nepaliConsonants, nepaliVowels } from "@/components/devanagari/data";
import { arabicAlphabets } from "./arabic/arabic-alphabets";
import { koreanAlphabets } from "./korean/korean-alphabets";
import { persianAlphabets } from "./persian/persian-alphabets";
import { romanianAlphabets } from "./romanian/romanian-alphabets";
import { russianAlphabets } from "./russian/russian-alphabets";
import { urduAlphabets } from "./urdu/urdu-alphabets";
import { hindiAlphabets } from "./hindi/hindi-alphabets";
import { kazakhAlphabets } from "./kazak/kazak-alphabets";

export const alphabetsDict = {
  hi: hindiAlphabets,
  ar: arabicAlphabets,
  fa: persianAlphabets,
  ko: koreanAlphabets,
  ro: romanianAlphabets,
  ur: urduAlphabets,
  ru: russianAlphabets,
  kz: kazakhAlphabets,
} as any;
