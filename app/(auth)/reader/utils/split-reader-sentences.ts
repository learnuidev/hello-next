/**
 * What ends a sentence here: 。 and ？ (the two the reader cares about), plus
 * the other marks that clearly end one so a mixed text still splits sensibly.
 */
const SENTENCE_ENDERS = new Set(["。", "？", "！", "?", "!", "…"]);

const splitOnEnders = (piece: string) => {
  const result: string[] = [];
  let current = "";

  // Walk by code point so a surrogate pair is never cut in half.
  for (const character of piece) {
    current += character;

    if (SENTENCE_ENDERS.has(character)) {
      result.push(current);
      current = "";
    }
  }

  if (current.trim()) {
    result.push(current);
  }

  return result;
};

/**
 * Splits a text into sentences, each keeping its closing mark.
 *
 * `Intl.Segmenter` with sentence granularity does the first pass (that is what
 * the reader asked for), and every piece it returns is split again on 。/？ and
 * friends: not every engine breaks a Chinese run on those, and a paragraph that
 * arrives as one sentence would leave the reader with nothing to step through.
 * Blank lines are paragraph breaks and never produce a sentence.
 */
export const splitReaderSentences = (text: string, lang = "zh") => {
  const sentences: string[] = [];
  const segmenter = new Intl.Segmenter(lang, { granularity: "sentence" });

  for (const line of (text || "").split(/\r?\n/)) {
    if (!line.trim()) {
      continue;
    }

    for (const { segment } of segmenter.segment(line)) {
      for (const piece of splitOnEnders(segment)) {
        const sentence = piece.trim();

        if (sentence) {
          sentences.push(sentence);
        }
      }
    }
  }

  return sentences;
};
