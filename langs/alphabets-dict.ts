import { arabicAlphabets } from "./arabic/arabic-alphabets";
import { koreanAlphabets } from "./korean/korean-alphabets";
import { persianAlphabets } from "./persian/persian-alphabets";
import { romanianAlphabets } from "./romanian/romanian-alphabets";

export const alphabetsDict = {
  ar: arabicAlphabets,
  fa: persianAlphabets,

  ko: koreanAlphabets,
  ro: romanianAlphabets,
} as any;
