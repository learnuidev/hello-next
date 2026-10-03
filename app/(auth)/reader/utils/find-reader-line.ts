import { ReaderSnippetLine } from "../reader.types";
import { segmentReaderWords } from "./segment-reader-text";
import { splitReaderSentences } from "./split-reader-sentences";

/**
 * The sentence of one line that a character offset falls in, and the step that
 * sentence is in the whole text — every sentence of every line before it, blank
 * lines contributing none, which is how focused read counts them.
 *
 * The offset is what finds the sentence. An offset rather than a count of words,
 * because the sentences come back trimmed and a running count would drift the
 * moment one of them ends in whitespace; and `indexOf` from the end of the last
 * match, because the sentences are in order and one may well repeat another.
 */
const lineWithinParagraph = ({
  paragraphs,
  paragraphIndex,
  paragraph,
  offsetInParagraph,
  lang,
}: {
  paragraphs: string[];
  paragraphIndex: number;
  paragraph: string;
  offsetInParagraph: number;
  lang: string;
}): ReaderSnippetLine | null => {
  if (!paragraph.trim()) {
    return null;
  }

  const sentences = splitReaderSentences(paragraph, lang);

  let cursor = 0;
  // The last sentence that started before the offset: an offset in the
  // whitespace a sentence was trimmed of belongs to that sentence, not to none.
  let sentenceIndex = -1;

  for (let index = 0; index < sentences.length; index += 1) {
    const start = paragraph.indexOf(sentences[index], cursor);

    if (start === -1) {
      continue;
    }

    if (offsetInParagraph < start) {
      break;
    }

    sentenceIndex = index;

    if (offsetInParagraph < start + sentences[index].length) {
      break;
    }

    cursor = start + sentences[index].length;
  }

  if (sentenceIndex === -1) {
    return null;
  }

  let lineIndex = sentenceIndex;

  for (let index = 0; index < paragraphIndex; index += 1) {
    lineIndex += splitReaderSentences(paragraphs[index], lang).length;
  }

  return { lineIndex, line: sentences[sentenceIndex] };
};

/**
 * Which line of a text a character offset falls in — where the highlight is when
 * the reader saves a piece of the plain text, which is drawn as one run of
 * characters with no words in it to count.
 */
export const findReaderLineAtOffset = ({
  text,
  lang,
  offset,
}: {
  text: string;
  lang: string;
  /** Where the piece starts, counted from the start of the text. */
  offset: number;
}): ReaderSnippetLine | null => {
  const paragraphs = (text || "").split(/\r?\n/);

  let lineStart = 0;
  // An offset on a blank line — the empty line between two paragraphs — has no
  // line of its own: the highlight belongs to the line the text carries on with.
  let inBlankLine = false;

  for (let paragraphIndex = 0; paragraphIndex < paragraphs.length; paragraphIndex += 1) {
    const paragraph = paragraphs[paragraphIndex];
    const lineEnd = lineStart + paragraph.length;
    const inside = offset >= lineStart && offset <= lineEnd;

    if (!paragraph.trim()) {
      inBlankLine = inBlankLine || inside;

      // One more for the newline the text was split on.
      lineStart = lineEnd + 1;
      continue;
    }

    if (inside || inBlankLine) {
      return lineWithinParagraph({
        paragraphs,
        paragraphIndex,
        paragraph,
        offsetInParagraph: inside ? offset - lineStart : 0,
        lang,
      });
    }

    lineStart = lineEnd + 1;
  }

  return null;
};

/**
 * Which line of a text a word is in, for a view that only knows the word by
 * where it sits — the read view in read mode, which draws a text as paragraphs
 * of segmented words and has no notion of a line of its own.
 *
 * Where the word starts is the offset that finds it: the segments run together
 * into the paragraph, so that is the length of everything before it.
 */
export const findReaderLineAtWord = ({
  text,
  lang,
  paragraphIndex,
  wordIndex,
}: {
  text: string;
  lang: string;
  /** Which line of the text the word is in. */
  paragraphIndex: number;
  /** Which word of that line it is, as the read view counted them. */
  wordIndex: number;
}): ReaderSnippetLine | null => {
  const paragraphs = (text || "").split(/\r?\n/);
  const paragraph = paragraphs[paragraphIndex] ?? "";

  if (!paragraph.trim()) {
    return null;
  }

  const words = segmentReaderWords(paragraph, lang);

  if (!words[wordIndex]) {
    return null;
  }

  return lineWithinParagraph({
    paragraphs,
    paragraphIndex,
    paragraph,
    offsetInParagraph: words
      .slice(0, wordIndex)
      .reduce((total, word) => total + word.text.length, 0),
    lang,
  });
};
