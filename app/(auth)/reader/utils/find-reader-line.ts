import { ReaderSnippetLine } from "../reader.types";
import { segmentReaderWords } from "./segment-reader-text";
import { splitReaderSentences } from "./split-reader-sentences";

/**
 * Which line of a text a word is in, for a view that only knows the word by
 * where it sits — the read view, which draws a text as paragraphs of segmented
 * words and has no notion of a line of its own.
 *
 * The word's *character offset* in its paragraph is what finds the sentence: an
 * offset rather than a count of words, because the sentences come back trimmed
 * and a running count would drift the moment one of them ends in whitespace.
 *
 * The line number it reports is the one focused read steps through — every
 * sentence of every line before it, blank lines contributing none — so a
 * reference saved out of the read view opens on the right line in focused read.
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

  // The segments run together into the paragraph, so where a word starts is the
  // length of everything before it.
  const offset = words
    .slice(0, wordIndex)
    .reduce((total, word) => total + word.text.length, 0);

  const sentences = splitReaderSentences(paragraph, lang);

  // `indexOf` from the last match, because the sentences are in order and one
  // may well repeat another.
  let cursor = 0;
  let sentenceIndex = -1;

  for (let index = 0; index < sentences.length; index += 1) {
    const start = paragraph.indexOf(sentences[index], cursor);

    if (start === -1) {
      continue;
    }

    if (offset >= start && offset < start + sentences[index].length) {
      sentenceIndex = index;
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
