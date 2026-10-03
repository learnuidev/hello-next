export interface ReaderWord {
  text: string;
  /** True for actual words — punctuation and whitespace come back `false`. */
  isWordLike: boolean;
}

type SegmentData = { segment: string; isWordLike?: boolean };

/**
 * Segments a text into words with `Intl.Segmenter` (no API involved).
 *
 * Word granularity is what gives the reader its blanks in dynocloze, its
 * word-by-word view in read mode and its word statistics.
 */
export const segmentReaderWords = (text: string, lang = "zh"): ReaderWord[] => {
  const segmenter = new Intl.Segmenter(lang, { granularity: "word" });

  return Array.from(segmenter.segment(text || ""), (data) => {
    const segmentData = data as SegmentData;

    return {
      text: segmentData.segment,
      isWordLike: !!segmentData.isWordLike,
    };
  });
};

/** Just the words, punctuation and spacing dropped. */
export const getReaderWords = (text: string, lang = "zh") =>
  segmentReaderWords(text, lang)
    .filter((word) => word.isWordLike && !!word.text.trim())
    .map((word) => word.text.trim());

/**
 * The "segmented string": the text with a space between words and punctuation
 * left where it was, which is what read mode puts on screen.
 */
export const joinSegmentedText = (words: ReaderWord[], separator = " ") =>
  words.reduce((result, word) => {
    const needsSpace =
      !!result && word.isWordLike && !/\s$/.test(result) && !!word.text.trim();

    return result + (needsSpace ? separator : "") + word.text;
  }, "");
