/**
 * What ends a sentence here: 。 and ？ (the two the reader cares about), plus
 * the other marks that clearly end one so a mixed text still splits sensibly.
 */
const SENTENCE_ENDERS = new Set(["。", "？", "！", "?", "!", "…"]);

/**
 * Marks that close a run opened by a quote or a bracket. An ending mark is
 * rarely the last character of a sentence: `“人民高一些！”` ends on ！ but the
 * closing ” is still part of it, so cutting there would leave the reader with
 * the quoted line and a stray `”` after it — a line of nothing but punctuation,
 * with no pinyin and nothing to read.
 */
const CLOSING_MARKS = new Set([
  "”",
  "’",
  "」",
  "』",
  "）",
  ")",
  "】",
  "]",
  "》",
  "〉",
  "»",
  "›",
  '"',
  "'",
]);

/**
 * True for a character that stays with the sentence when it follows an ending
 * mark — a second ender (`！？`, `……`) or a closing quote/bracket (`！”`).
 */
const staysWithEnded = (character: string) =>
  SENTENCE_ENDERS.has(character) || CLOSING_MARKS.has(character);

/**
 * True for a piece that carries something to read. A run of punctuation only —
 * `”`, `“`, `？！` — is never a sentence of its own, however it got separated.
 */
const hasContent = (text: string) => /[^\s\p{P}]/u.test(text);

const splitOnEnders = (piece: string) => {
  const result: string[] = [];
  let current = "";

  // Walk code points so a surrogate pair is never cut in half.
  const characters = Array.from(piece);

  for (let index = 0; index < characters.length; index += 1) {
    const character = characters[index] as string;
    current += character;

    if (!SENTENCE_ENDERS.has(character)) {
      continue;
    }

    // The ender does not end the sentence on its own: the marks after it belong
    // to the same sentence, so `！”` and `……` are never left behind.
    while (
      index + 1 < characters.length &&
      staysWithEnded(characters[index + 1] as string)
    ) {
      index += 1;
      current += characters[index] as string;
    }

    result.push(current);
    current = "";
  }

  if (current) {
    result.push(current);
  }

  return result;
};

/**
 * Puts punctuation that ended up on its own back where it belongs.
 *
 * `Intl.Segmenter` breaks `“今天下雨吗？”“不下。”` between the answers, leaving
 * the `“` that opens the second one hanging at the end of the first, and the
 * split above can leave a lone `”` the same way. Such a piece is held back and
 * joins the next sentence that has something to read — or the one before it,
 * when the text ends on the mark — so quotes always stay around their words.
 */
const mergeDanglingMarks = (pieces: string[]) => {
  const sentences: string[] = [];
  let pending = "";

  for (const piece of pieces) {
    const text = pending + piece;
    pending = "";

    if (hasContent(text)) {
      sentences.push(text);
    } else {
      pending = text;
    }
  }

  if (pending) {
    const last = sentences.length - 1;

    if (last >= 0) {
      sentences[last] = (sentences[last] as string) + pending;
    } else {
      sentences.push(pending);
    }
  }

  return sentences;
};

/**
 * Splits a text into sentences, each keeping its closing mark — and the quote
 * that closes around it, so `“镜头低一点，人民高一些！”` stays one sentence.
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

    const pieces: string[] = [];

    for (const { segment } of segmenter.segment(line)) {
      for (const piece of splitOnEnders(segment)) {
        pieces.push(piece);
      }
    }

    for (const piece of mergeDanglingMarks(pieces)) {
      const sentence = piece.trim();

      if (sentence) {
        sentences.push(sentence);
      }
    }
  }

  return sentences;
};
