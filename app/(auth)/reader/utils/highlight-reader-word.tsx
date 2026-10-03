/**
 * A line with one word picked out of it, the way the reader marks the word it is
 * showing: the word wears `className`, and a line that does not contain the word
 * comes back exactly as it was.
 *
 * Splitting on the word is enough here. The reader looks a word up as it
 * segmented it, so the text being marked is the text that is in the line — and a
 * saved word whose line has since been reworded simply comes back unmarked
 * rather than being forced onto something that does not contain it.
 */
export const highlightReaderWord = (
  line: string,
  word: string,
  className = "text-gray-900 dark:text-white font-semibold",
) => {
  if (!word || !line.includes(word)) {
    return line;
  }

  const parts = line.split(word);

  return parts.map((part, index) => (
    <span key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 && <span className={className}>{word}</span>}
    </span>
  ));
};
