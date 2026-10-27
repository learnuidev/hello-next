import { splitReaderSentences } from "./split-reader-sentences";

/**
 * Where in the film each line of a subtitle text sits.
 *
 * The reading views step through sentences rather than lines — focused read
 * shows one sentence at a time — so the times come back sentence by sentence:
 * the index a view steps with is the index the time is at, and a cue whose line
 * splits into two sentences gives both of them the cue's own time, because that
 * is when the reader sees them.
 *
 * The answer is only as good as the text matching the file. A text edited after
 * it was uploaded is no longer one line per cue, and there is no honest way to
 * guess which line a cue belongs to now — so a count that does not line up is
 * answered with nothing at all, and the views simply show no times.
 */
export const getReaderLineTimestamps = ({
  text,
  cueStarts,
  lang,
}: {
  text: string;
  /** The start of every cue, in file order, as the API stores it. */
  cueStarts?: number[];
  lang: string;
}) => {
  const lines = (text || "")
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);

  if (!cueStarts?.length || lines.length !== cueStarts.length) {
    return [] as (number | undefined)[];
  }

  return lines.flatMap((line, index) =>
    splitReaderSentences(line, lang).map(() => cueStarts[index]),
  );
};
