const CJK_PATTERN = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu;

/**
 * Counts "words" for a pasted text.
 *
 * Whitespace splitting alone reports a whole Chinese paragraph as one word, so
 * CJK characters are counted individually and the remaining ascii runs are
 * counted by whitespace.
 */
export const countReaderWords = (text: string) => {
  const trimmed = text.trim();

  if (!trimmed) {
    return 0;
  }

  const cjkCount = trimmed.match(CJK_PATTERN)?.length || 0;

  const otherWords = trimmed
    .replace(CJK_PATTERN, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return cjkCount + otherWords;
};
