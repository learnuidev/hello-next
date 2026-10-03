import { filterNonHanYu } from "@/app/nmm/nmm-utils/filter-non-hanyu";

import { getReaderWords } from "./segment-reader-text";
import { splitReaderSentences } from "./split-reader-sentences";

const HAN_PATTERN = /\p{Script=Han}/u;
const ALPHANUMERIC_PATTERN = /[\p{L}\p{N}]/u;

export interface ReaderFrequencyItem {
  input: string;
  frequency: number;
}

export interface ReaderStats {
  /** Words, as `Intl.Segmenter` sees them. */
  totalWords: number;
  uniqueWords: number;
  /** Characters in the text (Han characters, or letters/digits for a latin text). */
  totalCharacters: number;
  uniqueCharacters: number;
  sentences: number;
  charactersByFrequency: ReaderFrequencyItem[];
  wordsByFrequency: ReaderFrequencyItem[];
}

/**
 * Counts by first appearance in the text: the order the reader would meet them
 * in. Callers sort by frequency themselves when that is what they want.
 */
const countByFrequency = (items: string[]): ReaderFrequencyItem[] => {
  const counts = new Map<string, number>();

  items.forEach((item) => {
    counts.set(item, (counts.get(item) || 0) + 1);
  });

  return Array.from(counts, ([input, frequency]) => ({ input, frequency }));
};

/**
 * Everything the stats view shows, computed locally from the text itself.
 *
 * Characters follow what nmm's insights count: Han characters only
 * (`filterNonHanYu` drops punctuation, digits and latin). A text with no Han
 * characters at all — an English article — would otherwise report zero, so it
 * falls back to counting letters and digits instead.
 */
export const getReaderStats = ({
  text,
  lang,
}: {
  text: string;
  lang: string;
}): ReaderStats => {
  const words = getReaderWords(text, lang);
  const hasHan = HAN_PATTERN.test(text);

  const characters = Array.from(text).filter((character) =>
    hasHan
      ? HAN_PATTERN.test(character) && filterNonHanYu(character)
      : ALPHANUMERIC_PATTERN.test(character),
  );

  const charactersByFrequency = countByFrequency(characters);
  const wordsByFrequency = countByFrequency(words);

  return {
    totalWords: words.length,
    uniqueWords: wordsByFrequency.length,
    totalCharacters: characters.length,
    uniqueCharacters: charactersByFrequency.length,
    sentences: splitReaderSentences(text, lang).length,
    charactersByFrequency,
    wordsByFrequency,
  };
};
