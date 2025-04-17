import { arabicAlphabets } from "./arabic/arabic-alphabets";
import { koreanAlphabets } from "./korean/korean-alphabets";
import { persianAlphabets } from "./persian/persian-alphabets";
import { romanianAlphabets } from "./romanian/romanian-alphabets";
import { russianAlphabets } from "./russian/russian-alphabets";
import { urduAlphabets } from "./urdu/urdu-alphabets";

export const alphabetsDict = {
  ar: arabicAlphabets,
  fa: persianAlphabets,

  ko: koreanAlphabets,
  ro: romanianAlphabets,
  ur: urduAlphabets,
  ru: russianAlphabets,
} as any;
