import { filterNonHanYu } from "@/app/nmm/nmm-utils/filter-non-hanyu";

const HAN_PATTERN = /\p{Script=Han}/u;
const ALPHANUMERIC_PATTERN = /[\p{L}\p{N}]/u;

/**
 * The characters of a text, counted the way nmm's insights count them: Han
 * characters only, with `filterNonHanYu` dropping punctuation, digits and latin.
 *
 * A text with no Han character at all — an English article — would otherwise
 * report nothing, so it counts letters and digits instead. This is the one
 * definition of a character in the reader: the stats view and the counts in the
 * headers are both this.
 */
export const getReaderCharacters = (text: string) => {
  const hasHan = HAN_PATTERN.test(text || "");

  return Array.from(text || "").filter((character) =>
    hasHan
      ? HAN_PATTERN.test(character) && filterNonHanYu(character)
      : ALPHANUMERIC_PATTERN.test(character),
  );
};

/**
 * How many characters a text has.
 *
 * Note that this is not a word count: a Chinese sentence of ten characters is
 * ten characters and only a word or two, so counting words for a text like the
 * ones the reader is given says very little. Words are what you count in a
 * language that puts spaces between them.
 */
export const countReaderCharacters = (text: string) =>
  getReaderCharacters(text).length;
