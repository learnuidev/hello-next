import { segmentReaderWords } from "@/app/(auth)/reader/utils/segment-reader-text";

/** A word in the shape the cloze options are drawn from. */
export interface ClozeWord {
  hanzi: string;
  input: string;
  en?: string;
}

/**
 * A sentence cut into the words it is made of, the way the reader's read mode
 * cuts it — `Intl.Segmenter` in the browser, nothing fetched.
 *
 * Dynocloze needs one word to blank out and three others to offer against it,
 * and those normally come from the grammar analysis, which is a slow call.
 * Until it lands, the sentence already holds everything the question needs, so
 * the view asks its own words instead of waiting.
 */
export const splitSentenceWords = (text?: string, lang = "zh"): ClozeWord[] => {
  if (!text) {
    return [];
  }

  // Punctuation and spacing are not words: they cannot be blanked out, and
  // they cannot stand in as an option either.
  const words = segmentReaderWords(text, lang)
    .filter((word) => word.isWordLike && !!word.text.trim())
    .map((word) => word.text.trim());

  // A repeated word is one option, not two — the same button twice in a grid
  // of four reads as a mistake.
  return Array.from(new Set(words)).map((word) => ({
    hanzi: word,
    input: word,
  }));
};

/** A word's text, whichever of the two fields carries it. */
export const getClozeWordText = (word?: ClozeWord) =>
  word?.input || word?.hanzi || "";

/**
 * Three wrong options for the word blanked out, preferring words of the same
 * length so the answer is not given away by the shape of its blank.
 *
 * The pool is whatever words the question is running on — the analysis' own
 * when it is there, the sentence's when it is not — so the options never mix
 * two different readings of the same line.
 */
export const getClozeDistractors = (words: ClozeWord[], answer: string) => {
  const pool = words.filter((word) => getClozeWordText(word) !== answer);

  if (pool.length === 0) {
    return [];
  }

  const sameLength = pool.filter(
    (word) => getClozeWordText(word).length === answer.length,
  );

  const candidates = sameLength.length >= 3 ? sameLength : pool;

  return candidates
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
};
