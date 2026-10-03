/**
 * A word (or line) the reader has tapped while reading, on its way to the
 * reading list. `order` is where it sits in the text, so a selection made out
 * of order still saves as readable text.
 */
export interface ReaderSelection {
  key: string;
  text: string;
  order: number;
}

export const toggleReaderSelection = (
  selection: ReaderSelection[],
  item: ReaderSelection,
) =>
  selection.some((selected) => selected.key === item.key)
    ? selection.filter((selected) => selected.key !== item.key)
    : [...selection, item];

export const isReaderSelected = (
  selection: ReaderSelection[],
  key: string,
) => selection.some((selected) => selected.key === key);

/**
 * Words of a Chinese text are saved glued together (`我` + `喜欢` is 我喜欢),
 * anything else keeps the space between words.
 */
export const joinReaderSelection = (
  selection: ReaderSelection[],
  lang: string,
) => {
  const separator = lang === "zh" ? "" : " ";

  return [...selection]
    .sort((first, second) => first.order - second.order)
    .map((selected) => selected.text)
    .join(separator)
    .trim();
};
